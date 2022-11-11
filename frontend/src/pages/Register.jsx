import React from 'react';
import { useState, useEffect } from 'react';

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
            <section className='heading'>
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
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>

            <a className='btn btn-primary' href='/' role='button'>
                Home
            </a>

            <div>
                <p>New User?</p>

                <a className='btn btn-primary' href='/login' role='button'>
                    Login
                </a>
            </div>
        </>
    );
};

export default Register;
