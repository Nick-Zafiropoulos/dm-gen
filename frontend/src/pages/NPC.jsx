import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import DeleteNoteButton from '../components/DeleteNoteButton';
import { useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNPC, deleteNPC, getNPC, setNPC, npcNote } from '../features/npcs/npcSlice';
import { Box, shadows, Button, Typography, TextField } from '@mui/material';
import blankCanvas from '../images/dmgenblankcloth.png';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCircle, MdRemoveCircle } from 'react-icons/md';
import { IconContext } from 'react-icons';
import IconButton from '@mui/material/IconButton';

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

const NPC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { campaignInUse } = useSelector((state) => state.campaign);
    const { npcInUse } = useSelector((state) => state.npc);
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    let textInput = useRef(null);

    const [editState, setEditState] = useState(0);
    const [npcUpdateInfo, setNpcUpdateInfo] = useState({
        npc_name: npcInUse.npc_name,
        npc_species: npcInUse.npc_species,
        npc_age: npcInUse.npc_age,
        npc_gender: npcInUse.npc_gender,
        npc_location: npcInUse.npc_location,
        npc_occupation: npcInUse.npc_occupation,
        npc_personality: npcInUse.npc_personality,
        npc_flaws: npcInUse.npc_flaws,
        _id: npcInUse._id,
    });

    const [npcNewNote, setNpcNewNote] = useState('');

    const {
        npc_name,
        npc_species,
        npc_age,
        npc_gender,
        npc_location,
        npc_occupation,
        npc_personality,
        npc_flaws,
        _id,
    } = npcUpdateInfo;

    useEffect(() => {}, [user, navigate, isError, message, dispatch]);

    const onChange = (e) => {
        setNpcUpdateInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const npcNoteUpdate = (e) => {
        setNpcNewNote(e.target.value);
    };

    const npcNoteSend = async (e) => {
        e.preventDefault();

        textInput.current.value = '';
        const npcNoteData = {
            npcNewNote,
            _id: npcInUse._id,
        };

        let noteForRedux = Object.assign([], npcInUse.npc_notes);
        let noteToPush = npcNewNote;

        noteForRedux.push(noteToPush);

        const newNPCInfo = {
            npc_name,
            npc_species,
            npc_age,
            npc_gender,
            npc_location,
            npc_occupation,
            npc_personality,
            npc_flaws,
            _id,
            npc_campaign: npcInUse.npc_campaign,
            npc_notes: noteForRedux,
        };

        await dispatch(npcNote(npcNoteData));

        dispatch(setNPC(newNPCInfo));
        dispatch(getNPC());

        navigate('/npc');
    };

    const npcDelete = (e) => {
        e.preventDefault();
        const npcToDelete = npcInUse._id;

        dispatch(deleteNPC(npcToDelete));
        navigate('/campaign');
    };

    const npcEdit = () => {
        if (editState == 0) {
            setEditState(1);
        } else {
            setEditState(0);
        }
    };

    const npcUpdate = async (e) => {
        e.preventDefault();

        const newNPCInfo = {
            npc_name,
            npc_species,
            npc_age,
            npc_gender,
            npc_location,
            npc_occupation,
            npc_personality,
            npc_flaws,
            npc_notes: npcInUse.npc_notes,
            _id,
            npc_campaign: npcInUse.npc_campaign,
        };

        const npcUpdate = {
            npc_name,
            npc_species,
            npc_age,
            npc_gender,
            npc_location,
            npc_occupation,
            npc_personality,
            npc_flaws,
            _id,
        };

        await dispatch(updateNPC({ npcUpdate }));

        await dispatch(setNPC(newNPCInfo));
        setEditState(0);
        navigate('/npc');
    };

    let deleteVisibility;
    if (user._id == campaignInUse.dungeon_master[0]) {
        deleteVisibility = (
            <Button sx={{ mt: 3, mr: 5 }} onClick={npcDelete} type='button' color='error' variant='contained'>
                Delete NPC
            </Button>
        );
    } else {
        deleteVisibility = <p></p>;
    }

    let editVisibility;
    if (user._id == campaignInUse.dungeon_master[0]) {
        editVisibility = (
            <Button sx={{ mt: 3, mr: 3 }} onClick={npcEdit} type='button' color='secondary' variant='contained'>
                Edit NPC
            </Button>
        );
    } else {
        editVisibility = <p></p>;
    }

    let editView;
    if (editState == 0) {
        editView = (
            <Box
                key='npcStatic'
                component={motion.div}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                sx={{ ml: 3, mt: 2, minWidth: '30vw' }}
            >
                <Box>
                    <Box sx={{ display: 'inline-flex', mb: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mr: 1, color: '#90A4AE' }}>Species:</Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>{npcInUse.npc_species}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'inline-flex', mb: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mr: 1, color: '#90A4AE' }}>Gender: </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}> {npcInUse.npc_gender}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'inline-flex', mb: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mr: 1, color: '#90A4AE' }}>Age: </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>{npcInUse.npc_age} </Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'inline-flex', mb: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mr: 1, color: '#90A4AE' }}>Occupation: </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>{npcInUse.npc_occupation} </Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'inline-flex', mb: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mr: 1, color: '#90A4AE' }}>Personality: </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>{npcInUse.npc_personality} </Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'inline-flex', mb: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mr: 1, color: '#90A4AE' }}>Flaws: </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>{npcInUse.npc_flaws} </Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'inline-flex', mb: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mr: 1, color: '#90A4AE' }}>Location: </Typography>
                        {npcInUse.npc_location == '' ? (
                            <Typography sx={{ wordBreak: 'break-all' }}>None </Typography>
                        ) : (
                            <Typography sx={{ wordBreak: 'break-all' }}>{npcInUse.npc_location} </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        );
    } else {
        editView = (
            <Box
                key='npcEdit'
                component={motion.div}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                sx={{ width: '50vw', ml: 3, mt: 1 }}
            >
                <form onSubmit={npcUpdate}>
                    <Typography
                        sx={{
                            display: 'flex',

                            fontSize: '35px',
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '2px 2px #262626',
                        }}
                    >
                        Editing {npcInUse.npc_name}
                    </Typography>
                    <TextField
                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                        fullWidth
                        id='standard-basic'
                        label='Name'
                        variant='standard'
                        type='text'
                        className='searchBarInput form-control'
                        placeholder={npcInUse.npc_name}
                        name='npc_name'
                        value={npc_name}
                        onChange={onChange}
                    />
                    <TextField
                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                        fullWidth
                        id='standard-basic'
                        label='Species'
                        variant='standard'
                        type='text'
                        className='searchBarInput form-control'
                        placeholder={npcInUse.npc_species}
                        name='npc_species'
                        value={npc_species}
                        onChange={onChange}
                    />
                    <TextField
                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                        fullWidth
                        id='standard-basic'
                        label='Gender'
                        variant='standard'
                        type='text'
                        className='searchBarInput form-control'
                        placeholder={npcInUse.npc_gender}
                        name='npc_gender'
                        value={npc_gender}
                        onChange={onChange}
                    />
                    <TextField
                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                        fullWidth
                        id='standard-basic'
                        label='Age'
                        variant='standard'
                        type='text'
                        className='searchBarInput form-control'
                        placeholder={npcInUse.npc_age}
                        name='npc_age'
                        value={npc_age}
                        onChange={onChange}
                    />
                    <TextField
                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                        fullWidth
                        id='standard-basic'
                        label='Occupation'
                        variant='standard'
                        type='text'
                        className='searchBarInput form-control'
                        placeholder={npcInUse.npc_occupation}
                        name='npc_occupation'
                        value={npc_occupation}
                        onChange={onChange}
                    />
                    <TextField
                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                        fullWidth
                        id='standard-basic'
                        label='Personality'
                        variant='standard'
                        type='text'
                        className='searchBarInput form-control'
                        placeholder={npcInUse.npc_personality}
                        name='npc_personality'
                        value={npc_personality}
                        onChange={onChange}
                    />
                    <TextField
                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                        fullWidth
                        id='standard-basic'
                        label='Flaws'
                        variant='standard'
                        type='text'
                        className='searchBarInput form-control'
                        placeholder={npcInUse.npc_flaws}
                        name='npc_flaws'
                        value={npc_flaws}
                        onChange={onChange}
                    />
                    <TextField
                        sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                        fullWidth
                        id='standard-basic'
                        label='Location'
                        variant='standard'
                        type='text'
                        className='searchBarInput form-control'
                        placeholder={npcInUse.npc_location}
                        name='npc_location'
                        value={npc_location}
                        onChange={onChange}
                    />
                    <Box sx={{ mt: 3, mb: 3 }}>
                        <Button type='submit' variant='contained' color='secondary'>
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        );
    }

    return (
        <>
            <Box style={styles.backgroundCanvas}>
                <Navbar />
                <Box
                    component={motion.div}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Box>
                        {editState == 0 && (
                            <Typography
                                sx={{
                                    display: 'flex',
                                    ml: 3,
                                    mt: 6,

                                    fontSize: '35px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    textShadow: '2px 2px #262626',
                                }}
                            >
                                {npcInUse.npc_name}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{}}>
                        <Box sx={{ mt: 3 }}>
                            {editVisibility}
                            {deleteVisibility}
                        </Box>
                    </Box>
                </Box>
                <Box
                    component={motion.div}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                    sx={{ mt: 3, ml: 3, mr: 5, maxWidth: '95vw' }}
                >
                    <Card>
                        <CardContent>
                            <div className='row'>
                                <div className='col'></div>
                                <div className='d-flex align-items-center justify-content-end col'></div>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    {editView}
                                    <Box sx={{ ml: 20, maxWidth: '70vw' }}>
                                        <form className='' onSubmit={npcNoteSend}>
                                            <TextField
                                                component={motion.div}
                                                transition={{ duration: 0.2 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                initial={{ opacity: 0, x: 50 }}
                                                sx={{
                                                    backgroundColor: 'transparent',
                                                    color: 'white',
                                                    maxWidth: '400px',
                                                    ml: 3.5,
                                                }}
                                                fullWidth
                                                inputRef={textInput}
                                                id='standard-basic'
                                                name='npcNewNote'
                                                // value={npcNewNote}
                                                label='Enter a new note'
                                                variant='standard'
                                                type='text'
                                                className='searchBarInput form-control'
                                                placeholder=''
                                                onChange={npcNoteUpdate}
                                            />
                                        </form>
                                        <Typography sx={{ mt: 3 }}>
                                            {npcInUse.npc_notes.length > 0 ? (
                                                <div className='notes'>
                                                    {npcInUse.npc_notes.map((note) => (
                                                        <Box
                                                            component={motion.div}
                                                            transition={{ duration: 0.2 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            initial={{ opacity: 0, x: 50 }}
                                                            sx={{ display: 'flex' }}
                                                        >
                                                            <DeleteNoteButton key={note} note={note} />
                                                            <Box sx={{ mr: 1 }}>
                                                                <IconContext.Provider
                                                                    value={{
                                                                        color: '#90A4AE',
                                                                        className: 'global-class-name',
                                                                        size: '7px',
                                                                    }}
                                                                >
                                                                    <MdCircle />
                                                                </IconContext.Provider>
                                                            </Box>
                                                            <Typography>{note}</Typography>
                                                        </Box>
                                                    ))}{' '}
                                                </div>
                                            ) : (
                                                <Typography sx={{ ml: 3.5 }}>
                                                    There are no notes for this NPC yet.
                                                </Typography>
                                            )}
                                        </Typography>
                                    </Box>
                                </Box>
                            </div>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </>
    );
};

export default NPC;
