import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../features/shops/shopSlice';
import { reset as shopReset, setShop } from '../features/shops/shopSlice';

const ShopList = ({ item }) => {
    const dispatch = useDispatch();

    const { shopInUse } = useSelector((state) => state.shop);
    // const [revisedShop, setRevisedShop] = useState({
    //     shop_name: shopInUse.shop_name,
    //     shop_owner: shopInUse.shop_owner,
    //     shop_location: shopInUse.shop_location,
    //     shop_campaign: shopInUse.shop_campaign,
    //     shop_list: shopInUse.shop_list,
    //     shop_hidden_list: shopInUse.shop_hidden_list,
    //     shop_name: shopInUse.shop_name,
    //     _id: shopInUse._id,
    // });

    const clickRemoveItem = (e) => {
        e.preventDefault();

        function indexOfbyKey(obj_list, value) {
            for (let index in obj_list) {
                if (obj_list[index]._id.toString() === value) return index;
            }
            return -1;
        }

        const shopListArray = [...shopInUse.shop_list];

        const itemObjectIndex = indexOfbyKey(shopListArray, item._id);

        let objectForSort = shopListArray.splice(itemObjectIndex, 1);

        const removedItemIdAndShop = {
            itemId: item._id,
            shopId: shopInUse._id,
        };

        let newCurrentShop = {
            shop_name: shopInUse.shop_name,
            shop_owner: shopInUse.shop_owner,
            shop_location: shopInUse.shop_location,
            shop_campaign: shopInUse.shop_campaign,
            shop_list: shopListArray,
            shop_hidden_list: shopInUse.shop_hidden_list,
            shop_name: shopInUse.shop_name,
            _id: shopInUse._id,
        };

        dispatch(removeItem(removedItemIdAndShop));

        dispatch(setShop(newCurrentShop));
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
