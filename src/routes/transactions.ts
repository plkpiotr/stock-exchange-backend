import * as express from 'express';
import { Router } from 'express';
import authenticator from '../middleware/authenticator';
import TransactionController from '../controllers/transactionController';

class Transactions {
    public router: express.Router = Router();

    public constructor() {
        this.router.get('/', authenticator, TransactionController.getTransactions);

        this.router.post('/', authenticator, TransactionController.addTransaction);

        this.router.delete('/:transactionId', authenticator, TransactionController.deleteTransaction);
    }
}

export default new Transactions().router;
