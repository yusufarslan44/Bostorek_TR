const express = require('express');
const { register, login, getProtectedData, } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/protected', authenticateToken, getProtectedData);

module.exports = router