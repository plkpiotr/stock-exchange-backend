import * as http from 'http';
import app from './app';

const DEFAULT_PORT = 8080;

const port = process.env.PORT || DEFAULT_PORT;
const server = http.createServer(app);

app.get('/', (req, res) => res.send(
    '<p>This is a back-end part of Stock Exchange Application.</p>' +
    '<p>To see a front-end part in the browser, please visit:</p>' +
    '<a href="https://stock-exchange-frontend.herokuapp.com/">https://stock-exchange-frontend.herokuapp.com/</a>' +
    '<p> or locally: </p>' +
    '<a href="http://localhost:3000/">http://localhost:3000/</a>'
));

server.listen(port);
