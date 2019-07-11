import * as mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
    // article: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Article'
    // },
    // note: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Note'
    // }
});

export default mongoose.model('User', userSchema);
