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
                <Box sx={{ display: 'flex', justifyContent: 'right', mt: 30, mr: 35 }}>
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
                                    label='Password'
                                    variant='standard'
                                    type='password'
                                    className='searchBarInput form-control'
                                    placeholder='Enter a password'
                                    name='user_password'
                                    value={user_password}
                                    onChange={onChange}
                                />
                            </Box>{' '}
                            <Box>
                                <TextField
                                    sx={{ backgroundColor: 'transparent', color: 'white', mt: 3 }}
                                    fullWidth
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
                            <Button type='submit' variant='contained' color='secondary'>
                                Create Account
                            </Button>
                        </Box>
                    </form>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'right', mt: 5, mr: 44 }}>
                    <Typography sx={{ pr: 3, mt: 0.5 }} color='primary'>
                        Already have an account?
                    </Typography>
                    <Button component={Link} to='/login' variant='outlined' color='secondary' size='small'>
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>

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
