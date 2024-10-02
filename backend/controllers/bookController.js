const Book = require("../models/Book")
const cloudinary = require('cloudinary').v2
const fs = require('fs');
const path = require('path');
const { isValidİd, findDocumentById, checkValidationErrors } = require("../utils");
// const util = require('util');
// const readFile = util.promisify(fs.readFile);

const createBook = async (req, res) => {
    try {

        const { title, author, description, pageNumber } = req.body;
        const uploader = req.user.id;

        // const imagePath = path.join(__dirname, '..', '..', 'backend', 'assets', 'image', 'b_detail.jpg');
        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
            return res.status(400).json({ error: "A book with same title and author already exist!" });
        }
        if (req.files == null) {
            // const data = await readFile(imagePath);
            // req.files = {
            //     image: {
            //         tempFilePath: imagePath,
            //         data: data
            //     }
            // };
            const newBook = await Book.create({
                title,
                author,
                description,
                pageNumber,
                uploader,
                url: 'https://res.cloudinary.com/divgpkhwq/image/upload/v1727802635/Bostorek_tr/b_detail_vctoje.jpg',
                image_id: 'Bostorek_tr/b_detail_default'
            });
            return res
                .status(201)
                .json({ message: "Book Created successfully ", book: newBook });
        } else {
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath, {
                use_filename: true,
                folder: 'Bostorek_tr'
            });
            console.log("RESULT", result);

            const newBook = await Book.create({
                title,
                author,
                description,
                pageNumber,
                uploader,
                url: result.secure_url,
                image_id: result.public_id
            });

            if (req.files.image.tempFilePath.includes('temp')) {
                fs.unlinkSync(req.files.image.tempFilePath);
            }
            return res
                .status(201)
                .json({ message: "Book Created successfully ", book: newBook });

        }
    } catch (error) {
        //Handle mongoose validation error
        if (error.name === 'ValidationError') {
            if (checkValidationErrors(error, res)) return;
        } else {
            console.error("Error at creating book", error);
            return res.status(500).json({ error: 'Internal Server error' });
        }
    }
};

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
    const { title, author, description, pageNumber } = req.body;
    console.log("req body ", req.body);
    if (isValidİd(id, res)) return;

    try {
        const book = await findDocumentById(Book, id, res);
        if (!book) return;
        console.log("book nesnesi", book);
        const photoId = book.image_id
        console.log("updateBook image id", photoId);

        if (photoId !== 'Bostorek_tr/b_detail_default' && req.files !== null && req.files.image) {
            console.log("if çalıştı");
            await cloudinary.uploader.destroy(photoId)
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath, {
                use_filename: true,
                folder: 'Bostorek_tr'
            });
            book.url = result.secure_url || book.url;
            book.image_id = result.public_id || book.image_id
            if (req.files.image.tempFilePath.includes('temp')) {
                fs.unlinkSync(req.files.image.tempFilePath);
            }

        }
        book.title = title || book.title;
        book.author = author || book.title;
        book.description = description || book.description;
        book.pageNumber = pageNumber || book.pageNumber;



        await book.save();

        res.status(200).json({ message: 'The book udated successfully', book })

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
        console.log("bulduğumuz kitap", book);

        const photoId = book.image_id
        if (photoId !== 'Bostorek_tr/b_detail_default') {
            await cloudinary.uploader.destroy(photoId)
        }
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