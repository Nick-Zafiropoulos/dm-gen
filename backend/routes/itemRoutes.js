const express = require('express');
const router = express.Router();
const { getItems, postItem, updateItem, deleteItem } = require('../controllers/itemController');

router.get('/', getItems);

router.post('/', postItem);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

module.exports = router;
