const express = require('express');
const router = express.Router();
const { getShops, postShop, updateShop, deleteShop } = require('../controllers/shopController');

router.get('/', getShops);

router.post('/', postShop);

router.put('/:id', updateShop);

router.delete('/', deleteShop);

module.exports = router;
