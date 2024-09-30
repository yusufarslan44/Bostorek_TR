const { getAllBooks, createBook, updateBook, getABook, deleteBook, getBooksByUploader } = require('../controllers/bookController');
const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();


router.get('/', getAllBooks)
router.post('/', authenticateToken, createBook)
router.get('/uploader', authenticateToken, getBooksByUploader)
router.get('/:id', getABook)
router.put('/:id', authenticateToken, updateBook)
router.delete('/:id', authenticateToken, deleteBook)
module.exports = router