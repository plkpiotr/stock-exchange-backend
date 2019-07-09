import * as mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: Date,
    user: mongoose.Schema.Types.ObjectId
});

export default mongoose.model('Note', noteSchema);
