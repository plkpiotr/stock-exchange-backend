import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {Router} from 'express';
import User from './../models/user';

class Users {
    public router: express.Router = Router();

    public constructor() {
        this.router.post('/register', (request, response, next) => {
            User.find({email: request.body.email})
                .exec()
                .then(user => {
                    if (user.length >= 1) {
                        return response.status(409).json({
                            message: "This email has already exists"
                        });
                    } else {
                        bcrypt.hash(request.body.password, 10, (error, hash) => {
                            if (error) {
                                return response.status(500).json({error});
                            } else {
                                const user = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    email: request.body.email,
                                    password: hash,
                                    name: request.body.name
                                });
                                user.save()
                                    .then(result => {
                                        response.status(201).json({
                                            message: 'User created',
                                        });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        response.status(500).json({
                                            error: error
                                        });
                                    });
                            }
                        });
                    }
                });
        });

        this.router.post('/login', (request, response, next) => {
            User.find({email: request.body.email})
                .exec()
                .then(user => {
                    if (user.length < 1) {
                        return response.status(404).json({
                            message: 'User does not exists'
                        });
                    }
                    bcrypt.compare(request.body.password, user[0].password, (error, result) => {
                        if (error) {
                            return response.status(401).json({
                                message: 'Authorization failed'
                            });
                        }
                        if (result) {
                            const token = jwt.sign({
                                userId: user[0]._id
                            }, process.env.JWT_KEY, {
                                expiresIn: '3h'
                            });
                            return response.status(200).json({
                                message: 'Authorization successful',
                                token: token
                            });
                        }
                        response.status(401).json({
                            message: 'Authorization failed',
                        });
                    })
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({
                        error: error
                    });
                });
        });

        this.router.delete('/:userId', (request, response, next) => {
            User.find({_id: request.params.userId})
                .exec()
                .then(user => {
                    if (user.length === 0) {
                        return response.status(404).json({
                            message: 'This user does not exists'
                        });
                    } else {
                        User.remove({_id: request.params.userId})
                            .exec()
                            .then(result => {
                                response.status(200).json({
                                    message: 'User deleted'
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                response.status(500).json({error});
                            });
                    }
                });
        })
    }
}

export default new Users().router;
