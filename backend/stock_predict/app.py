import os
import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from datetime import date
from flask import Flask, request, jsonify, render_template, send_file
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from flask_cors import CORS
from io import BytesIO
import json


app = Flask(__name__)
CORS(app)

# Mapping of ticker symbols to model filenames.
model_mapping = {
    'AAPL': 'AAPL_model.h5',
    'ADBE': 'ADBE_model.h5',
    'AMZN': 'AMZN_model.h5',
    'CSCO': 'CSCO_model.h5',
    'DELL': 'DELL_model.h5',
    'GOOG': 'GOOG_model.h5',
    'HPQ': 'HPQ_model.h5',
    'IBM': 'IBM_model.h5',
    'INTL': 'INTL_model.h5',
    'INTU': 'INTU_model.h5',
    'LYFT': 'LYFT_model.h5',
    'META': 'META_model.h5',
    'MSFT': 'MSFT_model.h5',
    'NFLX': 'NFLX_model.h5',
    'NVDA': 'NVDA_model.h5',
    'ORCL': 'ORCL_model.h5',
    'PYPL': 'PYPL_model.h5',
    'QCOM': 'QCOM_model.h5',
    'SONY': 'SONY_model.h5',
    'TSLA': 'TSLA_model.h5',
    'UBER': 'UBER_model.h5'
    }

# Selects the correct model based on the ticker symbol input.
@app.route("/select_model/<ticker>")
def select_model(ticker):
    
    if ticker in model_mapping:
        model_filename = model_mapping[ticker]
        script_dir = os.path.dirname(os.path.abspath(__file__))
        models_dir = os.path.join(script_dir, 'models')
        model_path = os.path.join(models_dir, model_filename)

        if os.path.exists(model_path):
            return model_path
        else:
            return "Model not found", 404
    else:
        return "Invalid ticker symbol", 400



# Predicts the next day's stock price based on the input stock symbol.
@app.route('/predict/<stock_symbol>', methods=['GET'])
def predict(stock_symbol):
    try:
        print(f"Received stock symbol: {stock_symbol}")

        # Get the model path based on the stock symbol
        model_path = select_model(stock_symbol)

        if model_path is None:
            return jsonify({'error': 'Model not found'})

        # Download historical stock price data
        stock_ticker = yf.Ticker(stock_symbol)
        today = str(date.today())
        stock_data = yf.download(stock_symbol, start='2016-01-01', end=today)

        try:
            if stock_data.empty:
                return jsonify({'error': "ERROR: Not a valid stock symbol. Please try again."})

            # Create a DataFrame and preprocess the data
            df = pd.DataFrame(data=stock_data, columns=['Close'])
            scaler = MinMaxScaler(feature_range=(0, 1))
            scaled_data = scaler.fit_transform(df['Close'].values.reshape(-1, 1))

            # Load the pre-trained LSTM model
            model = load_model(model_path)

            # Prepare input data for prediction
            lookback = 60
            last_x = scaled_data[-lookback:]
            last_x = np.reshape(last_x, (1, lookback, 1))

            # Make a prediction for the next day's stock price
            predicted_price = model.predict(last_x)

            # Inverse scale the predicted price
            predicted_price = scaler.inverse_transform(predicted_price)[0][0]

            # Get the last available stock price
            last_price = df['Close'].iloc[-1]

            # Determine if the predicted price suggests an increase or decrease
            if predicted_price > last_price:
                sign = "+"
            else:
                sign = "-"

            return jsonify({'result': f"{sign}{predicted_price:.2f}"})
            return jsonify({'result': f"Tomorrow's predicted stock price: {sign}{predicted_price:.2f}",
                            'model_path': model_path})
        except Exception as e:
            return jsonify({'error': f"Data preparation error: {str(e)}"})

    except Exception as e:
        return jsonify({'error': str(e)})
    

# Obtains 14 days of historical stock price data for the input stock symbol.
@app.route('/get_stock_data/<stock_symbol>', methods=['GET'])
def fetch_stock_data(stock_symbol):
    try:
        end_date = date.today()
        start_date = (end_date - pd.DateOffset(days=60)).strftime('%Y-%m-%d')
        end_date = end_date.strftime('%Y-%m-%d')

        stock_data = yf.download(stock_symbol, start=start_date, end=end_date)
        stock_data['Close'] = stock_data['Close'].round(2)

        new_data = pd.DataFrame({'Date': pd.to_datetime(stock_data.index).strftime('%Y-%m-%d'), 'Price': stock_data['Close'].values})
        
        # Convert DataFrame to JSON
        new_data_json = new_data.to_json(orient='records', date_format='iso')

        # Load JSON and convert the date to the desired format
        loaded_data = json.loads(new_data_json)
        for entry in loaded_data:
            entry['Date'] = datetime.strptime(entry['Date'], '%Y-%m-%d').strftime('%Y-%m-%d')

        return jsonify(loaded_data)

    except Exception as e:
        return jsonify({'error': str(e)})


# # Obtains 14 days of historical stock price data for the input stock symbol.
# @app.route('/get_stock_data/<stock_symbol>', methods=['GET'])
# def fetch_stock_data(stock_symbol):
#     try:
#         end_date = date.today()
#         start_date = (end_date - pd.DateOffset(days=14)).strftime('%Y-%m-%d')
#         end_date = end_date.strftime('%Y-%m-%d')

#         stock_data = yf.download(stock_symbol, start=start_date, end=end_date)
#         stock_data['Close'] = stock_data['Close'].round(2)

#         new_data = pd.DataFrame({
#             'date': pd.to_datetime(stock_data.index).strftime('%Y-%m-%d'),
#             'open': stock_data['Open'].round(2),
#             'high': stock_data['High'].round(2),
#             'low': stock_data['Low'].round(2),
#             'close': stock_data['Close'].round(2),
#             'volume': stock_data['Volume'].round(2)
#         })

#         # Convert DataFrame to JSON
#         new_data_json = new_data.to_json(orient='records', date_format='iso')

#         # Load JSON and convert the date to the desired format
#         loaded_data = json.loads(new_data_json)

#         # Reorder the keys in each entry
#         for entry in loaded_data:
#             entry['date'], entry['open'], entry['high'], entry['low'], entry['close'], entry['volume'] = (
#                 entry['date'], entry['open'], entry['high'], entry['low'], entry['close'], entry['volume']
#             )

#         return jsonify(loaded_data)

#     except Exception as e:
#         return jsonify({'error': str(e)})






if __name__ == '__main__':
    app.run(debug=True)
