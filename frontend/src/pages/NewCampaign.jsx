import React from 'react';
import Navbar from '../components/Navbar';
import NewCampaignOptions from '../components/NewCampaignOptions';
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

function NewCampaign() {
    return (
        <>
            <Box style={styles.backgroundCanvas}>
                <Navbar />

                <NewCampaignOptions />
            </Box>
        </>
    );
}

export default NewCampaign;
