import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getShop, reset, setShop } from '../features/shops/shopSlice';

const FilterResults = ({ shop }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const onSubmit = async (e) => {
        e.preventDefault();

        const currentShop = shop;

        await dispatch(setShop(currentShop));
        navigate('/shop');
    };

    useEffect(() => {
        // dispatch(getShop());
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
                        {shop.shop_name}
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
                                    Go To Shop
                                </button>
                            </div>
                            <p>Owner: {shop.shop_owner}</p>
                            <p>Location: {shop.shop_location}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FilterResults;
