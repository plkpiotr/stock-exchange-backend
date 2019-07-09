import * as express from 'express';
import {Router} from 'express';

class Note {
    public router: express.Router = Router();

    public constructor() {
        this.router.post('/', (request, response, next): void => {
            response.status(201).json({
                message: 'POST /notes'
            });
        });

        this.router.get('/:userId', (request, response, next): void => {
            const userId = request.params.userId;
            response.status(200).json({
                userId: userId
            });
        });

        this.router.get('/:noteId', (request, response, next): void => {
            const noteId = request.params.noteId;
            response.status(200).json({
                noteId: noteId
            });
        });

        this.router.put('/:noteId', (request, response, next): void => {
            response.status(200).json({
                message: 'PUT /notes/{noteId}'
            });
        });

        this.router.delete('/:noteId', (request, response, next): void => {
            response.status(200).json({
                message: 'DELETE /articles/{articleId}'
            });
        });
    }
}

export default new Note().router;
