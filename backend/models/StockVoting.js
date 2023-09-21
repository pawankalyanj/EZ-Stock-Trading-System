import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
    symbol: String,
    vote: String
});

export default mongoose.model('Vote', voteSchema);


