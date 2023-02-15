import React from 'react';
import Navbar from '../components/Navbar';
import CampaignItem from '../components/CampaignItem';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCampaign, reset } from '../features/campaigns/campaignSlice';
import { Box, shadows, Typography, Button } from '@mui/material';
import blankCanvas from '../images/dmgenblankcloth.png';
import { motion } from 'framer-motion';

const styles = {
    backgroundCanvas: {
        backgroundImage: `url(${blankCanvas})`,
        // backgroundColor: 'lightgray',
        backgroundPosition: 'top',
        backgroundSize: 'cover',

        height: '100vw',
    },
    backgroundSolid: {
        backgroundColor: '#030418',
        backgroundPosition: 'top',
        backgroundSize: 'cover',

        height: '100vw',
    },
};

function Campaigns() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { campaigns } = useSelector((state) => state.campaign);

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        // if (isError) {
        //     console.log(message);
        // }

        // if (!user) {
        //     navigate('/login');
        // }

        dispatch(getCampaign());

        // return () => {
        //     dispatch(reset());
        // };
    }, [user, navigate, isError, message, dispatch]);

    let CampaignCreateButton;
    if (document.URL.includes('campaigns') || document.URL.includes('join')) {
        CampaignCreateButton = (
            <li>
                <Link to='/campaigns/newcampaign'>Create a Campaign</Link>
            </li>
        );
    } else {
        CampaignCreateButton = <span></span>;
    }

    return (
        <>
            <Box style={styles.backgroundCanvas}>
                <Box>
                    <Navbar />
                </Box>
                <Box
                    component={motion.div}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                    sx={{ p: 3 }}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            mb: 3,
                            mt: 3,
                            fontSize: '35px',
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '2px 2px #262626',
                        }}
                    >
                        My Campaigns
                    </Typography>
                    <Box>
                        {campaigns.length > 0 ? (
                            <div className='campaigns'>
                                {campaigns.map((campaign) => (
                                    <CampaignItem key={campaign._id} campaign={campaign} />
                                ))}{' '}
                            </div>
                        ) : (
                            <Typography sx={{ color: 'white' }}>
                                You do not have any campaigns yet. Click "Create a Campaign" to get started!
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', mt: 3, ml: 3 }}>
                        <Box sx={{ mr: 5 }}>
                            <Button
                                component={Link}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.1 }}
                                initial={{ opacity: 0 }}
                                type='button'
                                variant='contained'
                                color='secondary'
                                to='/campaigns/newcampaign'
                                style={{ color: '#FFF' }}
                            >
                                + Create a Campaign
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                component={Link}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.1 }}
                                initial={{ opacity: 0 }}
                                type='button'
                                variant='contained'
                                color='secondary'
                                to='/join'
                                style={{ color: '#FFF' }}
                            >
                                + Join a Campaign
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </>
    );
}

export default Campaigns;
