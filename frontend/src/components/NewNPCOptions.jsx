import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNPC, reset } from '../features/npcs/npcSlice';
import Spinner from '../components/Spinner';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { TextField } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { IconContext } from 'react-icons';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function NewNPCOptions() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        npc_name: '',
        npc_species: '',
        npc_age: '',
        npc_gender: '',
        npc_location: '',
        npc_occupation: '',
        npc_personality: '',
        npc_flaws: '',
    });

    const { npc_name, npc_species, npc_age, npc_gender, npc_location, npc_occupation, npc_personality, npc_flaws } =
        formData;

    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.shop);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const npcData = {
            npc_name,
            npc_species,
            npc_age,
            npc_gender,
            npc_location,
            npc_occupation,
            npc_personality,
            npc_flaws,
        };
        await dispatch(createNPC({ npcData }));

        navigate('/campaign');
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Box sx={{ mt: { xs: 0, sm: 5 }, ml: { xs: 0, sm: 5 }, maxWidth: '500px' }}>
            <Card
                component={motion.div}
                initial={{ x: -550 }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 40,
                    opacity: {
                        duration: 0.4,
                    },
                }}
                animate={{ x: 0, opacity: 1 }}
                sx={{ boxShadow: 10 }}
            >
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <div className='ms-3'>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography
                                    sx={{
                                        display: 'flex',

                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textShadow: '2px 2px #262626',
                                    }}
                                >
                                    Create a NPC
                                </Typography>

                                <Box>
                                    <IconButton
                                        component={Link}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.1 }}
                                        initial={{ opacity: 0 }}
                                        to='/campaign'
                                        type='button'
                                        variant='contained'
                                        color='calmRed'
                                        style={{ color: '#E57373' }}
                                    >
                                        <IconContext.Provider
                                            value={{
                                                color: 'calmRed',
                                                className: 'global-class-name',
                                                size: '2rem',
                                            }}
                                        >
                                            <MdClose />
                                        </IconContext.Provider>
                                    </IconButton>
                                </Box>
                            </Box>

                            <Typography sx={{ fontSize: '.8rem' }}>
                                All fields can be edited after character creation.
                            </Typography>

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                label='Name'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Leave blank for a generated result'
                                name='npc_name'
                                value={npc_name}
                                onChange={onChange}
                            />

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                label='Species'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Leave blank for a generated result'
                                name='npc_species'
                                value={npc_species}
                                onChange={onChange}
                            />

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                label='Age'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Leave blank for a generated result'
                                name='npc_age'
                                value={npc_age}
                                onChange={onChange}
                            />

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                label='Gender'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Leave blank for a generated result'
                                name='npc_gender'
                                value={npc_gender}
                                onChange={onChange}
                            />

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                label='Occupation'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Leave blank for a generated result'
                                name='npc_occupation'
                                value={npc_occupation}
                                onChange={onChange}
                            />

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                label='Personality'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Leave blank for a generated result'
                                name='npc_personality'
                                value={npc_personality}
                                onChange={onChange}
                            />

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                label='Flaws'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Leave blank for a generated result'
                                name='npc_flaws'
                                value={npc_flaws}
                                onChange={onChange}
                            />

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                label='Location'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Leave blank for no location'
                                name='npc_location'
                                value={npc_location}
                                onChange={onChange}
                            />

                            <Box
                                sx={{
                                    display: 'flex',

                                    mt: 3,
                                }}
                            >
                                <Button type='submit' variant='contained' color='secondary'>
                                    Create
                                </Button>
                            </Box>
                        </div>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Box>
    );
}

export default NewNPCOptions;
