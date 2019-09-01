import * as mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    symbol: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },
    userId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model('Transaction', transactionSchema);
