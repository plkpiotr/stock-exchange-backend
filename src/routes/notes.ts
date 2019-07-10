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
                    response.status(201).json(note);
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json(error);
                });
        });

        this.router.get('/:noteId', (request, response, next) => {
            const noteId = request.params.noteId;
            Note.findById(noteId)
                .exec()
                .then(note => {
                    console.log(note);
                    if (note) {
                        response.status(200).json(note);
                    } else {
                        response.status(404).json({
                            message: "Not found the note"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json(error);
                });
        });

        this.router.get('/user/:userId', (request, response, next) => {
            const userId = request.params.userId;
            const query = {
                user: userId
            };
            Note.find(query)
                .exec()
                .then(notes => {
                    console.log(notes);
                    if (notes.length > 0) {
                        response.status(200).json(notes);
                    } else {
                        response.status(404).json({
                            message: "Not found notes for the user"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json(error);
                });
        });

        this.router.put('/:noteId', (request, response, next) => {
            const noteId = request.params.noteId;
            Note.update({_id: noteId}, {
                $set: {
                    title: request.body.title,
                    content: request.body.content,
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
                })
        });

        this.router.delete('/:noteId', (request, response, next) => {
            const noteId = request.params.noteId;
            Note.remove({_id: noteId})
                .exec()
                .then(result => {
                    response.status(200).json(result);
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({error});
                });
        });
    }
}

export default new Notes().router;
