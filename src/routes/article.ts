import * as express from 'express';
import {Router} from 'express';

class Article {
    public router: express.Router = Router();

    public constructor() {
        this.router.post('/', (request, response, next): void => {
            response.status(201).json({
                message: 'POST /articles'
            });
        });

        this.router.get('/:userId', (request, response, next): void => {
            const userId = request.params.userId;
            response.status(200).json({
                userId: userId
            });
        });

        this.router.get('/:articleId', (request, response, next): void => {
            const articleId = request.params.articleId;
            response.status(200).json({
                articleId: articleId
            });
        });

        this.router.put('/:articleId', (request, response, next): void => {
            response.status(200).json({
                message: 'PUT /articles/{articleId}'
            });
        });

        this.router.delete('/:articleId', (request,  response, next): void => {
            response.status(200).json({
                message: 'DELETE /articles/{articleId}'
            });
        });
    }
}


export default new Article().router;
