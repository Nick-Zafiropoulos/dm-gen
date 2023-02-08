import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import diceCanvas from '../images/dicebackground.jpeg';
import dmgenlogowhite from '../images/dmgenlogowhite.png';

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
    dmgentext: {
        width: '100%',
        height: 'auto',
        maxWidth: '500px',
    },
};

function Home() {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <Box style={styles.backgroundContainer}>
                <Box>
                    <Navbar />

                    <Box sx={{ display: 'flex', justifyContent: 'right', mt: 35, pr: 55 }}>
                        <img style={styles.dmgentext} className='' src={dmgenlogowhite} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'right', mt: 5, pr: 25 }}>
                        <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                            Item shop and NPC generation managed by you, viewable by your players.
                        </Typography>
                    </Box>

                    {/* <div className='col'>
                        {user ? (
                            <Button component={Link} to='/campaigns' variant='contained'>
                                My Campaigns
                            </Button>
                        ) : (
                            <Button component={Link} to='/login' variant='contained'>
                                Login
                            </Button>
                        )}
                    </div> */}
                </Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </>
    );
}

export default Home;
