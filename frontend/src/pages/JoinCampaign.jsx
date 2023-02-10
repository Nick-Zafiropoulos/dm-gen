import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateCampaign, reset } from '../features/campaigns/campaignSlice';
import Spinner from '../components/Spinner';
import { Box, shadows, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';
import blankCanvas from '../images/dmgenblankcloth.png';
import Navbar from '../components/Navbar';

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

const JoinCampaign = () => {
    const [formData, setFormData] = useState({
        campaign_code: '',
    });

    const { campaign_code } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const joinCode = campaign_code;

        dispatch(updateCampaign(joinCode));
        navigate('/campaigns');
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Box style={styles.backgroundCanvas}>
                <Navbar />
                <Box sx={{ mt: 5, ml: 5, maxWidth: '30rem' }}>
                    <Card
                        component={motion.div}
                        initial={{ x: -600 }}
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
                                    Join a Campaign
                                </Typography>

                                <TextField
                                    sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '90%' }}
                                    fullWidth
                                    id='standard-basic'
                                    label='Enter a campaign code'
                                    variant='standard'
                                    type='text'
                                    className='searchBarInput form-control'
                                    placeholder=''
                                    name='campaign_code'
                                    value={campaign_code}
                                    onChange={onChange}
                                />
                                <Box>
                                    <Button sx={{ mt: 3 }} type='submit' variant='contained' color='secondary'>
                                        Join
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </>
    );
};

export default JoinCampaign;
