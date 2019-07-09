import * as express from 'express';
import * as mongoose from 'mongoose';
import {Router} from 'express';
import Note from './../models/note';

class Notes {
    public router: express.Router = Router();

    public constructor() {
        this.router.post('/', (request, response, next) => {
            const note = new Note({
                _id: new mongoose.Types.ObjectId(),
                title: request.body.title,
                content: request.body.content,
                user: new mongoose.Types.ObjectId()
            });
            note.save()
                .then(result => {
                    console.log(result);
                    response.status(201).json({
                        note: note
                    });
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({
                        error: error
                    });
                });
        });

        this.router.get('/:noteId', (request, response, next) => {
            const noteId = request.params.noteId;
            Note.findById(noteId)
                .exec()
                .then(note => {
                    console.log(note);
                    response.status(200).json({
                        note: note
                    });
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({
                        error: error
                    });
                });
        });

        this.router.get('/:userId', (request, response, next) => {
            const userId = request.params.userId;
            response.status(200).json({
                userId: userId
            });
        });

        this.router.put('/:noteId', (request, response, next) => {
            response.status(200).json({
                message: 'PUT /notes/{noteId}'
            });
        });

        this.router.delete('/:noteId', (request, response, next) => {
            response.status(200).json({
                message: 'DELETE /articles/{articleId}'
            });
        });
    }
}

export default new Notes().router;
