import * as express from 'express';
import { Router } from 'express';
import authenticator from '../middleware/authenticator';
import TransactionController from '../controllers/transactionController';

class Transactions {
    public router: express.Router = Router();

    public constructor() {
        this.router.get('/:transactionId', authenticator, TransactionController.getTransaction);

        this.router.get('/', authenticator, TransactionController.getTransactions);

        this.router.post('/', authenticator, TransactionController.addTransaction);

        this.router.put('/:transactionId', authenticator, TransactionController.editTransaction);

        this.router.delete('/:transactionId', authenticator, TransactionController.removeTransaction);
    }
}

export default new Transactions().router;
