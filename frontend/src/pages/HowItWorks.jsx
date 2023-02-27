import React from 'react';
import { Link } from 'react-router-dom';
import { Box, shadows, Typography, Button, TextField } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import backgroundBlur from '../images/dmgenhowitworkscanvasdark.png';
import howItWorksTitle from '../images/dmgenhowitworkstitle.png';
import Navbar from '../components/Navbar';
import { MdDoubleArrow } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    backgroundCanvas: {
        backgroundImage: `url(${backgroundBlur})`,
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
        width: '90%',
        height: 'auto',
        minWidth: '5em',
        maxWidth: '50rem',
    },
};

const HowItWorks = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

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
                            mt: { xs: 5, sm: 15 },
                            mb: 10,

                            maxWidth: { xs: '90%', lg: '75%' },
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
                    <Box sx={{ mt: { xs: 0, sm: 10 }, width: '80%' }}>
                        <Typography
                            component={motion.div}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: 'smooth', delay: 0.4 }}
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: { xs: '1rem', sm: '1.2rem' },
                                textAlign: { xs: 'left', sm: 'center' },
                                textShadow: '2px 2px #262626',
                            }}
                        >
                            DM Gen is a tool for 5th Edition Dungeons and Dragons that allows Dungeon Masters to easily
                            generate, customize, and save item shops and NPCs. After creating a campaign, users can
                            invite their players to join the campaign to view item shop inventories and NPC information.
                            Running your D&D campaign is already a lot of work, DM Gen takes care of creating and
                            organizing player-facing information so you don't have to.
                        </Typography>

                        <Typography
                            component={motion.div}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: 'smooth', delay: 0.6 }}
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: { xs: '1.5rem', sm: '2.5rem' },
                                textAlign: { xs: 'left', sm: 'center' },

                                mt: { xs: 7, sm: 30 },
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
                        flexDirection: { xs: 'column', lg: 'row' },
                        justifyContent: { xs: 'center', lg: 'center' },
                        alignItems: 'center',
                        mb: { xs: 10, sm: 30 },
                    }}
                >
                    <motion.img
                        component={motion.image}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        src='https://i.imgur.com/hAPVHkq.gif'
                        style={styles.gifs}
                    />
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
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{
                            p: { xs: 3, lg: 10 },
                            textShadow: '2px 2px #262626',
                        }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            sx={{
                                mt: { xs: 1, lg: 10 },
                                mb: { xs: 1, lg: 10 },
                                color: 'white',
                                fontSize: { xs: '1rem', sm: '1.5rem' },

                                maxWidth: '20em',
                            }}
                        >
                            Generate fully random NPCs with a single button press, or fill in the blanks that you have
                            specifics for and let DM Gen create the rest.
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        justifyContent: { xs: 'center', lg: 'center' },
                        alignItems: 'center',
                        mb: { xs: 10, sm: 30 },
                    }}
                >
                    <motion.img
                        component={motion.image}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        src='https://i.imgur.com/SNnM6UY.gif'
                        style={styles.gifs}
                    />

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
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ p: { xs: 3, lg: 10 }, textShadow: '2px 2px #262626' }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            sx={{
                                mt: { xs: 1, lg: 10 },
                                mb: { xs: 3, lg: 10 },
                                color: 'white',
                                fontSize: { xs: '1rem', sm: '1.5rem' },
                                maxWidth: '20em',
                            }}
                        >
                            Create and manage shops with randomly generated wares based on the criteria you choose.
                            Items are sourced from a 5th Edition D&D API.
                        </Typography>

                        <Typography
                            sx={{
                                mt: { xs: 1, lg: 10 },
                                mb: { xs: 1, lg: 10 },
                                color: 'white',
                                fontSize: { xs: '1rem', sm: '1.5rem' },
                                maxWidth: '20em',
                            }}
                        >
                            You can also create empty shops and fill them with custom items, completely system agnostic.
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        justifyContent: { xs: 'center', lg: 'center' },
                        alignItems: 'center',
                        mb: { xs: 10, sm: 30 },
                    }}
                >
                    <motion.img
                        component={motion.image}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        src='https://i.imgur.com/M5EDNTX.gif'
                        style={styles.gifs}
                    />

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
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ p: { xs: 3, lg: 10 }, textShadow: '2px 2px #262626' }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            sx={{
                                mt: { xs: 1, lg: 10 },
                                mb: { xs: 1, lg: 10 },
                                color: 'white',
                                fontSize: { xs: '1rem', sm: '1.5rem' },
                                maxWidth: '20em',
                            }}
                        >
                            Easily search through shops and NPCs to view their contents. You can remove items or add
                            your own custom items to any shop you create.
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        justifyContent: { xs: 'center', lg: 'center' },
                        alignItems: 'center',
                        mb: { xs: 10, sm: 30 },
                    }}
                >
                    <motion.img
                        component={motion.image}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        src='https://i.imgur.com/sJ4Nl9u.gif'
                        style={styles.gifs}
                    />

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
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ p: { xs: 3, lg: 10 }, textShadow: '2px 2px #262626' }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            sx={{
                                mt: { xs: 1, lg: 10 },
                                mb: { xs: 1, lg: 10 },
                                color: 'white',
                                fontSize: { xs: '1rem', sm: '1.5rem' },
                                maxWidth: '20em',
                            }}
                        >
                            Quickly edit NPC characteristics to reflect changes to the character or to give players new
                            information.
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        justifyContent: { xs: 'center', lg: 'center' },
                        alignItems: 'center',
                        mb: { xs: 1, lg: 20 },
                    }}
                >
                    <motion.img
                        component={motion.image}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                            opacity: {
                                duration: 1,
                            },
                        }}
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        src='https://i.imgur.com/FxALMbs.gif'
                        style={styles.gifs}
                    />

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
                        initial={{ opacity: 0, y: 300 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        sx={{ p: { xs: 3, lg: 10 }, textShadow: '2px 2px #262626' }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            sx={{
                                mt: { xs: 1, lg: 10 },
                                mb: { xs: 1, lg: 10 },
                                color: 'white',
                                fontSize: { xs: '1rem', sm: '1.5rem' },
                                maxWidth: '20em',
                            }}
                        >
                            Your players can add public notes to any NPC page, making it simple for them to share
                            thoughts with each other during the game and refer back to them when needed.
                        </Typography>
                    </Box>
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
                    initial={{ opacity: 0, y: 300 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 0, lg: 10 } }}
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
                        animate={{ x: [0, 15, 0] }}
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
                        sx={{ ml: { xs: 2, sm: 8 }, mr: { xs: 2, lg: 1 } }}
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
