const express = require('express');
const router = express.Router();
const { getNpcs, postNpc, updateNpc, deleteNpc, updateNpcNotes } = require('../controllers/npcController');

router.get('/', getNpcs);

router.post('/', postNpc);

router.put('/', updateNpc);

router.put('/notes', updateNpcNotes);

router.delete('/', deleteNpc);

module.exports = router;
