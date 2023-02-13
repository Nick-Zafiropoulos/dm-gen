const express = require('express');
const router = express.Router();
const { getShops, postShop, removeItem, deleteShop, addItem } = require('../controllers/shopController');

router.get('/', getShops);

router.post('/', postShop);

router.put('/removeitem', removeItem);

router.put('/additem', addItem);

router.delete('/', deleteShop);

module.exports = router;
