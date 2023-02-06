import React from 'react';
import Navbar from '../components/Navbar';
import CampaignItem from '../components/CampaignItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCampaign, reset } from '../features/campaigns/campaignSlice';
import { Box, shadows } from '@mui/material';

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
        <Box>
            <Box>
                <Navbar />
            </Box>
            <Box sx={{ p: 3 }}>
                <p>Campaigns:</p>
                <Box sx={{ width: '50%' }}>
                    {campaigns.length >= 0 ? (
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
    );
}

export default Campaigns;
