import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
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
        <Accordion className='mt-2 mb-2'>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>{npc.npc_name}</Accordion.Header>
                <Accordion.Body>
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
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default NPCFilter;
