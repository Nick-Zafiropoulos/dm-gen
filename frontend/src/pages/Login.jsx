import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import diceCanvas from '../images/dicebackground.jpeg';
import { Box, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';

const styles = {
    backgroundContainer: {
        backgroundImage: `url(${diceCanvas})`,
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

const Login = () => {
    const [formData, setFormData] = useState({
        user_email: '',
        user_password: '',
    });

    const { user_email, user_password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/campaigns');
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

        const userData = {
            user_email,
            user_password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <>
            <Box style={styles.backgroundContainer}>
                <Navbar />
                {/* <motion.div initial='hidden' animate='visible' variants={variants} /> */}

                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'left', sm: 'right' },
                            ml: { xs: 3, sm: 0 },
                            p: { xs: 0, sm: 30 },
                        }}
                    >
                        <motion.section
                            initial={{ x: 650, opacity: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 40,
                                opacity: {
                                    duration: 0.4,
                                },
                            }}
                            animate={{ x: 0, opacity: 1 }}
                            className='form'
                        >
                            <Typography
                                sx={{
                                    display: 'flex',

                                    mt: 3,
                                    fontSize: '35px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    textShadow: '2px 2px #262626',
                                }}
                            >
                                Login
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <TextField
                                    sx={{ backgroundColor: 'transparent', color: 'white', mt: 3 }}
                                    fullWidth
                                    id='standard-basic'
                                    label='Email'
                                    variant='standard'
                                    type='text'
                                    className='searchBarInput form-control'
                                    placeholder='Enter your email'
                                    name='user_email'
                                    value={user_email}
                                    onChange={onChange}
                                />

                                <TextField
                                    sx={{ backgroundColor: 'transparent', color: 'white', mt: 3 }}
                                    fullWidth
                                    id='standard-basic'
                                    label='Password'
                                    variant='standard'
                                    type='password'
                                    className='searchBarInput form-control'
                                    placeholder='Enter your password'
                                    name='user_password'
                                    value={user_password}
                                    onChange={onChange}
                                />

                                <Box sx={{ mt: 3 }}>
                                    <Button type='submit' variant='contained' color='secondary'>
                                        Login
                                    </Button>
                                </Box>
                            </form>

                            <Box sx={{ display: 'inline-flex', mt: 5 }}>
                                <Typography sx={{ pr: 3, mt: 0.5 }} color='primary'>
                                    New User?
                                </Typography>
                                <Button
                                    component={Link}
                                    to='/register'
                                    variant='outlined'
                                    color='secondary'
                                    size='small'
                                >
                                    Register
                                </Button>
                            </Box>
                        </motion.section>
                    </Box>
                </Box>
            </Box>
            {/* <Box style={styles.backgroundSolid}></Box> */}
        </>
    );
};

export default Login;
