import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose';
import articleRoutes from './src/routes/article';
import noteRoutes from './src/routes/note';

class App {
    public app: express.Application = express();

    public constructor() {
        this.configure();
        App.connectWithDatabase();
    }

    private configure(): void {
        this.app.use(morgan('dev'));

        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(bodyParser.json());

        this.app.use((request, response, next): void => {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Authorization');
            next();
        });

        this.app.use('/articles', articleRoutes);
        this.app.use('/notes', noteRoutes);
    }

    private static connectWithDatabase(): void {
        mongoose.connect('mongodb+srv://stock-exchange:stock-exchange@stock-exchange-btfeh.mongodb.net/' +
            'test?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });
    }
}

export default new App().app;
