import * as mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    datePurchase: {
        type: Date,
        require: true
    },
    pricePurchase: {
        type: Number,
        require: true
    },
    dateSale: Date,
    priceSale: Number,
    created: {
        type: Date,
        default: Date.now
    },
    modified: Date,
    userId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model('Transaction', transactionSchema);
