import {useState} from "react";
import "../styles/StockPrediction.css"
function StockPrediction() {

    const [symbol, setSymbol] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchData = () => {
        // Implement logic to fetch historical data based on symbol, startDate, and endDate
        console.log('Fetching data...', symbol, startDate, endDate);
    };

    return (
        <div className="historical-data-page">
            <h2>Stock Prediction</h2>

            <div className="symbol-container">
                <label>
                    Stock Symbol:
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                </label>
            </div>

            <div className="dates-container">
                <label>
                    Start Date (mm/dd/yyyy):
                    <input
                        type="text"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>

                <label>
                    End Date (mm/dd/yyyy):
                    <input
                        type="text"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={fetchData}>Submit</button>
        </div>
    );
    }
export default StockPrediction;