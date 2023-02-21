const express = require('express');
const router = express.Router();
const { getShops, postShop, removeItem, deleteShop, addItem } = require('../controllers/shopController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getShops);

router.post('/', protect, postShop);

router.put('/removeitem', protect, removeItem);

router.put('/additem', protect, addItem);

router.delete('/', protect, deleteShop);

module.exports = router;
