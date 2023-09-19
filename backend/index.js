import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from './routers/auth.js'
import userRoute from './routers/users.js'
import mongoose from "mongoose";
import yahooFinance from 'yahoo-finance';
import Vote from './models/StockVoting.js';

dotenv.config()
const app = express()
const port = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI;
 const corsOptions = {
     origin: true,
     credentials: true
 }

app.get("/", (req,res)=> {
    res.send("api is running");
})

mongoose.set("strictQuery",false);
const connect = async () => {
    try{
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB database connected');
    }
    catch(err){
        console.log('MongoDB database connection failed');
    }
}

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
    connect().then(r => console.log(`server listening on port ${port}`));
        });