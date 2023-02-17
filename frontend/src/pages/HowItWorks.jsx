import React from 'react';
import { Link } from 'react-router-dom';
import { Box, shadows, Typography, Button, TextField } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import backgroundBlur from '../images/dmgenhowitworkscanvasblurlight.png';
import howItWorksTitle from '../images/dmgenhowitworkstitle.png';
import Navbar from '../components/Navbar';
import { MdDoubleArrow } from 'react-icons/md';
import { IconContext } from 'react-icons';

const styles = {
    backgroundCanvas: {
        backgroundImage: `url(${backgroundBlur})`,
        // backgroundColor: 'lightgray',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
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
    },
    gifs: {
        // width: '100%',
        height: 'auto',
        minWidth: '15em',
        // maxWidth: '100px',
    },
};

const HowItWorks = () => {
    return (
        <Box style={styles.backgroundCanvas}>
            <Navbar />
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        style={styles.dmgentext}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 15,
                            mb: 10,

                            maxWidth: '75%',
                        }}
                    >
                        <AnimatePresence>
                            <motion.img
                                key='howitworks'
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'smooth', delay: 0.2 }}
                                exit={{ opacity: 0 }}
                                style={styles.dmgentext}
                                className='howitworks'
                                src={howItWorksTitle}
                            />
                        </AnimatePresence>
                    </Box>
                </Box>
                <Box
                    component={motion.div}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Box sx={{ mt: 10 }}>
                        <Typography
                            component={motion.div}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: 'smooth', delay: 0.4 }}
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                textAlign: 'center',
                                textShadow: '2px 2px #262626',
                                ml: { xs: 2, sm: 10 },
                                mr: { xs: 2, sm: 10 },
                                pr: { xs: 0, sm: 30 },
                                pl: { xs: 0, sm: 30 },
                            }}
                        >
                            DM Gen is a tool for 5th Edition Dungeons and Dragons that allows Dungeon Masters to
                            generate, customize, and save item shops and NPCs. By inviting their players to join their
                            DM Gen campaign, players can view item shop inventories and NPC information.
                        </Typography>

                        <Typography
                            component={motion.div}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: 'smooth', delay: 0.6 }}
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '2rem',
                                textAlign: 'center',
                                ml: { xs: 0, sm: 10 },
                                mr: { xs: 0, sm: 10 },
                                mt: 30,
                                mb: 20,
                                textShadow: '2px 2px #262626',
                            }}
                        >
                            Let's take a look through some of the features of DM Gen:
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: { xs: 'left', sm: 'space-between' },
                        mb: 30,
                    }}
                >
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{
                            boxShadow: 20,
                            display: 'inline-flex',
                            border: '1px solid black',
                            ml: { xs: 0, sm: 20 },
                        }}
                        viewport={{ once: true }}
                    >
                        <img style={styles.gifs} src='https://i.imgur.com/PN1F0ws.gif' />
                    </Box>
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ p: { xs: 3, sm: 10 }, textShadow: '2px 2px #262626' }}
                        viewport={{ once: true }}
                    >
                        <Typography sx={{ mt: 10, mb: 10, color: 'white', fontSize: '1.5rem' }}>
                            Generate fully random NPCs with a single button press, or fill in the blanks that you have
                            specifics for.
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        mb: 30,
                    }}
                >
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ boxShadow: 20, display: 'inline-flex', border: '1px solid black', ml: { xs: 0, sm: 20 } }}
                        viewport={{ once: true }}
                    >
                        <img style={styles.gifs} src='https://i.imgur.com/SNnM6UY.gif' />
                    </Box>
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ p: { xs: 3, sm: 10 }, textShadow: '2px 2px #262626' }}
                        viewport={{ once: true }}
                    >
                        <Typography sx={{ mt: 10, mb: 10, color: 'white', fontSize: '1.5rem' }}>
                            Create shops with randomly generated wares based on the criteria you choose. Once a shop is
                            created, you can remove items or add your own custom items.
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        mb: 30,
                    }}
                >
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ boxShadow: 20, display: 'inline-flex', border: '1px solid black', ml: { xs: 0, sm: 20 } }}
                        viewport={{ once: true }}
                    >
                        <img style={styles.gifs} src='https://i.imgur.com/M5EDNTX.gif' />
                    </Box>
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ p: { xs: 3, sm: 10 }, textShadow: '2px 2px #262626' }}
                        viewport={{ once: true }}
                    >
                        <Typography sx={{ mt: 10, mb: 10, color: 'white', fontSize: '1.5rem' }}>
                            Easily search through shops and NPCs to view their contents.
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        mb: 30,
                    }}
                >
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ boxShadow: 20, display: 'inline-flex', border: '1px solid black', ml: { xs: 0, sm: 20 } }}
                        viewport={{ once: true }}
                    >
                        <img style={styles.gifs} src='https://i.imgur.com/sJ4Nl9u.gif' />
                    </Box>
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ p: { xs: 3, sm: 10 }, textShadow: '2px 2px #262626' }}
                        viewport={{ once: true }}
                    >
                        <Typography sx={{ mt: 10, mb: 10, color: 'white', fontSize: '1.5rem' }}>
                            Quickly edit NPC characteristics to reflect changes to the character or to give players new
                            information.
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        mb: 20,
                    }}
                >
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ boxShadow: 20, display: 'inline-flex', border: '1px solid black', ml: { xs: 0, sm: 20 } }}
                        viewport={{ once: true }}
                    >
                        <img style={styles.gifs} src='https://i.imgur.com/FxALMbs.gif' />
                    </Box>
                    <Box
                        component={motion.div}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 500 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ p: { xs: 3, sm: 10 }, textShadow: '2px 2px #262626' }}
                        viewport={{ once: true }}
                    >
                        <Typography sx={{ mt: 10, mb: 10, color: 'white', fontSize: '1.5rem' }}>
                            Players can add notes to any NPC page, making it simple to view all information about a
                            given character.
                        </Typography>
                    </Box>
                </Box>{' '}
                <Box
                    component={motion.div}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 40,
                        opacity: {
                            duration: 1,
                        },
                    }}
                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    sx={{ p: { xs: 0, sm: 10 } }}
                    viewport={{ once: true }}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Typography
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: { xs: '1em', sm: '2.5rem' },
                            textAlign: 'center',
                            mr: 1,
                            mt: 20,
                            mb: 20,
                            textShadow: '2px 2px #262626',
                        }}
                    >
                        Interested? Get started building your campaign here!
                    </Typography>
                    <Box
                        component={motion.div}
                        initial={{ x: 0 }}
                        animate={{ x: [0, 20, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <IconContext.Provider
                            value={{ color: 'white', className: 'global-class-name', size: '3.5rem' }}
                        >
                            <MdDoubleArrow />
                        </IconContext.Provider>
                    </Box>
                    <Button
                        component={Link}
                        to='/register'
                        variant='contained'
                        color='secondary'
                        sx={{ ml: { xs: 2, sm: 8 }, mr: { xs: 2, sm: 0 } }}
                        style={{ color: '#FFF' }}
                    >
                        Create My Account
                    </Button>
                </Box>
            </Box>
            <Box sx={{ pb: 30 }}></Box>
        </Box>
    );
};

export default HowItWorks;

// description of what DM Gen is
// what you can do
// - create campaigns and invite your players to them
// - generate new shops based on your needs or add your own custom items
// - generate new NPCs with randomized traits or fill in the ones you already know
// - add, view, and search through all shops and NPCs related to a specific campaign
// - players can write notes about any NPC in the campaign
