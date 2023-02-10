import React from 'react';
import { Box, shadows, Button, Typography, TextField } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCircle, MdRemoveCircle } from 'react-icons/md';
import { IconContext } from 'react-icons';
import IconButton from '@mui/material/IconButton';

const DeleteNoteButton = ({ note }) => {
    const noteDelete = (e) => {
        e.preventDefault();
        console.log(note);
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
