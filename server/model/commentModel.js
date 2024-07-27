import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    comment: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

}, {
    timestamps: true,
})

export default mongoose.model('Comment', postSchema)