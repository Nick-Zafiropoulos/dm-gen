import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import diceCanvas from '../images/dicebackground.jpeg';
import { Box, Typography, TextField, Button } from '@mui/material';
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

    return (
        <Box style={styles.backgroundContainer}>
            <Navbar />
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'right', p: 30 }}>
                    <section className='form'>
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
                                type='text'
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
                            <Button component={Link} to='/register' variant='outlined' color='secondary' size='small'>
                                Register
                            </Button>
                        </Box>
                    </section>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
