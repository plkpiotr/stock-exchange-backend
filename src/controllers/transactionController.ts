import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import Transaction from '../models/transaction';

class TransactionController {
    public getTransactions = (request, response) => {
        Transaction.find({
            userId: request.userData._id
        })
            .select('-__v')
            .exec()
            .then(transaction => {
                if (transaction.length > 0) {
                    response.status(200).json(transaction);
                } else {
                    response.status(404).json({
                        message: 'Not found any transactions'
                    });
                }
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public addTransaction = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, 'stock-exchange');
        const transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            symbol: request.body.symbol,
            date: request.body.date,
            amount: request.body.amount,
            comment: request.body.comment,
            userId: request.userData._id,
        });
        transaction.save()
            .then(() => {
                response.status(201).json(transaction)
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public deleteTransaction = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, 'stock-exchange');
        Transaction.find({
            _id: request.params.transactionId,
            userId: request.userData._id
        })
            .exec()
            .then(transaction => {
                if (transaction.length === 0) {
                    return response.status(404).json({
                        message: 'Such transaction doesn\'t exists'
                    });
                } else {
                    Transaction.deleteOne({_id: request.params.transactionId})
                        .exec()
                        .then(() => {
                            response.status(200).json({
                                message: 'Transaction deleted'
                            });
                        })
                        .catch(error => {
                            response.status(500).json({error});
                        });
                }
            });
    };
}

export default new TransactionController();
