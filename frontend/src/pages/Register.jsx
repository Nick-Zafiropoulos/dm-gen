import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const { username, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

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
                            id='username'
                            name='username'
                            value={username}
                            placeholder='Enter a username'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter an email'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter a password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
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
