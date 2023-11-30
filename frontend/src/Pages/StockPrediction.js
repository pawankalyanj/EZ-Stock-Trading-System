import React, { useState, useEffect } from 'react';
import '../styles/StockPrediction.css'
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import ReactApexChart from "react-apexcharts"

function StockPrediction() {
    const [stock_symbol, setStockSymbol] = useState('');
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const getStockPrediction = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get_stock_prediction/${stock_symbol}`);
            console.log('Response:', response);
    
            if (response.data && response.data.result !== undefined) {
                // Extract the numerical value from the string and convert it to a number
                const predictedPriceNumber = parseFloat(response.data.result);
                
                // Check if the conversion is successful
                if (!isNaN(predictedPriceNumber)) {
                    setPredictedPrice(predictedPriceNumber);
                    setErrorMessage(''); // Clear any previous error message
                } else {
                    setPredictedPrice(null); // Reset predictedPrice if conversion fails
                    setErrorMessage('Invalid predictedPrice format');
                }
            } else {
                setPredictedPrice(null); // Reset predictedPrice if response is invalid
                setErrorMessage('Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching stock prediction:', error);
            setPredictedPrice(null); // Reset predictedPrice in case of an error
            setErrorMessage('Error fetching stock prediction');
        }
    };
  
    const handleStockSymbolChange = (e) => {
        setStockSymbol(e.target.value);
    
     const chart  = {
          
        series: [{
          data: [{
              x: new Date(1538778600000),
              y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
              x: new Date(1538780400000),
              y: [6632.01, 6643.59, 6620, 6630.11]
            },
            {
              x: new Date(1538782200000),
              y: [6630.71, 6648.95, 6623.34, 6635.65]
            },
            {
              x: new Date(1538784000000),
              y: [6635.65, 6651, 6629.67, 6638.24]
            },
            
          ]
        }],
        options: {
          chart: {
            type: 'candlestick',
            height: 350
          },
          title: {
            text: 'CandleStick Chart',
            align: 'left'
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
      
      
      };

    const fetchData = ()=>{
        const uppercaseSymbol = stock_symbol.toUpperCase();
        fetch(`${BASE_URL}/`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({symbol: uppercaseSymbol}),
        })
            .then((response)=>response.json())
            .then(() => {
                //setSymbol('');
                //setStartDate('');
                //setEndDate('');
            })
            .catch((error) => console.error("Error fetching predicted price", error));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await getStockPrediction();
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
                    <h2>Predicted Stock Price: {predictedPrice}</h2>
                    <div id="chart">
                     <ReactApexChart options={chart.options} series={chart.series} type="candlestick" height={350} />
                    </div>
                </div>
            )}
            
          </div>
           
            
    );
}
}
export default StockPrediction;
