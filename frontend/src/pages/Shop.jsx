import React from 'react';
import Navbar from '../components/Navbar';
import ShopList from '../components/ShopList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getShop, reset } from '../features/shops/shopSlice';
import { getItem } from '../features/items/itemSlice';
import ConfirmationModal from '../components/ConfirmationModal';

const Shop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shopInUse } = useSelector((state) => state.shop);
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        // dispatch(getItem());
    }, [user, navigate, isError, message, dispatch]);

    return (
        <div>
            <Navbar />

            <div className='row'>
                <div className='col'>
                    <h1 className='m-3'>{shopInUse.shop_name}</h1>
                    <h6 className='m-3'>Owner: {shopInUse.shop_owner}</h6>
                    <h6 className='m-3'>Location: {shopInUse.shop_location}</h6>
                </div>
                <div className='d-flex align-items-center justify-content-end col'>
                    <button type='button' className='m-3 btn btn-warning'>
                        Edit Shop
                    </button>
                    {/* <button
                        onClick={() => this.setState({ isOpen: true })}
                        type='button'
                        className='m-3 btn btn-danger'
                    >
                        Delete Shop
                    </button> */}
                    {/* <ConfirmationModal open={this.state.isOpen} onClose={() => this.setState({ isOpen: false })}>
                        hello
                    </ConfirmationModal> */}
                </div>
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
