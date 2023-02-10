import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCampaign, reset } from '../features/campaigns/campaignSlice';
import Spinner from '../components/Spinner';
import { Box, shadows, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';

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
        <Box sx={{ mt: 5, ml: 5, maxWidth: '50rem' }}>
            <Card
                component={motion.div}
                initial={{ x: -900 }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 40,
                    delay: 0.1,
                }}
                animate={{ x: 0, opacity: 1 }}
                sx={{ pl: 2, pr: 2, boxShadow: 10 }}
            >
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Typography
                            sx={{
                                display: 'flex',

                                fontSize: '35px',
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '2px 2px #262626',
                            }}
                        >
                            Create a Campaign
                        </Typography>

                        <TextField
                            sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '50%' }}
                            fullWidth
                            id='standard-basic'
                            label='Campaign Title'
                            variant='standard'
                            type='text'
                            className='searchBarInput form-control'
                            placeholder='Enter a title for your campaign'
                            name='campaign_name'
                            value={campaign_name}
                            onChange={onChange}
                        />

                        <TextField
                            sx={{ backgroundColor: 'transparent', color: 'white', mt: 3 }}
                            fullWidth
                            multiline
                            rows={6}
                            id='standard-basic'
                            label='Description'
                            variant='outlined'
                            type='text'
                            className='searchBarInput form-control'
                            placeholder='Write a description for this campaign'
                            name='campaign_description'
                            value={campaign_description}
                            onChange={onChange}
                        />
                        <Button sx={{ mt: 3 }} variant='contained' color='secondary' type='submit'>
                            Create
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default NewCampaignOptions;
