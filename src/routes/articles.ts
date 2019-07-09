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
                .then(result => {
                    console.log(result);
                    response.status(201).json(article);
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json(error);
                });
        });

        this.router.get('/:articleId', (request, response, next) => {
            const articleId = request.params.articleId;
            Article.findById(articleId)
                .exec()
                .then(article => {
                    console.log(article);
                    if (article) {
                        response.status(200).json(article);
                    } else {
                        response.status(404).json({
                            message: "Not found the article"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json(error);
                });
        });

        this.router.get('/user/:userId', (request, response, next) => {
            const userId = request.params.userId;
            const query = {
                user: userId
            };
            Article.find(query)
                .exec()
                .then(articles => {
                    console.log(articles);
                    response.status(200).json(articles);
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json(error);
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
