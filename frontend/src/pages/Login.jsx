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
    button: {
        backgroundColor: '#3c52b2',
        color: '#fff',
        ':hover': {
            backgroundColor: '#fff',
            color: '#3c52b2',
        },
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

    const [errorMessage, setErrorMessage] = useState({
        user_email: '',
        user_password: '',
    });

    const disallowedSymbols = ['/', '(', ')', '=', '[', ']', '{', '}', ';', ':', '"', ',', '<', '>', '?', '`', '~'];

    const disallowedSymbolsEmail = [
        '/',
        '(',
        ')',
        '=',
        '[',
        ']',
        '{',
        '}',
        ';',
        ':',
        '"',
        ',',
        '<',
        '>',
        '?',
        '`',
        '~',
    ];

    // Error message user_email
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbolsEmail.some((el) => formData.user_email.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                user_email: 'Contains disallowed character',
            }));
        }
    }, [formData.user_email]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (!disallowedSymbolsEmail.some((el) => formData.user_email.includes(el)) && errorMessage.user_email) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    user_email: '',
                }));
            }
        },
        [formData.user_email, errorMessage.user_email]
    );

    // Error message user_password
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => formData.user_password.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                user_password: 'Contains disallowed character',
            }));
        }
    }, [formData.user_password]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (!disallowedSymbols.some((el) => formData.user_password.includes(el)) && errorMessage.user_password) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    user_password: '',
                }));
            }
        },
        [formData.user_password, errorMessage.user_password]
    );

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
                            ml: { xs: 0, sm: 0 },
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

                                    mt: { xs: 10, sm: 0 },
                                    fontSize: '35px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    textShadow: '2px 2px #262626',
                                    ml: 2,
                                }}
                            >
                                Login
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <TextField
                                    sx={{ backgroundColor: 'transparent', color: 'white', mt: 3, ml: 2, width: '80%' }}
                                    fullWidth
                                    id='standard-basic'
                                    error={disallowedSymbolsEmail.some((el) => formData.user_email.includes(el))}
                                    helperText={errorMessage.user_email}
                                    inputProps={{ pattern: '[A-Za-z0-9!@#$%^&*_+.-]{1,}' }}
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
                                    sx={{ backgroundColor: 'transparent', color: 'white', mt: 3, ml: 2, width: '80%' }}
                                    fullWidth
                                    id='standard-basic'
                                    error={disallowedSymbols.some((el) => formData.user_password.includes(el))}
                                    helperText={errorMessage.user_password}
                                    inputProps={{ pattern: '[A-Za-z0-9!@#$%^&*_+.-]{1,}' }}
                                    label='Password'
                                    variant='standard'
                                    type='password'
                                    className='searchBarInput form-control'
                                    placeholder='Enter your password'
                                    name='user_password'
                                    value={user_password}
                                    onChange={onChange}
                                />

                                <Box sx={{ mt: 3, ml: 2 }}>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        sx={{
                                            ':hover': {
                                                bgcolor: '#48413F',
                                                color: '#FFF',
                                            },
                                            color: '#FFF',
                                            backgroundColor: '#785C4D',
                                        }}
                                        // color='secondary'
                                        // style={styles.button}
                                    >
                                        Login
                                    </Button>
                                </Box>
                            </form>

                            <Box sx={{ display: 'inline-flex', mt: 5 }}>
                                <Typography sx={{ pr: 3, mt: 0.5, ml: 2 }} color='primary'>
                                    New User?
                                </Typography>
                                <Button
                                    component={Link}
                                    to='/register'
                                    variant='outlined'
                                    size='small'
                                    sx={{
                                        ':hover': {
                                            bgcolor: '#48413F',
                                            color: '#FFF',
                                            borderColor: '#FF000000',
                                        },
                                        color: '#FFF',
                                        borderColor: '#785C4D',
                                    }}
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
