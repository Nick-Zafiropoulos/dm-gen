const express = require('express');
const router = express.Router();
const { getUser, registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, getUser);

router.post('/', registerUser);

router.post('/login', loginUser);

module.exports = router;
