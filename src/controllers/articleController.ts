import * as mongoose from 'mongoose';
import Article from '../models/article';

class ArticleController {
    public getArticleById = (request, response ,next) => {
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
    };

    public getArticlesByUserId = (request, response ,next) => {
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
    };

    public addArticle = (request, response ,next) => {
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
    };

    public editArticle = (request, response ,next) => {
        Article.find({_id: request.params.articleId})
            .exec()
            .then(article => {
                if (article.length === 0) {
                    return response.status(404).json({
                        message: 'This article doesn\'t exists'
                    });
                } else {
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
                }
            });
    };

    public removeArticle = (request, response ,next) => {
        Article.find({_id: request.params.articleId})
            .exec()
            .then(article => {
                if (article.length === 0) {
                    return response.status(404).json({
                        message: 'This article doesn\'t exists'
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
    };
}

export default new ArticleController();
