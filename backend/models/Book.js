const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    pageNumber: {
        type: Number,
        min: 1
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    image_id: {
        type: String
    }
},
    { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema)
module.exports = Book;