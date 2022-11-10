const express = require('express');
const router = express.Router();
const { getUser, registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, getUser);

router.post('/', registerUser);

router.post('/login', loginUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
