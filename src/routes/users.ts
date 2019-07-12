import * as express from 'express';
import {Router} from 'express';
import authenticator from '../middleware/authenticator';
import UserController from './../controllers/userController';

class Users {
    public router: express.Router = Router();

    public constructor() {
        this.router.post('/register', UserController.register);

        this.router.post('/login', UserController.login);

        this.router.put('/:userId', authenticator, UserController.editUser);

        this.router.delete('/:userId', authenticator, UserController.removeUser);
    }
}

export default new Users().router;
