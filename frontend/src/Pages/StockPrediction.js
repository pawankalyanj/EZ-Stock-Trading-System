import React, { useState, useEffect } from 'react';
import '../styles/StockPrediction.css'
import axios from 'axios';
import { BASE_URL } from '../utils/config';

function StockPrediction() {
    const [stock_symbol, setStockSymbol] = useState('');
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const getStockPrediction = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get_stock_prediction/${stock_symbol}`);

            setPredictedPrice(response.data.predictedPrice);
        } catch (error) {
            console.error('Error fetching stock prediction:', error);
            setErrorMessage('Error fetching stock prediction');
        }
    };

    const handleStockSymbolChange = (e) => {
        setStockSymbol(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getStockPrediction();
    };

    return (
        <div className="App">
            <h1>Stock Prediction</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Stock Symbol:
                    <input type="text" value={stock_symbol} onChange={handleStockSymbolChange} />
                </label>
                <button onClick={handleSubmit}>Get Stock Prediction</button>
            </form>

            {predictedPrice !== null && (
                <div>
                    <h2>Predicted Stock Price:</h2>
                    <p>{predictedPrice}</p>
                </div>
            )}

            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default StockPrediction;
