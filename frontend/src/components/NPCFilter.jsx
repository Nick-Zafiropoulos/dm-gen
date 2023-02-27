import React from 'react';
// import Accordion from 'react-bootstrap/Accordion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNPC, reset, setNPC } from '../features/npcs/npcSlice';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, shadows, Button } from '@mui/material';

const NPCFilter = ({ npc }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const onSubmit = async (e) => {
        e.preventDefault();

        const currentNPC = npc;

        await dispatch(setNPC(currentNPC));
        navigate('/npc');
    };

    return (
        <Accordion sx={{ boxShadow: 10, width: { xs: '100%', lg: '100%' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textShadow: '2px 2px #303030' }}>
                    {npc.npc_name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <form onSubmit={onSubmit}>
                        <Box>
                            <Box sx={{ display: 'inline-flex' }}>
                                <Typography sx={{ fontWeight: 'bold', mr: 1, mb: 1, color: '#90A4AE' }}>
                                    Species:
                                </Typography>
                                <Typography> {npc.npc_species}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ display: 'inline-flex' }}>
                                <Typography sx={{ fontWeight: 'bold', mr: 1, mb: 1, color: '#90A4AE' }}>
                                    Gender:
                                </Typography>
                                <Typography> {npc.npc_gender}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ display: 'inline-flex' }}>
                                <Typography sx={{ fontWeight: 'bold', mr: 1, mb: 1, color: '#90A4AE' }}>
                                    Occupation:
                                </Typography>
                                <Typography> {npc.npc_occupation}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Button type='submit' variant='contained' color='secondary'>
                                View NPC
                            </Button>
                        </Box>
                    </form>
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default NPCFilter;
