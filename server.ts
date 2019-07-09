import * as http from 'http';
import app from './app';

const DEFAULT_PORT = 8080;

const port = process.env.PORT || DEFAULT_PORT;
const server = http.createServer(app);

server.listen(port);
