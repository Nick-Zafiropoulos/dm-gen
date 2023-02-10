import React from 'react';
import Navbar from '../components/Navbar';
import CampaignItem from '../components/CampaignItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCampaign, reset } from '../features/campaigns/campaignSlice';
import { Box, shadows, Typography } from '@mui/material';
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
                                You do not have any campaigns yet. Click "Create a Campaign" in the banner above to get
                                started!
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </>
    );
}

export default Campaigns;
