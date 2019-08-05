import * as express from 'express';
import { Router } from 'express';
import authenticator from '../middleware/authenticator';
import ArticleController from '../controllers/articleController';

class Articles {
    public router: express.Router = Router();

    public constructor() {
        this.router.get('/:articleId', authenticator, ArticleController.getArticle);

        this.router.get('/', authenticator, ArticleController.getArticles);

        this.router.post('/', authenticator, ArticleController.addArticle);

        this.router.put('/:articleId', authenticator, ArticleController.editArticle);

        this.router.delete('/:articleId', authenticator, ArticleController.deleteArticle);
    }
}

export default new Articles().router;
