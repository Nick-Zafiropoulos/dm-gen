const express = require('express');
const router = express.Router();
const {
    getNpcs,
    getOneNpc,
    postNpc,
    updateNpc,
    deleteNpc,
    updateNpcNotes,
    deleteNpcNote,
} = require('../controllers/npcController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getNpcs);

router.get('/onenpc', protect, getOneNpc);

router.post('/', protect, postNpc);

router.put('/', protect, updateNpc);

router.put('/notes', protect, updateNpcNotes);

router.put('/deletenote', protect, deleteNpcNote);

router.delete('/', protect, deleteNpc);

module.exports = router;
