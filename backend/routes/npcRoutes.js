const express = require('express');
const router = express.Router();
const { getNpcs, postNpc, updateNpc, deleteNpc } = require('../controllers/npcController');

router.get('/', getNpcs);

router.post('/', postNpc);

router.put('/', updateNpc);

router.delete('/', deleteNpc);

module.exports = router;
