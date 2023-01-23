const asyncHandler = require('express-async-handler');
const NPC = require('../models/npcModel');
const npcNames = require('../tables/npcNames');
const npcOccupations = require('../tables/npcOccupations');
const npcPersonalities = require('../tables/npcPersonalities');
const npcFlaws = require('../tables/npcFlaws');
const npcSpecies = require('../tables/npcSpecies');

// @desc Get npc
// @route GET /api/npcs
const getNpcs = asyncHandler(async (req, res) => {
    res.send(`Npc list`);
});

// @desc Create npc
// @route POST /api/npcs
const postNpc = asyncHandler(async (req, res) => {
    if (!req.body.currentCampaign) {
        res.status(400);
        throw new Error('Must be in a campaign to create an NPC');
    }
    let NPCName = '';
    let NPCSpecies = '';
    let NPCAge;
    let NPCGender = '';
    let NPCOccupation = '';
    let NPCPersonality = '';
    let NPCFlaws = '';
    let NPCLocation = req.body.npcData.npcData.npc_location;

    if (req.body.npcData.npcData.npc_name == '') {
        let randomNumber = Math.floor(Math.random() * npcNames.length);
        NPCName = npcNames[randomNumber];
    } else {
        NPCName = req.body.npcData.npcData.npc_name;
    }

    if (req.body.npcData.npcData.npc_species == '') {
        let randomNumber = Math.floor(Math.random() * npcSpecies.length);
        NPCSpecies = npcSpecies[randomNumber];
    } else {
        NPCSpecies = req.body.npcData.npcData.npc_species;
    }

    if (req.body.npcData.npcData.npc_age == '') {
        let randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber < 16) {
            randomNumber = randomNumber + 15;
        }
        NPCAge = randomNumber;
    } else {
        NPCAge = req.body.npcData.npcData.npc_age;
    }

    if (req.body.npcData.npcData.npc_gender == '') {
        let randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber < 48) {
            NPCGender = 'Male';
        }
        if (randomNumber > 47 && randomNumber < 95) {
            NPCGender = 'Female';
        }
        if (randomNumber > 94) {
            NPCGender = 'Nonbinary';
        }
    } else {
        NPCGender = req.body.npcData.npcData.npc_gender;
    }

    if (req.body.npcData.npcData.npc_occupation == '') {
        let randomNumber = Math.floor(Math.random() * npcOccupations.length);
        NPCOccupation = npcOccupations[randomNumber];
    } else {
        NPCOccupation = req.body.npcData.npcData.npc_occupation;
    }

    if (req.body.npcData.npcData.npc_personality == '') {
        let randomNumber = Math.floor(Math.random() * npcPersonalities.length);
        NPCPersonality = npcPersonalities[randomNumber];
    } else {
        NPCPersonality = req.body.npcData.npcData.npc_personality;
    }

    if (req.body.npcData.npcData.npc_flaws == '') {
        let randomNumber = Math.floor(Math.random() * npcFlaws.length);
        NPCFlaws = npcFlaws[randomNumber];
    } else {
        NPCFlaws = req.body.npcData.npcData.npc_flaws;
    }

    const createNPC = await NPC.create({
        npc_name: NPCName,
        npc_species: NPCSpecies,
        npc_age: NPCAge,
        npc_gender: NPCGender,
        npc_occupation: NPCOccupation,
        npc_personality: NPCPersonality,
        npc_flaws: NPCFlaws,
        npc_location: NPCLocation,
        npc_campaign: req.body.currentCampaign,
    });

    res.send(createNPC);
});

// @desc Update npc
// @route PUT /api/npcs/:id
const updateNpc = asyncHandler(async (req, res) => {
    res.send(`updated Npc`);
});

// @desc Delete npc
// @route DELETE /api/npcs/:id
const deleteNpc = asyncHandler(async (req, res) => {
    res.send(`deleted Npc`);
});

module.exports = {
    getNpcs,
    postNpc,
    updateNpc,
    deleteNpc,
};
