import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
})

export default mongoose.model('Quality', qualitySchema)

