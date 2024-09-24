const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { updateUser, getUser } = require('../controllers/userController');
const router = express.Router();

router.put('/updateUser', authenticateToken, updateUser)
router.get('/users', authenticateToken, getUser);
module.exports = router