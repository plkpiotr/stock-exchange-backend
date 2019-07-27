import * as mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    modified: Date,
    userId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model('Note', noteSchema);
