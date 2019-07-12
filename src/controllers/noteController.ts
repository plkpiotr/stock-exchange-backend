import * as mongoose from 'mongoose';
import Note from '../models/note';

class NoteController {
    public getNoteById = (request, response ,next) => {
        Note.findById(request.params.noteId)
            .select('-__v')
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
    };

    public getNotesByUserId = (request, response ,next) => {
        // this.router.get('/user/:userId', (request, response, next) => {
        //     const userId = request.params.userId;
        //     const query = {
        //         user: userId
        //     };
        //     Note.find(query)
        //         .select('-__v')
        //         .exec()
        //         .then(notes => {
        //             console.log(notes);
        //             if (notes.length > 0) {
        //                 response.status(200).json(notes);
        //             } else {
        //                 response.status(404).json({
        //                     message: "Not found notes for the user"
        //                 });
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             response.status(500).json(error);
        //         });
        // });
    };

    public addNote = (request, response ,next) => {
        const note = new Note({
            _id: new mongoose.Types.ObjectId(),
            title: request.body.title,
            content: request.body.content,
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
    };

    public editNote = (request, response ,next) => {
        Note.find({_id: request.params.noteId})
            .exec()
            .then(note => {
                if (note.length === 0) {
                    return response.status(404).json({
                        message: 'This note doesn\'t exists'
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
                            console.log(result);
                            response.status(200).json(result);
                        })
                        .catch(error => {
                            console.log(error);
                            response.status(500).json(error);
                        });
                }
            });
    };

    public removeNote = (request, response ,next) => {
        Note.find({_id: request.params.noteId})
            .exec()
            .then(note => {
                if (note.length === 0) {
                    return response.status(404).json({
                        message: 'This note doesn\'t exists'
                    });
                } else {
                    Note.deleteOne({_id: request.params.noteId})
                        .exec()
                        .then(result => {
                            response.status(200).json({
                                message: 'Note deleted'
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            response.status(500).json({error});
                        });
                }
            });
    };
}

export default new NoteController();
