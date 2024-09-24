const Book = require("../models/Book")
const { isValidİd, findDocumentById, checkValidationErrors } = require("../utils");


const createBook = async (req, res) => {
    try {

        const { title, author, description, pageNumber } = req.body;

        const uploader = req.user.id

        const existingBook = await Book.findOne({ title, author })
        if (existingBook) {
            return res.status(400).json({ error: "A book with same title and author already exist!" })
        }

        const newBook = await Book.create({
            title,
            author,
            description,
            pageNumber,
            uploader
        })
        return res
            .status(201)
            .json({ message: "Book Created successfully ", book: newBook })

    } catch (error) {
        //Handle mongoose validation error
        if (error.name === 'ValidationError') {
            if (checkValidationErrors(error, res)) return;
        } else {
            console.error("Erorr at creating book", error)
            return res.status(500).json({ error: 'Internal Server error' })
        }

    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        console.error("Erorr at not find books", error)
        return res.status(500).json({ error: 'Internal Server error' })
    }
}

const getABook = async (req, res) => {

    const { id } = req.params;

    if (isValidİd(id, res)) return;
    try {
        const book = await findDocumentById(Book, id, res);
        if (!book) return;
        res.status(200).json(book)
    } catch (error) {
        console.error("Erorr at not find a books", error)
        return res.status(500).json({ error: 'Internal Server error' })
    }
}
const getBooksByUploader = async (req, res) => {
    try {
        const uploaderId = req.user.id;
        const books = await Book.find({ uploader: uploaderId })
        res.status(200).json(books)
    } catch (error) {
        console.error("Erorr at not get books by uploader", error)
        return res.status(500).json({ error: 'Internal Server error' })
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, pageNumber, rating } = req.body;


    if (isValidİd(id, res)) return;

    try {
        const book = await findDocumentById(Book, id, res);
        if (!book) return;

        book.title = title || book.title;
        book.author = author || book.title;
        book.description = description || book.description;
        book.pageNumber = pageNumber || book.pageNumber;
        book.rating = rating || book.rating;

        await book.save();

        res.status(200).json({ message: 'The book udated successfully' })

    } catch (error) {
        console.error("Erorr at not updateABook", error)
        return res.status(500).json({ error: 'Internal Server error' })
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params

    if (isValidİd(id, res)) return;

    try {
        const book = await findDocumentById(Book, id, res);
        if (!book) return;

        await book.deleteOne()
        res.status(200).json({ message: 'Book deleted successfully' })
    } catch (error) {
        console.error("Erorr at not deleteBook", error)
        return res.status(500).json({ error: 'Internal Server error' })
    }
}

module.exports = {
    getAllBooks,
    createBook,
    updateBook,
    getABook,
    deleteBook,
    getBooksByUploader,
}