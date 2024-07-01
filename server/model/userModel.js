import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String
    },
    token: {
        type: String,
    },
    resetTokenExp: Date,
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }
    ]
})

export default mongoose.model('User', userSchema)