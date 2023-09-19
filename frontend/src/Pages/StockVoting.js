import React, { useState, useEffect } from 'react';
import './StockVoting.css';

function StockVoting() {
    const [symbol, setSymbol] = useState('');
    const [vote, setVote] = useState('');
    const [isValidSymbol, setIsValidSymbol] = useState(false);
    const [votes, setVotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (symbol) {
            fetch(`/api/validateSymbol/${symbol}`)
                .then((response) => response.json())
                .then((data) => setIsValidSymbol(data.valid));
        }
    }, [symbol]);

    useEffect(() => {
        fetch('/api/votes')
            .then((response) => response.json())
            .then((data) => setVotes(data))
            .catch((error) => console.error('Error fetching votes:', error));
    }, []);

    const handleVoteSubmit = () => {
        if (!isValidSymbol || !symbol || !vote) {
            setErrorMessage('Please enter a valid symbol and select a vote');
            return;
        }

        fetch('/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symbol, vote }),
        })
            .then((response) => response.json())
            .then(() => {
                setErrorMessage('');
                setSymbol('');
                setVote('');
                // Refresh vote results
                fetch('/api/votes')
                    .then((response) => response.json())
                    .then((data) => setVotes(data))
                    .catch((error) => console.error('Error fetching votes:', error));
            })
            .catch((error) => console.error('Error submitting vote:', error));
    };

    return (
        <div className="App">
            <h1>User Polling</h1>
            <div>
                <input
                    type="text"
                    placeholder="Stock Symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                />
                <button onClick={handleVoteSubmit}>Validate Symbol</button>
                {isValidSymbol && (
                    <div>
                        <select value={vote} onChange={(e) => setVote(e.target.value)}>
                            <option value="">Select Vote</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                        <button onClick={handleVoteSubmit}>Submit Vote</button>
                    </div>
                )}
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
            <h2>Vote Results</h2>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Buy Votes</th>
                    <th>Sell Votes</th>
                </tr>
                </thead>
                <tbody>
                {votes.map((vote) => (
                    <tr key={vote._id}>
                        <td>{vote._id}</td>
                        <td>{vote.buyCount}</td>
                        <td>{vote.sellCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StockVoting;

