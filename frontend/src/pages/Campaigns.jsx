import React from 'react';
import Navbar from '../components/Navbar';
import CampaignItem from '../components/CampaignItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCampaign, reset } from '../features/campaigns/campaignSlice';
import { Box, shadows, Typography } from '@mui/material';
import blankCanvas from '../images/dmgenblankcloth.png';

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
                <Box sx={{ p: 3 }}>
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
                            <p>You do not have any campaigns yet!</p>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </>
    );
}

export default Campaigns;
