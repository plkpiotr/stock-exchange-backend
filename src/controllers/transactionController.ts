import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import Transaction from '../models/transaction';

class TransactionController {
    public getTransactionById = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, process.env.JWT_KEY);
        Transaction.find({
            _id: request.params.transactionId,
            userId: request.userData._id
        })
            .select('-__v')
            .exec()
            .then(transaction => {
                if (transaction) {
                    response.status(200).json(transaction);
                } else {
                    response.status(404).json({
                        message: 'Such transaction doesn\'t exists'
                    });
                }
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public getTransactionsByUserId = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, process.env.JWT_KEY);
        if (request.userData._id !== request.params.userId) {
            return response.status(401).json({
                message: 'You don\'t have access to this resource'
            });
        }
        const query = {
            userId: request.params.userId
        };
        Transaction.find(query)
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
        request.userData = jwt.verify(token, process.env.JWT_KEY);
        const transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            datePurchase: request.body.datePurchase,
            pricePurchase: request.body.pricePurchase,
            dateSale: request.body.dateSale,
            priceSale: request.body.priceSale,
            userId: request.userData._id
        });
        transaction.save()
            .then(() => {
                response.status(201).json(transaction)
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public editTransaction = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, process.env.JWT_KEY);
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
                    Transaction.update({_id: request.params.transactionId}, {
                        $set: {
                            datePurchase: request.body.datePurchase,
                            pricePurchase: request.body.pricePurchase,
                            dateSale: request.body.dateSale,
                            priceSale: request.body.priceSale,
                            modified: Date.now()
                        }
                    })
                        .exec()
                        .then(result => {
                            response.status(200).json(result);
                        })
                        .catch(error => {
                            response.status(500).json(error);
                        });
                }
            });
    };

    public removeTransaction = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, process.env.JWT_KEY);
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
