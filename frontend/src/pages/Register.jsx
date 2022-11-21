// import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

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
        <>
            <section className=''>
                <h1>Register</h1>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='user_name'
                            name='user_name'
                            value={user_name}
                            placeholder='Enter a username'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='user_email'
                            name='user_email'
                            value={user_email}
                            placeholder='Enter an email'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='user_password'
                            name='user_password'
                            value={user_password}
                            placeholder='Enter a password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='user_password2'
                            name='user_password2'
                            value={user_password2}
                            placeholder='Re-enter your password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>

            <div>
                <p>Already have an account?</p>

                <Link to='/login' className='btn btn-primary'>
                    Login
                </Link>
            </div>

            <Link to='/' className='btn btn-primary'>
                Home
            </Link>
        </>
    );
};

export default Register;
