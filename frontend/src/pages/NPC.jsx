import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNPC, deleteNPC, getNPC, setNPC, npcNote } from '../features/npcs/npcSlice';
import { Box, shadows, Button, Typography, TextField } from '@mui/material';
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

const NPC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { campaignInUse } = useSelector((state) => state.campaign);
    const { npcInUse } = useSelector((state) => state.npc);
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

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

        console.log(npcInUse);
        const npcNoteData = {
            npcNewNote,
            _id: npcInUse._id,
        };
        console.log(npcNoteData);
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
            <button onClick={npcDelete} type='button' className='m-3 btn btn-danger'>
                Delete NPC
            </button>
        );
    } else {
        deleteVisibility = <p></p>;
    }

    let editVisibility;
    if (user._id == campaignInUse.dungeon_master[0]) {
        editVisibility = (
            <button onClick={npcEdit} type='button' className='m-3 btn btn-warning'>
                Edit NPC
            </button>
        );
    } else {
        editVisibility = <p></p>;
    }

    let editView;
    if (editState == 0) {
        editView = (
            <>
                <p>Species: {npcInUse.npc_species}</p>
                <p>Gender: {npcInUse.npc_gender}</p>
                <p>Age: {npcInUse.npc_age}</p>
                <p>Occupation: {npcInUse.npc_occupation}</p>
                <p>Core Personality Trait: {npcInUse.npc_personality}</p>
                <p>Key Flaw: {npcInUse.npc_flaws}</p>
            </>
        );
    } else {
        editView = (
            <form onSubmit={npcUpdate}>
                Name
                <input
                    type='text'
                    className='form-control'
                    id='npc_name'
                    name='npc_name'
                    value={npc_name}
                    aria-label='Sizing example input'
                    aria-describedby='inputGroup-sizing-sm'
                    placeholder={npcInUse.npc_name}
                    onChange={onChange}
                />
                Species
                <input
                    type='text'
                    className='form-control'
                    id='npc_species'
                    name='npc_species'
                    value={npc_species}
                    aria-label='Sizing example input'
                    aria-describedby='inputGroup-sizing-sm'
                    placeholder={npcInUse.npc_species}
                    onChange={onChange}
                />
                Gender
                <input
                    type='text'
                    className='form-control'
                    id='npc_gender'
                    name='npc_gender'
                    value={npc_gender}
                    aria-label='Sizing example input'
                    aria-describedby='inputGroup-sizing-sm'
                    placeholder={npcInUse.npc_gender}
                    onChange={onChange}
                />
                Age
                <input
                    type='text'
                    className='form-control'
                    id='npc_age'
                    name='npc_age'
                    value={npc_age}
                    aria-label='Sizing example input'
                    aria-describedby='inputGroup-sizing-sm'
                    placeholder={npcInUse.npc_age}
                    onChange={onChange}
                />
                Occupation
                <input
                    type='text'
                    className='form-control'
                    id='npc_occupation'
                    name='npc_occupation'
                    value={npc_occupation}
                    aria-label='Sizing example input'
                    aria-describedby='inputGroup-sizing-sm'
                    placeholder={npcInUse.npc_occupation}
                    onChange={onChange}
                />
                Peronality
                <input
                    type='text'
                    className='form-control'
                    id='npc_personality'
                    name='npc_personality'
                    value={npc_personality}
                    aria-label='Sizing example input'
                    aria-describedby='inputGroup-sizing-sm'
                    placeholder={npcInUse.npc_personality}
                    onChange={onChange}
                />
                Flaw
                <input
                    type='text'
                    className='form-control'
                    id='npc_flaws'
                    name='npc_flaws'
                    value={npc_flaws}
                    aria-label='Sizing example input'
                    aria-describedby='inputGroup-sizing-sm'
                    placeholder={npcInUse.npc_flaws}
                    onChange={onChange}
                />
                <button type='submit' className='btn btn-primary mt-4'>
                    Submit
                </button>
            </form>
        );
    }

    return (
        <>
            <Box style={styles.backgroundCanvas}>
                <Navbar />
                <Box>
                    <Box>
                        <div className='row'>
                            <div className='col'>{editState == 0 && <h1 className='m-3'>{npcInUse.npc_name}</h1>}</div>
                            <div className='d-flex align-items-center justify-content-end col'>
                                {editVisibility}
                                {deleteVisibility}
                            </div>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ ml: 5 }}>{editView}</Box>
                                <Box sx={{ mr: 30 }}>
                                    <form className='' onSubmit={npcNoteSend}>
                                        <TextField
                                            sx={{ backgroundColor: 'transparent', color: 'white' }}
                                            fullWidth
                                            id='standard-basic'
                                            name='npcNewNote'
                                            value={npcNewNote}
                                            label='Enter a new note'
                                            variant='standard'
                                            type='text'
                                            className='searchBarInput form-control'
                                            placeholder=''
                                            onChange={npcNoteUpdate}
                                        />
                                    </form>
                                    <Typography>
                                        {npcInUse.npc_notes.length > 0 ? (
                                            <div className='notes'>
                                                {npcInUse.npc_notes.map((note) => (
                                                    <Typography>- {note}</Typography>
                                                ))}{' '}
                                            </div>
                                        ) : (
                                            <Typography>There are no notes for this NPC yet.</Typography>
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </div>
                    </Box>
                </Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </>
    );
};

export default NPC;
