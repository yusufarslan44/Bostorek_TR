const { getAllBooks, createBook, updateBook, getABook, deleteBook } = require('../controllers/bookController');
const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();


router.get('/', getAllBooks)
router.get('/:id', getABook)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete('/:id', authenticateToken, deleteBook)
module.exports = router