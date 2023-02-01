import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import FilterCheckbox from '../components/FilterCheckbox';
import FilterResults from '../components/FilterResults';
import NPCFilter from '../components/NPCFilter';
import { getShop } from '../features/shops/shopSlice';
import { getNPC } from '../features/npcs/npcSlice';
import { reset } from '../features/campaigns/campaignSlice';

const Campaign = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const { shops } = useSelector((state) => state.shop);
    const { npcs } = useSelector((state) => state.npc);

    useEffect(() => {
        // dispatch(reset());
        dispatch(getShop());
        dispatch(getNPC());
    }, [user, navigate, isError, message, dispatch]);

    return (
        <div className='pageBody'>
            <Navbar />

            <div className='row'>
                <div className='col'>
                    <Search />

                    <FilterCheckbox />
                </div>
                <div className='col'>
                    {shops.length >= 0 ? (
                        <div className='campaigns'>
                            {shops.map((shop) => (
                                <FilterResults key={shop._id} shop={shop} />
                            ))}{' '}
                        </div>
                    ) : (
                        <p>You do not have any campaigns yet!</p>
                    )}
                    {npcs.length >= 0 ? (
                        <div className='campaigns'>
                            {npcs.map((npc) => (
                                <NPCFilter key={npc._id} npc={npc} />
                            ))}{' '}
                        </div>
                    ) : (
                        <p>You do not have any campaigns yet!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Campaign;
