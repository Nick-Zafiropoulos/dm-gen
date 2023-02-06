import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '@mui/material';
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
                        A D&D website that helps DMs populate their worlds faster while allowing them to share the
                        information with their players
                    </h6>
                </div>
                <div className='row p-5'>
                    <div className='col'>
                        {user ? (
                            <Button component={Link} to='/campaigns' variant='contained'>
                                My Campaigns
                            </Button>
                        ) : (
                            <Button component={Link} to='/login' variant='contained'>
                                Login
                            </Button>
                        )}
                    </div>
                    <div className='col'>
                        <Button component={Link} to='/register' variant='contained'>
                            Register
                        </Button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Button component={Link} to='/howitworks' variant='contained'>
                            See How It Works
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
