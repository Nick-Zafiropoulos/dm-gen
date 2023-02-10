import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import diceCanvas from '../images/dicebackground.jpeg';
import dmgenlogowhite from '../images/dmgenlogowhite.png';
import { motion, AnimatePresence } from 'framer-motion';

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
                        <AnimatePresence>
                            <motion.img
                                key='logo'
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'smooth', delay: 0.2 }}
                                exit={{ opacity: 0 }}
                                style={styles.dmgentext}
                                className='logo'
                                src={dmgenlogowhite}
                            />
                        </AnimatePresence>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'right', mt: 5, pr: 25 }}>
                        <Typography
                            component={motion.div}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: 'smooth', delay: 0.6 }}
                            sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}
                        >
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
