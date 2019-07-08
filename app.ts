import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';

class App {
    public app: express.Application = express();

    public constructor() {
        App.connectWithDatabase();
        this.configureApp();
    }

    private configureApp(): void {
        this.app.use(morgan('dev'));
        this.app.use((request, response, next): void => {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Authorization');
            next();
        });
    }

    private static connectWithDatabase(): void {
        mongoose.connect('mongodb+srv://stock-exchange:stock-exchange@stock-exchange-btfeh.mongodb.net/' +
            'test?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });
    }
}

export default new App().app;
