const express = require('express');
const router = express.Router();
const { getShops, postShop, removeItem, deleteShop } = require('../controllers/shopController');

router.get('/', getShops);

router.post('/', postShop);

router.put('/removeitem', removeItem);

router.delete('/', deleteShop);

module.exports = router;
