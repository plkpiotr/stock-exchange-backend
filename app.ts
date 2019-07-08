import * as express from 'express'
const app = express();

app.use((request, response): void => {
    response.status(200).json({
        message: 'OK'
    });
});

export default app;
