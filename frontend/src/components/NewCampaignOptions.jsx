import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCampaign, reset } from '../features/campaigns/campaignSlice';
import Spinner from '../components/Spinner';

function NewCampaignOptions() {
    const [formData, setFormData] = useState({
        campaign_name: '',
        campaign_description: '',
    });

    const { campaign_name, campaign_description } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.campaign);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const campaignData = {
            campaign_name,
            campaign_description,
        };
        dispatch(createCampaign({ campaignData }));

        navigate('/campaigns');
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='mb-3'>
                <label className='form-label'>Campaign Title</label>
                <input
                    type='text'
                    className='form-control'
                    id='campaign_name'
                    name='campaign_name'
                    value={campaign_name}
                    placeholder='Enter a campaign title...'
                    onChange={onChange}
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Description</label>
                <textarea
                    className='form-control'
                    id='campaign_description'
                    name='campaign_description'
                    value={campaign_description}
                    placeholder='Enter a description for your campaign...'
                    rows='3'
                    onChange={onChange}
                ></textarea>
            </div>

            <button className='btn btn-primary' type='submit'>
                Create Campaign
            </button>
        </form>
    );
}

export default NewCampaignOptions;
