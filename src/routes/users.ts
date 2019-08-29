import * as express from 'express';
import { Router } from 'express';
import UserController from '../controllers/userController';

class Users {
    public router: express.Router = Router();

    public constructor() {
        this.router.post('/register', UserController.register);

        this.router.post('/login', UserController.login);
    }
}

export default new Users().router;
