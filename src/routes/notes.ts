import * as express from 'express';
import { Router } from 'express';
import authenticator from '../middleware/authenticator';
import NoteController from '../controllers/noteController';

class Notes {
    public router: express.Router = Router();

    public constructor() {
        this.router.get('/:noteId', authenticator, NoteController.getNote);

        this.router.get('/', authenticator, NoteController.getNotes);

        this.router.post('/', authenticator, NoteController.addNote);

        this.router.put('/:noteId', authenticator, NoteController.editNote);

        this.router.delete('/:noteId', authenticator, NoteController.deleteNote);
    }
}

export default new Notes().router;
