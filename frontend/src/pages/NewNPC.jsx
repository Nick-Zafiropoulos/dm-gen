import React from 'react';
import Navbar from '../components/Navbar';
import { Box, shadows, Typography } from '@mui/material';
import NewNPCOptions from '../components/NewNPCOptions';
import blankCanvas from '../images/dmgenblankcloth.png';

const styles = {
    backgroundCanvas: {
        backgroundImage: `url(${blankCanvas})`,
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
};

class NewNPC extends React.Component {
    render() {
        return (
            <>
                <Box style={styles.backgroundCanvas}>
                    <Navbar />

                    <Box className='row'>
                        <NewNPCOptions />
                    </Box>
                </Box>
                <Box style={styles.backgroundSolid}></Box>
            </>
        );
    }
}

export default NewNPC;
