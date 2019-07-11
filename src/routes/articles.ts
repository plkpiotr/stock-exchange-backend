import * as express from 'express';
import * as mongoose from 'mongoose';
import {Router} from 'express';
import Article from './../models/article';
import User from './../models/user';
import authenticator from '../middleware/authenticator';

class Articles {
    public router: express.Router = Router();

    public constructor() {
        this.router.post('/', authenticator, (request, response, next) => {
            const article = new Article({
                _id: new mongoose.Types.ObjectId(),
                title: request.body.title,
                description: request.body.description,
                link: request.body.link,
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

        this.router.get('/:articleId', authenticator, (request, response, next) => {
            Article.findById(request.params.articleId)
                .select('-__v')
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

        // this.router.get('/user/:userId', (request, response, next) => {
        //     const userId = request.params.userId;
        //     const query = {
        //         user: userId
        //     };
        //     Article.find(query)
        //         .select('-__v')
        //         .exec()
        //         .then(articles => {
        //             console.log(articles);
        //             if (articles.length > 0) {
        //                 response.status(200).json(articles);
        //             } else {
        //                 response.status(404).json({
        //                     message: "Not found articles for the user"
        //                 });
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             response.status(500).json(error);
        //         });
        // });

        this.router.put('/:articleId', authenticator, (request, response, next) => {
            Article.update({_id: request.params.articleId}, {
                $set: {
                    title: request.body.title,
                    description: request.body.description,
                    link: request.body.link,
                    modified: Date.now()
                }
            })
                .exec()
                .then(result => {
                    console.log(result);
                    response.status(200).json(result);
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json(error);
                });
        });

        this.router.delete('/:articleId', (request, response, next) => {
            Article.find({_id: request.params.articleId})
                .exec()
                .then(article => {
                    if (article.length === 0) {
                        return response.status(404).json({
                            message: 'This article does not exists'
                        });
                    } else {
                        Article.deleteOne({_id: request.params.articleId})
                            .exec()
                            .then(result => {
                                response.status(200).json({
                                    message: 'Article deleted'
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                response.status(500).json({error});
                            });
                    }
                });
        });
    }
}

export default new Articles().router;
