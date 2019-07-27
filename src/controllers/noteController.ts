import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import Note from '../models/note';

class NoteController {
    public getNoteById = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, process.env.JWT_KEY);
        Note.find({
            _id: request.params.noteId,
            userId: request.userData._id
        })
            .select('-__v')
            .exec()
            .then(note => {
                if (note) {
                    response.status(200).json(note);
                } else {
                    response.status(404).json({
                        message: 'Such note doesn\'t exists'
                    });
                }
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public getNotesByUser = (request, response) => {
        const query = {
            userId: request.userData._id
        };
        Note.find(query)
            .select('-__v')
            .exec()
            .then(notes => {
                if (notes.length > 0) {
                    response.status(200).json(notes);
                } else {
                    response.status(404).json({
                        message: 'Not found any notes'
                    });
                }
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public addNote = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, process.env.JWT_KEY);
        const note = new Note({
            _id: new mongoose.Types.ObjectId(),
            title: request.body.title,
            content: request.body.content,
            userId: request.userData._id
        });
        note.save()
            .then(() => {
                response.status(201).json(note);
            })
            .catch(error => {
                response.status(500).json(error);
            });
    };

    public editNote = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, process.env.JWT_KEY);
        Note.find({
            _id: request.params.noteId,
            userId: request.userData._id
        })
            .exec()
            .then(note => {
                if (note.length === 0) {
                    return response.status(404).json({
                        message: 'Such note doesn\'t exists'
                    });
                } else {
                    Note.update({_id: request.params.noteId}, {
                        $set: {
                            title: request.body.title,
                            content: request.body.content,
                            modified: Date.now()
                        }
                    })
                        .exec()
                        .then(result => {
                            response.status(200).json(result);
                        })
                        .catch(error =>
                            response.status(500).json(error)
                        );
                }
            });
    };

    public removeNote = (request, response) => {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, process.env.JWT_KEY);
        Note.find({
            _id: request.params.noteId,
            userId: request.userData._id
        })
            .exec()
            .then(note => {
                if (note.length === 0) {
                    return response.status(404).json({
                        message: 'Such note doesn\'t exists'
                    });
                } else {
                    Note.deleteOne({_id: request.params.noteId})
                        .exec()
                        .then(() => {
                            response.status(200).json({
                                message: 'Note deleted'
                            });
                        })
                        .catch(error => {
                            response.status(500).json({error});
                        });
                }
            });
    };
}

export default new NoteController();
