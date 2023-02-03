import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
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
        <Accordion className='mt-2 mb-2'>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>{shop.shop_name}</Accordion.Header>
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
                                        Go To Shop
                                    </button>
                                </div>
                                <p>Owner: {shop.shop_owner}</p>
                                <p>Location: {shop.shop_location}</p>
                            </div>
                        </div>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default FilterResults;
