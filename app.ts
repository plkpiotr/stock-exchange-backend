import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb+srv://stock-exchange:stock-exchange@stock-exchange-btfeh.mongodb.net/test?retryWrites=true&w=majority', {
    useMongoClient: true
});

app.use(morgan('dev'));

app.use((request, response): void => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Authorization');
    // next();
});

app.use((request, response): void => {
    response.status(200).json({
        message: 'OK'
    });
});

export default app;
