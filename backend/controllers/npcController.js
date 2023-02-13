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
    const npcs = await NPC.find({ npc_campaign: req.query.currentCampaign });

    res.send(npcs);
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

//@desc Update npc notes
const updateNpcNotes = asyncHandler(async (req, res) => {
    let noteToNPC = await NPC.findOne({ _id: req.body.newNpcNote._id });

    await noteToNPC.updateOne({ $push: { npc_notes: req.body.newNpcNote.npcNewNote } });

    res.send(noteToNPC);
});

//@desc Delete npc note
const deleteNpcNote = asyncHandler(async (req, res) => {
    let deleteNoteNPC = await NPC.findOne({ _id: req.body.noteToDeleteData._id });

    let noteArray = deleteNoteNPC.npc_notes;
    let noteIndex = noteArray.indexOf(req.body.noteToDeleteData.noteToDelete);

    if (noteIndex == -1) {
        deleteNoteNPC = 'This note does not exist, please refresh the page';
    } else {
        noteArray.splice(noteIndex, 1);

        await deleteNoteNPC.updateOne({ npc_notes: noteArray });
    }

    res.send(deleteNoteNPC);
});

// @desc Update npc
// @route PUT /api/npcs/:id
const updateNpc = asyncHandler(async (req, res) => {
    const npcToUpdate = await NPC.findByIdAndUpdate(
        { _id: req.body.npcInfo._id },
        {
            npc_name: req.body.npcInfo.npc_name,
            npc_species: req.body.npcInfo.npc_species,
            npc_age: req.body.npcInfo.npc_age,
            npc_gender: req.body.npcInfo.npc_gender,
            npc_occupation: req.body.npcInfo.npc_occupation,
            npc_personality: req.body.npcInfo.npc_personality,
            npc_flaws: req.body.npcInfo.npc_flaws,
            npc_location: req.body.npcInfo.npc_location,
        }
    );

    let sendBackNPC = await NPC.findOne({ _id: req.body.npcInfo.npc_id });
    // if (!npcToUpdate) {
    //     res.status(400).json('NPC Not Found');
    // }
    // const user = await User.findById(req.user.id);
    // // check to find user
    // if (!user) {
    //     res.status(401);
    //     throw new Error('User not found');
    // }
    // npcToUpdate.npc_name = req.body.npcInfo.npc_name;
    // npcToUpdate.npc_species = req.body.npcInfo.species;
    // npcToUpdate.npc_age = req.body.npcInfo.age;
    // npcToUpdate.npc_gender = req.body.npcInfo.gender;
    // npcToUpdate.npc_occupation = req.body.npcInfo.occupation;
    // npcToUpdate.npc_personality = req.body.npcInfo.personality;
    // npcToUpdate.npc_flaws = req.body.npcInfo.flaws;
    // npcToUpdate.npc_location = req.body.npcInfo.location;
    // await npcToUpdate.save();

    res.send(sendBackNPC);
});

// @desc Delete npc
// @route DELETE /api/npcs/:id
const deleteNpc = asyncHandler(async (req, res) => {
    const willDelete = await NPC.deleteOne({ _id: req.query.npcToDelete });
    res.send(willDelete);
});

module.exports = {
    getNpcs,
    postNpc,
    updateNpc,
    updateNpcNotes,
    deleteNpcNote,
    deleteNpc,
};
