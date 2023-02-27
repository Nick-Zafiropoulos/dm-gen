import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCampaign, getCampaign, reset } from '../features/campaigns/campaignSlice';
import Spinner from '../components/Spinner';
import { Box, shadows, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { IconContext } from 'react-icons';
import IconButton from '@mui/material/IconButton';

function NewCampaignOptions() {
    const [formData, setFormData] = useState({
        campaign_name: '',
        campaign_description: '',
    });

    const { campaign_name, campaign_description } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.campaign);

    const [errorMessage, setErrorMessage] = useState({
        campaign_name: '',
        campaign_description: '',
    });

    const disallowedSymbols = ['/', '(', ')', '=', '[', ']', '{', '}', ';', ':', '"', '<', '>', '`', '~'];

    // Error message campaign_name
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => formData.campaign_name.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                campaign_name: 'Contains disallowed character',
            }));
        }
    }, [formData.campaign_name]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (!disallowedSymbols.some((el) => formData.campaign_name.includes(el)) && errorMessage.campaign_name) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    campaign_name: '',
                }));
            }
        },
        [formData.campaign_name, errorMessage.campaign_name]
    );

    // Error message campaign_description
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => formData.campaign_description.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                campaign_description: 'Contains disallowed character',
            }));
        }
    }, [formData.campaign_description]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (
                !disallowedSymbols.some((el) => formData.campaign_description.includes(el)) &&
                errorMessage.campaign_description
            ) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    campaign_description: '',
                }));
            }
        },
        [formData.campaign_description, errorMessage.campaign_description]
    );

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

    const onSubmit = async (e) => {
        e.preventDefault();

        const campaignData = {
            campaign_name,
            campaign_description,
        };
        await dispatch(createCampaign({ campaignData }));

        await dispatch(getCampaign());

        navigate('/campaigns');
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Box sx={{ mt: { xs: 0, sm: 5 }, ml: { xs: 0, sm: 5 }, maxWidth: '50rem' }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                            <Box>
                                <IconButton
                                    component={Link}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.1 }}
                                    initial={{ opacity: 0 }}
                                    to='/campaigns'
                                    type='button'
                                    variant='contained'
                                    color='calmRed'
                                    style={{ color: '#E57373' }}
                                >
                                    <IconContext.Provider
                                        value={{
                                            color: 'calmRed',
                                            className: 'global-class-name',
                                            size: '2rem',
                                        }}
                                    >
                                        <MdClose />
                                    </IconContext.Provider>
                                </IconButton>
                            </Box>
                        </Box>
                        <TextField
                            sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '50%' }}
                            fullWidth
                            required
                            id='standard-basic'
                            error={disallowedSymbols.some((el) => formData.campaign_name.includes(el))}
                            helperText={errorMessage.campaign_name}
                            inputProps={{ pattern: "[A-Za-z0-9'.!?@#$%^&*_+-, ]{1,}" }}
                            label='Campaign Title'
                            variant='standard'
                            type='text'
                            className=''
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
                            required
                            id='standard-basic'
                            label='Description'
                            variant='outlined'
                            type='text'
                            className=''
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
