import * as express from 'express';
import {Router} from 'express';
import authenticator from '../middleware/authenticator';
import ArticleController from '../controllers/articleController';

class Articles {
    public router: express.Router = Router();

    public constructor() {
        this.router.get('/:articleId', authenticator, ArticleController.getArticleById);

        this.router.get('/user/:userId', authenticator, ArticleController.getArticlesByUserId);

        this.router.post('/', authenticator, ArticleController.addArticle);

        this.router.put('/:articleId', authenticator, ArticleController.editArticle);

        this.router.delete('/:articleId', authenticator, ArticleController.removeArticle);
    }
}

export default new Articles().router;
