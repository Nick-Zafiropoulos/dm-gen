import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

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
                <h1>Login</h1>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
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
                        <button type='submit' className='btn btn-primary'>
                            Login
                        </button>
                    </div>
                </form>
            </section>

            <Link to='/' className='btn btn-primary'>
                Home
            </Link>

            <div>
                <p>New User?</p>

                <Link to='/register' className='btn btn-primary'>
                    Register
                </Link>
            </div>
        </>
    );
};

export default Login;
