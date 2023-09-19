import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
    symbol: String,
    vote: { type: String, enum: ['buy', 'sell'] },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Vote', voteSchema);


