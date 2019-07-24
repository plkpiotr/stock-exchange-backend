import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose';
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
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(bodyParser.json());

        this.app.use((request, response, next): void => {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        this.app.use('/articles', articleRoutes);
        this.app.use('/notes', noteRoutes);
        this.app.use('/transactions', transactionRoutes);
        this.app.use('/users', userRoutes);
    }

    private static configureDatabase(): void {
        mongoose.connect('mongodb+srv://stock-exchange:'+ process.env.MONGO_ATLAS_PW +
            '@stock-exchange-btfeh.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    }
}

export default new App().app;
