import React from 'react';
import Navbar from '../components/Navbar';
import CampaignItem from '../components/CampaignItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCampaign, reset } from '../features/campaigns/campaignSlice';

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
        <div>
            <Navbar />
            {campaigns.length >= 0 ? (
                <div className='campaigns'>
                    {campaigns.map((campaign) => (
                        <CampaignItem key={campaign._id} campaign={campaign} />
                    ))}{' '}
                </div>
            ) : (
                <p>You do not have any campaigns yet!</p>
            )}
        </div>
    );
}

export default Campaigns;
