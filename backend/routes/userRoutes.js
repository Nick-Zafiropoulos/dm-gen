const express = require('express');
const router = express.Router();
const { getUsers, postUser, updateUser, deleteUser } = require('../controllers/userController');

router.get('/', getUsers);

router.post('/', postUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
