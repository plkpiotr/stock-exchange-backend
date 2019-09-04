import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';

class UserController {
    public register = (request, response) => {
        User.find({
            email: request.body.email,
        })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    return response.status(409).json({
                        message: 'Such email has already exists',
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
                            });
                            user.save()
                                .then(() => {
                                    response.status(201).json({
                                        message: 'User created',
                                    });
                                })
                                .catch(error => {
                                    response.status(500).json({
                                        error: error,
                                    });
                                });
                        }
                    });
                }
            });
    };

    public login = (request, response) => {
        User.find({
            email: request.body.email,
        })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return response.status(404).json({
                        message: 'Such user doesn\'t exists',
                    });
                }
                bcrypt.compare(request.body.password, user[0].password, (error, result) => {
                    if (error) {
                        return response.status(401).json({
                            message: 'Authorization failed',
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            _id: user[0]._id,
                        }, 'stock-exchange', {
                            expiresIn: '2h',
                        });
                        return response.status(200).json({
                            message: 'Authorization successful',
                            token: token,
                        });
                    }
                    response.status(401).json({
                        message: 'Authorization failed',
                    });
                })
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };
}

export default new UserController();
