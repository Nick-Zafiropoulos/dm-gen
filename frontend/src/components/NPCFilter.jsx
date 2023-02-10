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

    useEffect(() => {
        // dispatch(getNPC());
    }, [user, navigate, isError, message, dispatch]);

    return (
        <Accordion sx={{ boxShadow: 3, width: { xs: '100%', lg: '100%' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textShadow: '2px 2px #262626' }}>
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

        // <Accordion className='mt-2 mb-2'>
        //     <Accordion.Item eventKey='0'>
        //         <Accordion.Header>{npc.npc_name}</Accordion.Header>
        //         <Accordion.Body>
        //             <form onSubmit={onSubmit}>
        //                 <div
        //                     id='collapseOne'
        //                     className='accordion-collapse collapse show'
        //                     aria-labelledby='headingOne'
        //                     data-bs-parent='#accordionExample'
        //                 >
        //                     <div className='accordion-body'>
        //                         <div>
        //                             <button type='submit' className='btn btn-primary'>
        //                                 Go To NPC
        //                             </button>
        //                         </div>
        //                         <p>Species: {npc.npc_species}</p>
        //                         <p>Gender: {npc.npc_gender}</p>
        //                         <p>Occupation: {npc.npc_occupation}</p>
        //                     </div>
        //                 </div>
        //             </form>
        //         </Accordion.Body>
        //     </Accordion.Item>
        // </Accordion>
    );
};

export default NPCFilter;
