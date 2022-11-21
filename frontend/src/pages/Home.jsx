import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';

function Home() {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <Navbar />
            <div className='container text-center'>
                <div className='row p-5'>
                    <h1>DM Gen</h1>
                </div>
                <div className='row p-3'>
                    <h6>
                        A D&D website that helps DMs populate their worlds faster while allowing to them share the
                        information with their players
                    </h6>
                </div>
                <div className='row p-5'>
                    <div className='col'>
                        {user ? (
                            <Link to='/campaigns/:uid' className='btn btn-primary'>
                                My Campaigns
                            </Link>
                        ) : (
                            <Link to='/login' className='btn btn-primary'>
                                Login
                            </Link>
                        )}
                    </div>
                    <div className='col'>
                        <Link to='/register' className='btn btn-primary'>
                            Register
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <a className='btn btn-primary' href='/about' role='button'>
                            See How It Works
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
