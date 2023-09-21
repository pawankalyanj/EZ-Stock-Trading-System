import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from './routers/auth.js'
import userRoute from './routers/users.js'
import mongoose from "mongoose";
import yahooFinance from 'yahoo-finance';
import Vote from './models/StockVoting.js';
import { WebSocketServer } from "ws";

dotenv.config()
const app = express()
const port = process.env.PORT || 4000
const uri = "mongodb+srv://ez-stock:LdqkS3emZ1N4MACV@cluster0.wzleh2b.mongodb.net/Votes?retryWrites=true&w=majority";
 const corsOptions = {
     origin: true,
     credentials: true
 }

app.get("/", (req,res)=> {
    res.send("api is running");
})

mongoose.connect(uri).then(r =>
console.log("DataBase is Connected"))

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);

// Yahoo Finance symbol validation
app.get('/api/validateSymbol/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const quote = await yahooFinance.quote({ symbol });
        if (quote && quote.symbol === symbol) {
            return res.json({ valid: true });
        }
        return res.json({ valid: false });
    } catch (error) {
        return res.json({ valid: false, error: 'Invalid symbol' });
    }
});

// Submit a vote
app.post('/api/vote', async (req, res) => {
    const { symbol, vote } = req.body;

    try {
        // Check if the symbol is valid
        const quote = await yahooFinance.quote({ symbol });
        if (!quote || quote.symbol !== symbol) {
            return res.status(400).json({ error: 'Invalid symbol' });
        }

        // Store the vote in MongoDB
        const newVote = new Vote({ symbol, vote });
        await newVote.save();

        return res.json({ message: 'Vote submitted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error submitting vote' });
    }
});

// Get all votes with counts
app.get('/api/votes', async (req, res) => {
    try {
        const votes = await Vote.aggregate([
            {
                $group: {
                    _id: '$symbol',
                    buyCount: {
                        $sum: { $cond: [{ $eq: ['$vote', 'buy'] }, 1, 0] },
                    },
                    sellCount: {
                        $sum: { $cond: [{ $eq: ['$vote', 'sell'] }, 1, 0] },
                    },
                },
            },
        ]);

        res.json(votes);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching votes' });
    }
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});

const wss = new WebSocketServer({ noServer: true });
wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    // Whenever a new vote is submitted, broadcast the updated votes
    Vote.watch().on('change', () => {
        Vote.aggregate([
            {
                $group: {
                    _id: '$symbol',
                    buyCount: {
                        $sum: { $cond: [{ $eq: ['$vote', 'buy'] }, 1, 0] },
                    },
                    sellCount: {
                        $sum: { $cond: [{ $eq: ['$vote', 'sell'] }, 1, 0] },
                    },
                },
            },
        ])
            .then((votes) => {
                const message = JSON.stringify({ type: 'votes', data: votes });
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocketServer.OPEN) {
                        client.send(message);
                    }
                });
            })
            .catch((error) => {
                console.error('Error aggregating votes:', error);
            });
    });
});