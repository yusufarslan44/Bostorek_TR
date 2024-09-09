const { getAllBooks, createBook, updateBook, getABook, deleteBook } = require('../controllers/bookController');
const express = require('express');
const router = express.Router();


router.get('/', getAllBooks)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)
router.get('/:id', getABook)
module.exports = router