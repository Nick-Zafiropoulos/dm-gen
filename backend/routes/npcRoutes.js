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

router.get('/', getNpcs);

router.get('/onenpc', getOneNpc);

router.post('/', postNpc);

router.put('/', updateNpc);

router.put('/notes', updateNpcNotes);

router.put('/deletenote', deleteNpcNote);

router.delete('/', deleteNpc);

module.exports = router;
