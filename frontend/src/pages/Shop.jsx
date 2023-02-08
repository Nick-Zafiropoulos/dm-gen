import React from 'react';
import Navbar from '../components/Navbar';
import ShopList from '../components/ShopList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteShop, reset, getShop, setShop } from '../features/shops/shopSlice';

const Shop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { campaignInUse } = useSelector((state) => state.campaign);
    const { shopInUse } = useSelector((state) => state.shop);
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
    const { isSuccess: shopSuccess } = useSelector((state) => state.shop);

    // useEffect(() => {}, [user, navigate, isError, message, dispatch]);

    const shopDelete = (e) => {
        e.preventDefault();
        const shopToDelete = shopInUse._id;
        console.log(shopToDelete);
        dispatch(deleteShop(shopToDelete));

        navigate('/campaign');
    };

    let deleteVisibility;
    if (user._id == campaignInUse.dungeon_master[0]) {
        deleteVisibility = (
            <button onClick={shopDelete} type='button' className='m-3 btn btn-danger'>
                Delete Shop
            </button>
        );
    } else {
        deleteVisibility = <p></p>;
    }

    return (
        <div>
            <Navbar />

            <div className='row'>
                <div className='col'>
                    <h1 className='m-3'>{shopInUse.shop_name}</h1>
                    <h6 className='m-3'>Owner: {shopInUse.shop_owner}</h6>
                    <h6 className='m-3'>Location: {shopInUse.shop_location}</h6>
                </div>
                <div className='d-flex align-items-center justify-content-end col'>{deleteVisibility}</div>
            </div>
            <div className='row'>
                {shopInUse.shop_list.length >= 0 ? (
                    <div className='items'>
                        {shopInUse.shop_list.map((item) => (
                            <ShopList key={shopInUse.shop_list.item} item={item} />
                        ))}{' '}
                    </div>
                ) : (
                    <p>This shop has no items!</p>
                )}
            </div>
        </div>
    );
};

export default Shop;

// Need to do:
// - set a state key:value for shopInUse when clicking on the shop in the campain dashboard
// - take shopInUse and GET item values, name, owner, and location from shopInUse Object to display on Shop/ShopList components
