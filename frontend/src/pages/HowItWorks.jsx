import React from 'react';
import { Box, shadows, Typography, Button, TextField } from '@mui/material';
import { motion, MotionConfig, useScroll } from 'framer-motion';
import { useRef } from 'react';

const HowItWorks = () => {
    return (
        <Box style={{ backgroundColor: 'black' }}>
            <Box>
                <Box
                    component={motion.div}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                >
                    <Box sx={{ mt: 6 }}>
                        <Typography
                            sx={{
                                display: 'flex',
                                ml: 3,
                                mt: 3,
                                mb: 3,
                                fontSize: '35px',
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '2px 2px #262626',
                            }}
                        >
                            How It Works
                        </Typography>
                        <Typography sx={{ color: 'white' }}>
                            This is a lot of text to demonstrate what might go here. This is a lot of text to
                            demonstrate what might go here. This is a lot of text to demonstrate what might go here.
                            This is a lot of text to demonstrate what might go here. This is a lot of text to
                            demonstrate what might go here.{' '}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ mb: 130 }}></Box>
                <Box>
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
                        initial={{ opacity: 0, y: 600, x: '50%' }}
                        whileInView={{ opacity: 1, y: 0, x: '50%' }}
                        sx={{ boxShadow: 10, display: 'inline-flex' }}
                        viewport={{ once: true }}
                    >
                        <img src='https://i.imgur.com/5Jn4Dh9.gif' />
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
                        initial={{ opacity: 0, y: 600, x: '50%' }}
                        whileInView={{ opacity: 1, y: 0, x: '50%' }}
                        sx={{ boxShadow: 10, display: 'inline-flex', justifyContent: 'center' }}
                        viewport={{ once: true }}
                    >
                        <Typography sx={{ mt: 10, mb: 10, color: 'white' }}>
                            This is a lot of text to demonstrate what might go here. This is a lot of text to
                            demonstrate what might go here. This is a lot of text to demonstrate what might go here.
                            This is a lot of text to demonstrate what might go here. This is a lot of text to
                            demonstrate what might go here.{' '}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    key=''
                    component={motion.div}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 40,
                        opacity: {
                            duration: 0.8,
                        },
                    }}
                    initial={{ opacity: 0, y: 600, x: '50%' }}
                    whileInView={{ opacity: 1, y: 0, x: '50%' }}
                    sx={{ boxShadow: 10, display: 'inline-flex' }}
                    viewport={{ once: true }}
                >
                    <img src='https://i.imgur.com/M5EDNTX.gif' />
                </Box>
                <Typography sx={{ mt: 10, mb: 10, color: 'white' }}>
                    This is a lot of text to demonstrate what might go here. This is a lot of text to demonstrate what
                    might go here. This is a lot of text to demonstrate what might go here. This is a lot of text to
                    demonstrate what might go here. This is a lot of text to demonstrate what might go here.{' '}
                </Typography>
                <Box
                    key=''
                    component={motion.div}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 40,
                        opacity: {
                            duration: 0.8,
                        },
                    }}
                    initial={{ opacity: 0, y: 600, x: '50%' }}
                    whileInView={{ opacity: 1, y: 0, x: '50%' }}
                    sx={{ boxShadow: 10, display: 'inline-flex' }}
                    viewport={{ once: true }}
                >
                    <img src='https://i.imgur.com/sJ4Nl9u.gif' />
                </Box>
                <Typography sx={{ mt: 10, mb: 10, color: 'white' }}>
                    This is a lot of text to demonstrate what might go here. This is a lot of text to demonstrate what
                    might go here. This is a lot of text to demonstrate what might go here. This is a lot of text to
                    demonstrate what might go here. This is a lot of text to demonstrate what might go here.{' '}
                </Typography>
                <Box
                    key=''
                    component={motion.div}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 40,
                        opacity: {
                            duration: 0.8,
                        },
                    }}
                    initial={{ opacity: 0, y: 600, x: '50%' }}
                    whileInView={{ opacity: 1, y: 0, x: '50%' }}
                    sx={{ boxShadow: 10, display: 'inline-flex' }}
                    viewport={{ once: true }}
                >
                    <img src='https://i.imgur.com/FxALMbs.gif' />
                </Box>
                <Typography sx={{ mt: 10, mb: 10 }}>
                    This is a lot of text to demonstrate what might go here. This is a lot of text to demonstrate what
                    might go here. This is a lot of text to demonstrate what might go here. This is a lot of text to
                    demonstrate what might go here. This is a lot of text to demonstrate what might go here.{' '}
                </Typography>
            </Box>
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
