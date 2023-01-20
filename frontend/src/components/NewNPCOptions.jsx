import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNPC, reset } from '../features/npcs/npcSlice';
import Spinner from '../components/Spinner';

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
        npc_personality: [],
        npc_flaws: [],
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

    const onSubmit = (e) => {
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
        dispatch(createNPC({ npcData }));

        navigate('/campaign');
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='ms-3'>
                <h1>Create an NPC</h1>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Name
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Leave blank for a generated result'
                        onChange={onChange}
                    />
                </div>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Species
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Leave blank for a generated result'
                    />
                </div>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Age
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Leave blank for a generated result'
                    />
                </div>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Gender
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Leave blank for a generated result'
                    />
                </div>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Occupation
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Leave blank for a generated result'
                    />
                </div>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Personality
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Leave blank for a generated result'
                    />
                </div>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Flaws
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Leave blank for a generated result'
                    />
                </div>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Location
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Leave blank for a generated result'
                    />
                </div>

                <div>
                    <button type='submit' className='btn btn-primary mt-4'>
                        Submit
                    </button>{' '}
                </div>
            </div>
        </form>
    );
}

export default NewNPCOptions;