import {useState} from "react";
import "../styles/StockPrediction.css"
import {BASE_URL} from '../utils/config'
function StockPrediction() {

    const [symbol, setSymbol] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchData = ()=>{
        const uppercaseSymbol = symbol.toUpperCase();
        fetch(`${BASE_URL}/`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({symbol: uppercaseSymbol}),
        })
            .then((response)=>response.json())
            .then(() => {
                setSymbol('');
                setStartDate('');
                setEndDate('');
            })
            .catch((error) => console.error("Error fetching predicted price", error));
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

            {/* <div className="dates-container">
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
            </div> */}

            <button onClick={fetchData}>Submit</button>
        </div>
    );
    }
export default StockPrediction;