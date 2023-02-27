import React from 'react';
import Navbar from '../components/Navbar';
import NewShopOptions from '../components/NewShopOptions';
import { Box, shadows, Typography } from '@mui/material';
import blankCanvas from '../images/dmgenblankcloth.png';

const styles = {
    backgroundCanvas: {
        backgroundImage: `url(${blankCanvas})`,
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

const NewShop = () => {
    return (
        <>
            <Box style={styles.backgroundCanvas}>
                <Navbar />

                <Box className='row'>
                    <NewShopOptions />
                </Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </>
    );
};

export default NewShop;
