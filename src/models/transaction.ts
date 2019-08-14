import * as mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    symbol: {
        type: String,
        required: true,
    },
    datePurchase: {
        type: Date,
        require: true,
    },
    pricePurchase: {
        type: Number,
        require: true,
    },
    dateSale: Date,
    priceSale: Number,
    userId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model('Transaction', transactionSchema);
