import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNPC, deleteNPC, getNPC, setNPC } from '../features/npcs/npcSlice';

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
        npc_id: npcInUse._id,
    });

    const {
        npc_name,
        npc_species,
        npc_age,
        npc_gender,
        npc_location,
        npc_occupation,
        npc_personality,
        npc_flaws,
        npc_id,
    } = npcUpdateInfo;

    useEffect(() => {}, [user, navigate, isError, message, dispatch]);

    const onChange = (e) => {
        setNpcUpdateInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const npcDelete = (e) => {
        e.preventDefault();
        const npcToDelete = npcInUse._id;
        console.log(npcToDelete);
        dispatch(deleteNPC(npcToDelete));
        navigate('/campaign');
    };

    const npcEdit = () => {
        console.log('hello');
        if (editState == 0) {
            setEditState(1);
        } else {
            setEditState(0);
        }
    };

    const npcUpdate = async (e) => {
        // e.preventDefault();

        const newNPCInfo = {
            npc_name,
            npc_species,
            npc_age,
            npc_gender,
            npc_location,
            npc_occupation,
            npc_personality,
            npc_flaws,
            npc_id,
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
            npc_id,
        };

        dispatch(updateNPC({ npcUpdate }));

        await dispatch(setNPC(newNPCInfo));

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
        <div>
            <Navbar />

            <div className='row'>
                <div className='col'>{editState == 0 && <h1 className='m-3'>{npcInUse.npc_name}</h1>}</div>
                <div className='d-flex align-items-center justify-content-end col'>
                    {editVisibility}
                    {deleteVisibility}
                </div>
            </div>
            <div className='row'>
                <div>{editView}</div>
            </div>
        </div>
    );
};

export default NPC;
