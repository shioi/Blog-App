const mongoose = require('mongoose')

//create a schema
const Schema = mongoose.Schema

const blogSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    Image: {
        type: String
    },
    likes: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)