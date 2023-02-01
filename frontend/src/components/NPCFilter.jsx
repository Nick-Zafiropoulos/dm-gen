import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNPC, reset, setNPC } from '../features/npcs/npcSlice';

const NPCFilter = ({ npc }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const onSubmit = async (e) => {
        e.preventDefault();

        const currentNPC = npc;

        await dispatch(setNPC(currentNPC));
        navigate('/npc');
    };

    useEffect(() => {
        // dispatch(getNPC());
    }, [user, navigate, isError, message, dispatch]);

    return (
        <div className='accordion m-3' id='accordionExample'>
            <div className='accordion-item'>
                <h2 className='accordion-header' id='headingOne'>
                    <button
                        className='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapseOne'
                        aria-expanded='true'
                        aria-controls='collapseOne'
                    >
                        {npc.npc_name}
                    </button>
                </h2>

                <form onSubmit={onSubmit}>
                    <div
                        id='collapseOne'
                        className='accordion-collapse collapse show'
                        aria-labelledby='headingOne'
                        data-bs-parent='#accordionExample'
                    >
                        <div className='accordion-body'>
                            <div>
                                <button type='submit' className='btn btn-primary'>
                                    Go To NPC
                                </button>
                            </div>
                            <p>Species: {npc.npc_species}</p>
                            <p>Gender: {npc.npc_gender}</p>
                            <p>Occupation: {npc.npc_occupation}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NPCFilter;
