import React from 'react';
// import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCampaign, reset, leaveCampaign, deleteCampaign } from '../features/campaigns/campaignSlice';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, shadows, Button } from '@mui/material';

const CampaignItem = ({ campaign }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

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

    const clickDeleteCampaign = (e) => {
        e.preventDefault();

        const campaignId = campaign._id;

        dispatch(deleteCampaign(campaignId));
        navigate('/');
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
            <Button onClick={clickLeaveCampaign} type='button' variant='text' sx={{ color: 'white', ml: 5 }}>
                Leave Campaign
            </Button>
        );
    }

    let campaignDeleteVisibility;
    console.log(campaign.dungeon_master);
    console.log(user._id);
    if (user._id == campaign.dungeon_master[0]) {
        campaignDeleteVisibility = (
            <Button onClick={clickDeleteCampaign} type='submit' variant='text' sx={{ color: 'white', ml: 5 }}>
                Delete Campaign
            </Button>
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
                            <Button type='submit' variant='contained' color='secondary'>
                                Enter Campaign
                            </Button>
                            {leaveLinkVisibility}

                            {campaignDeleteVisibility}
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
