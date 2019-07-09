import * as express from 'express';
import * as mongoose from 'mongoose';
import {Router} from 'express';
import Article from './../models/article';

class Articles {
    public router: express.Router = Router();

    public constructor() {
        this.router.post('/', (request, response, next) => {
            const article = new Article({
                _id: new mongoose.Types.ObjectId(),
                title: request.body.title,
                description: request.body.description,
                link: request.body.link,
                user: new mongoose.Types.ObjectId()
            });
            article.save()
                .then(result => console.log(result))
                .catch(error => console.log(error));
            response.status(201).json({
                article: article
            });
        });

        this.router.get('/:userId', (request, response, next) => {
            const userId = request.params.userId;
            response.status(200).json({
                userId: userId
            });
        });

        this.router.get('/:articleId', (request, response, next) => {
            const articleId = request.params.articleId;
            response.status(200).json({
                articleId: articleId
            });
        });

        this.router.put('/:articleId', (request, response, next) => {
            response.status(200).json({
                message: 'PUT /articles/{articleId}'
            });
        });

        this.router.delete('/:articleId', (request, response, next) => {
            response.status(200).json({
                message: 'DELETE /articles/{articleId}'
            });
        });
    }
}

export default new Articles().router;
