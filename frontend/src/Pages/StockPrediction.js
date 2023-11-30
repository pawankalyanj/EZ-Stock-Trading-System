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
    
    
    

    

    // const getStockPrediction = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_URL}/get_stock_prediction/${stock_symbol}`);

    //         setPredictedPrice(response.data.predictedPrice);
    //     } catch (error) {
    //         console.error('Error fetching stock prediction:', error);
    //         setErrorMessage('Error fetching stock prediction');
    //     }
    // };

    const handleStockSymbolChange = (e) => {
        setStockSymbol(e.target.value);
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
                    {/* <p>{predictedPrice}</p> */}
                </div>
            )}

            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default StockPrediction;