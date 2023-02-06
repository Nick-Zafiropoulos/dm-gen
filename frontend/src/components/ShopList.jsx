import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../features/shops/shopSlice';
import { reset as shopReset } from '../features/shops/shopSlice';

const ShopList = ({ item }) => {
    const dispatch = useDispatch();

    const { shopInUse } = useSelector((state) => state.shop);

    const clickRemoveItem = () => {
        const removedItemIdAndShop = {
            itemId: item._id,
            shopId: shopInUse._id,
        };

        dispatch(removeItem(removedItemIdAndShop));
    };

    return (
        <Accordion>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>{item.item_name}</Accordion.Header>
                <Accordion.Body>
                    <div className='col'>
                        {item.item_desc.length >= 0 ? (
                            <div className='descriptions'>
                                {item.item_desc.map((desc_seg) => (
                                    <p>{desc_seg}</p>
                                ))}{' '}
                            </div>
                        ) : (
                            <p>Item description not found</p>
                        )}
                    </div>

                    <div>
                        <button onClick={clickRemoveItem} type='button'>
                            Remove
                        </button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default ShopList;
