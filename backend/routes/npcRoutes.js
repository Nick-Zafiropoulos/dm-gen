const express = require('express');
const router = express.Router();
const { getNpcs, postNpc, updateNpc, deleteNpc } = require('../controllers/npcController');

router.get('/', getNpcs);

router.post('/', postNpc);

router.put('/:id', updateNpc);

router.delete('/:id', deleteNpc);

module.exports = router;
