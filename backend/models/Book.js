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
    }
},
    { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema)
module.exports = Book;