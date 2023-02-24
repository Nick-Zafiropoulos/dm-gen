// import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import diceCanvas from '../images/dicebackground.jpeg';
import { Box, Typography, TextField, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import { motion } from 'framer-motion';

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

const Register = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        user_password2: '',
    });

    const { user_name, user_email, user_password, user_password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const [errorMessage, setErrorMessage] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        user_password2: '',
    });

    const disallowedSymbols = ['/', '(', ')', '=', '[', ']', '{', '}', ';', ':', '"', ',', '<', '>', '?', '`', '~'];

    const disallowedSymbolsUsername = [
        '/',
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '+',
        '=',
        '-',
        '[',
        ']',
        '{',
        '}',
        ';',
        ':',
        '"',
        '_',
        ',',
        '<',
        '>',
        '?',
        '`',
        '~',
        '.',
        "'",
    ];

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

    // Error message user_password2
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => formData.user_password2.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                user_password2: 'Contains disallowed character',
            }));
        }
    }, [formData.user_password2]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (!disallowedSymbols.some((el) => formData.user_password2.includes(el)) && errorMessage.user_password2) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    user_password2: '',
                }));
            }
        },
        [formData.user_password2, errorMessage.user_password2]
    );

    // Error message user_name
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbolsUsername.some((el) => formData.user_name.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                user_name: 'Contains disallowed character',
            }));
        }
    }, [formData.user_name]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (!disallowedSymbolsUsername.some((el) => formData.user_name.includes(el)) && errorMessage.user_name) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    user_name: '',
                }));
            }
        },
        [formData.user_name, errorMessage.user_name]
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
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

        if (user_password !== user_password2) {
            toast.error('The entered passwords do not match');
        } else {
            const userData = {
                user_name,
                user_email,
                user_password,
            };

            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Box style={styles.backgroundContainer}>
                <Navbar />
                <Box
                    component={motion.div}
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
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'left', sm: 'right' },
                            ml: { xs: 3, sm: 0 },
                            mt: { xs: 5, sm: 30 },
                            mr: { xs: 3, sm: 35 },
                        }}
                    >
                        <form onSubmit={onSubmit}>
                            <Box>
                                <Typography
                                    sx={{
                                        mt: 3,
                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textShadow: '2px 2px #262626',
                                    }}
                                >
                                    Create Your Account
                                </Typography>
                                <Box>
                                    <TextField
                                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 3 }}
                                        fullWidth
                                        id='standard-basic'
                                        error={disallowedSymbolsUsername.some((el) => formData.user_name.includes(el))}
                                        helperText={errorMessage.user_name}
                                        inputProps={{ pattern: '[A-Za-z0-9 ]{1,}' }}
                                        label='Username'
                                        variant='standard'
                                        type='text'
                                        className='searchBarInput form-control'
                                        placeholder='Enter a username'
                                        name='user_name'
                                        value={user_name}
                                        onChange={onChange}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 3 }}
                                        fullWidth
                                        id='standard-basic'
                                        error={disallowedSymbolsEmail.some((el) => formData.user_email.includes(el))}
                                        helperText={errorMessage.user_email}
                                        inputProps={{ pattern: '[A-Za-z0-9!@#$%^&*_+.-]{1,}' }}
                                        label='Email'
                                        variant='standard'
                                        type='email'
                                        className='searchBarInput form-control'
                                        placeholder='Enter your email'
                                        name='user_email'
                                        value={user_email}
                                        onChange={onChange}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 3 }}
                                        fullWidth
                                        id='standard-basic'
                                        error={disallowedSymbols.some((el) => formData.user_password.includes(el))}
                                        helperText={errorMessage.user_password}
                                        inputProps={{ pattern: '[A-Za-z0-9!@#$%^&*_+.-]{1,}' }}
                                        label='Password'
                                        variant='standard'
                                        type='password'
                                        className='searchBarInput form-control'
                                        placeholder='Enter a password'
                                        name='user_password'
                                        value={user_password}
                                        onChange={onChange}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 3 }}
                                        fullWidth
                                        error={disallowedSymbols.some((el) => formData.user_password2.includes(el))}
                                        helperText={errorMessage.user_password2}
                                        inputProps={{ pattern: '[A-Za-z0-9!@#$%^&*_+.-]{1,}' }}
                                        label='Re-enter Password'
                                        type='password'
                                        variant='standard'
                                        className='form-control'
                                        id='user_password2'
                                        name='user_password2'
                                        value={user_password2}
                                        placeholder='Re-enter your password'
                                        onChange={onChange}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ mt: 3 }}>
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
                                >
                                    Create Account
                                </Button>
                            </Box>
                        </form>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'left', sm: 'right' },
                            mt: 5,
                            ml: { xs: 3, sm: 0 },
                            mr: { xs: 5, sm: 44 },
                        }}
                    >
                        <Typography sx={{ pr: 3, mt: 0.5 }} color='primary'>
                            Already have an account?
                        </Typography>
                        <Button
                            component={Link}
                            to='/login'
                            variant='outlined'
                            size='small '
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
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>{' '}
            {/* <Box style={styles.backgroundSolid}></Box> */}
        </>

        // <>
        //     <section className=''>
        //         <h1>Register</h1>
        //     </section>

        //     <section className='form'>
        //         <form onSubmit={onSubmit}>
        //             <div className='form-group'>
        //                 <input
        //                     type='text'
        //                     className='form-control'
        //                     id='user_name'
        //                     name='user_name'
        //                     value={user_name}
        //                     placeholder='Enter a username'
        //                     onChange={onChange}
        //                 />
        //             </div>

        //             <div className='form-group'>
        //                 <input
        //                     type='email'
        //                     className='form-control'
        //                     id='user_email'
        //                     name='user_email'
        //                     value={user_email}
        //                     placeholder='Enter an email'
        //                     onChange={onChange}
        //                 />
        //             </div>

        //             <div className='form-group'>
        //                 <input
        //                     type='password'
        //                     className='form-control'
        //                     id='user_password'
        //                     name='user_password'
        //                     value={user_password}
        //                     placeholder='Enter a password'
        //                     onChange={onChange}
        //                 />
        //             </div>

        //             <div className='form-group'>
        //                 <input
        //                     type='password'
        //                     className='form-control'
        //                     id='user_password2'
        //                     name='user_password2'
        //                     value={user_password2}
        //                     placeholder='Re-enter your password'
        //                     onChange={onChange}
        //                 />
        //             </div>

        //             <div className='form-group'>
        //                 <button type='submit' className='btn btn-primary'>
        //                     Submit
        //                 </button>
        //             </div>
        //         </form>
        //     </section>

        //     <div>
        //         <p>Already have an account?</p>

        //         <Link to='/login' className='btn btn-primary'>
        //             Login
        //         </Link>
        //     </div>

        //     <Link to='/' className='btn btn-primary'>
        //         Home
        //     </Link>
        // </>
    );
};

export default Register;
