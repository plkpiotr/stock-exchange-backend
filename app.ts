import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import articleRoutes from './src/routes/articles';
import noteRoutes from './src/routes/notes';
import transactionRoutes from './src/routes/transactions';
import userRoutes from './src/routes/users';

class App {
    public app: express.Application = express();

    public constructor() {
        this.configure();
        App.configureDatabase();
    }

    private configure(): void {
        this.app.use(cors());

        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(bodyParser.json());

        this.app.use('/articles', articleRoutes);
        this.app.use('/notes', noteRoutes);
        this.app.use('/transactions', transactionRoutes);
        this.app.use('/users', userRoutes);
    }

    private static configureDatabase(): void {
        mongoose.connect('mongodb+srv://stock-exchange:stock-exchange@stock-exchange-btfeh.mongodb.net/' +
            'test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    }
}

export default new App().app;
