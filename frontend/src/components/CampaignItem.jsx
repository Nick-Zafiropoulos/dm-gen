import { React, useState } from 'react';
// import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCampaign, reset, leaveCampaign, deleteCampaign, getCampaign } from '../features/campaigns/campaignSlice';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, shadows, Button } from '@mui/material';
import Modal from '@mui/material/Modal';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#ECEFF1',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CampaignItem = ({ campaign }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const currentCampaign = campaign;

        await dispatch(setCampaign(currentCampaign));
        navigate('/campaign');
    };

    const clickLeaveCampaign = (e) => {
        e.preventDefault();

        const joinCode = campaign.campaign_link;

        dispatch(leaveCampaign(joinCode));
        navigate('/');
    };

    const clickDeleteCampaign = async (e) => {
        e.preventDefault();

        const campaignId = campaign._id;

        await dispatch(deleteCampaign(campaignId));
        await dispatch(reset());
        await dispatch(getCampaign());
        navigate('/campaigns');
    };

    let campaignLinkVisibility;
    console.log(campaign.dungeon_master);
    console.log(user._id);
    if (user._id == campaign.dungeon_master[0]) {
        campaignLinkVisibility = (
            <Box sx={{ mb: 2 }}>
                <Typography sx={{ mt: 3, color: '#90A4AE', fontSize: '0.8rem' }}>
                    Campaign Code: {campaign.campaign_link}
                </Typography>
            </Box>
        );
    } else {
        campaignLinkVisibility = <span></span>;
    }

    let leaveLinkVisibility;
    if (user._id == campaign.dungeon_master[0]) {
        leaveLinkVisibility = <span></span>;
    } else {
        leaveLinkVisibility = (
            <Box sx={{ ml: 5 }}>
                <Button color='calmRed' variant='outlined' onClick={handleOpen}>
                    Leave Campaign
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box sx={modalStyle}>
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            Are you sure you want to leave this campaign?
                        </Typography>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'right' }}>
                            <Button
                                onClick={clickLeaveCampaign}
                                type='button'
                                variant='contained'
                                color='calmRed'
                                sx={{ color: 'white' }}
                            >
                                Leave
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>

            // <Button onClick={clickLeaveCampaign} type='button' variant='text' sx={{ color: 'white', ml: 5 }}>
            //     Leave Campaign
            // </Button>
        );
    }

    let campaignDeleteVisibility;

    if (user._id == campaign.dungeon_master[0]) {
        campaignDeleteVisibility = (
            <Box sx={{ ml: 5 }}>
                <Button color='calmRed' variant='outlined' onClick={handleOpen}>
                    Delete Campaign
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box sx={modalStyle}>
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            Are you sure you want to delete this campaign?
                        </Typography>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'right' }}>
                            <Button
                                onClick={clickDeleteCampaign}
                                type='button'
                                variant='contained'
                                color='calmRed'
                                sx={{ color: 'white' }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>

            // <Button onClick={clickDeleteCampaign} type='submit' variant='text' sx={{ color: 'white', ml: 5 }}>
            //     Delete Campaign
            // </Button>
        );
    } else {
        campaignDeleteVisibility = <span></span>;
    }

    return (
        <Accordion sx={{ boxShadow: 10, width: { xs: '80vw', lg: '992px' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textShadow: '2px 2px #303030' }}>
                    {campaign.campaign_name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <form onSubmit={onSubmit}>
                        <Box sx={{ mb: 3, mt: 1 }}>
                            <Typography>{campaign.campaign_description}</Typography>
                        </Box>
                        {campaignLinkVisibility}

                        <div>
                            <Box sx={{ display: 'flex' }}>
                                <Button type='submit' variant='contained' color='secondary'>
                                    Enter Campaign
                                </Button>
                                {leaveLinkVisibility}

                                {campaignDeleteVisibility}
                            </Box>
                        </div>
                    </form>
                </Typography>
            </AccordionDetails>
        </Accordion>

        // <Accordion>
        //     <Accordion.Item eventKey='0'>
        //         <Accordion.Header>{campaign.campaign_name}</Accordion.Header>
        //         <Accordion.Body>
        //             <form onSubmit={onSubmit}>
        //                 <div>
        //                     <button type='submit' className='btn btn-primary'>
        //                         Go To Campaign
        //                     </button>
        //                 </div>
        //                 <div>{campaign.campaign_description}</div>
        //                 {campaignLinkVisibility}
        //                 {leaveLinkVisibility}
        //                 {campaignDeleteVisibility}
        //             </form>
        //         </Accordion.Body>
        //     </Accordion.Item>
        // </Accordion>
    );
};

export default CampaignItem;
