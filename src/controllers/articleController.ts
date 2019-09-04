import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import Article from '../models/article';

class ArticleController {
    public getArticle = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, 'stock-exchange');
        Article.findOne({
            _id: request.params.articleId,
            userId: request.userData._id,
        })
            .select('-__v')
            .exec()
            .then(article => {
                if (article) {
                    response.status(200).json(article);
                } else {
                    response.status(404).json({
                        message: 'Such article doesn\'t exists',
                    });
                }
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public getArticles = (request, response) => {
        Article.find({
            userId: request.userData._id,
        })
            .select('-__v')
            .exec()
            .then(articles => {
                if (articles.length > 0) {
                    response.status(200).json(articles);
                } else {
                    response.status(404).json({
                        message: 'Not found any articles',
                    });
                }
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public addArticle = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, 'stock-exchange');
        const article = new Article({
            _id: new mongoose.Types.ObjectId(),
            title: request.body.title,
            description: request.body.description,
            link: request.body.link,
            userId: request.userData._id,
        });
        article.save()
            .then(() => {
                response.status(201).json(article);
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public editArticle = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, 'stock-exchange');
        Article.findOneAndUpdate({
            _id: request.params.articleId,
            userId: request.userData._id}, {
            title: request.body.title,
            description: request.body.description,
            link: request.body.link,
            modified: Date.now(),
        }, {new: true}, (error, article) => {
            if (error) {
                response.status(500).json(error);
            }
            response.status(200).json(article);
        });
    };

    public deleteArticle = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, 'stock-exchange');
        Article.find({
            _id: request.params.articleId,
            userId: request.userData._id,
        })
            .exec()
            .then(article => {
                if (article.length === 0) {
                    return response.status(404).json({
                        message: 'Such article doesn\'t exists',
                    });
                } else {
                    Article.deleteOne({_id: request.params.articleId})
                        .exec()
                        .then(() => {
                            response.status(200).json({
                                message: 'Article deleted',
                            });
                        })
                        .catch(error => {
                            response.status(500).json({error});
                        });
                }
            });
    };
}

export default new ArticleController();
