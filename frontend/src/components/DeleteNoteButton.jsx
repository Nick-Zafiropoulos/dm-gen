import React from 'react';
import { Box, shadows, Button, Typography, TextField } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCircle, MdRemoveCircle } from 'react-icons/md';
import { IconContext } from 'react-icons';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { npcDeleteNote, setNPC, getNPC, getOneNPC } from '../features/npcs/npcSlice';

const DeleteNoteButton = ({ note }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { npcInUse } = useSelector((state) => state.npc);

    const noteDelete = async (e) => {
        e.preventDefault();
        const noteToDeleteData = {
            noteToDelete: note,
            _id: npcInUse._id,
        };

        let noteDeleteForRedux = Object.assign([], npcInUse.npc_notes);
        let deletedNote = note;
        let deletedNoteIndex = noteDeleteForRedux.indexOf(deletedNote);

        noteDeleteForRedux.splice(deletedNoteIndex, 1);

        await dispatch(npcDeleteNote(noteToDeleteData));

        getCurrentNpc();
        dispatch(getNPC());

        navigate('/npc');
    };

    const getCurrentNpc = async () => {
        const npcData = npcInUse._id;

        const newNpcData = await dispatch(getOneNPC(npcData));

        const npcRefresh = {
            npc_name: newNpcData.payload.npc_name,
            npc_species: newNpcData.payload.npc_species,
            npc_age: newNpcData.payload.npc_age,
            npc_gender: newNpcData.payload.npc_gender,
            npc_location: newNpcData.payload.npc_location,
            npc_occupation: newNpcData.payload.npc_occupation,
            npc_personality: newNpcData.payload.npc_personality,
            npc_flaws: newNpcData.payload.npc_flaws,
            _id: npcInUse._id,
            npc_campaign: npcInUse.npc_campaign,
            npc_notes: newNpcData.payload.npc_notes,
        };

        dispatch(setNPC(npcRefresh));
    };

    return (
        <Box component={motion.div} whileHover={{ opacity: 1 }} initial={{ opacity: 0 }}>
            <IconButton aria-label='Example' onClick={noteDelete}>
                <IconContext.Provider
                    value={{
                        color: '#E57373',
                        className: 'global-class-name',
                        size: '.8rem',
                    }}
                >
                    <MdRemoveCircle />
                </IconContext.Provider>
            </IconButton>
        </Box>
    );
};

export default DeleteNoteButton;
