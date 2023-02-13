import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../features/shops/shopSlice';
import { reset as shopReset, setShop } from '../features/shops/shopSlice';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, shadows, Button } from '@mui/material';
import { motion } from 'framer-motion';

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
        <Accordion
            component={motion.div}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.1 }}
            initial={{ opacity: 0 }}
            sx={{ boxShadow: 10, width: { xs: '80vw', lg: '992px' } }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textShadow: '2px 2px #303030' }}>
                    {item.item_name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ mb: 3, mt: 1 }}>
                    <Typography sx={{ color: '#E0E0E0' }}>
                        {item.item_desc.length >= 0 ? (
                            <div className='descriptions'>
                                {item.item_desc.map((desc_seg) => (
                                    <p>{desc_seg}</p>
                                ))}{' '}
                            </div>
                        ) : (
                            <p>Item description not found</p>
                        )}{' '}
                    </Typography>
                </Box>

                <Button onClick={clickRemoveItem} type='button' variant='contained' color='secondary'>
                    Remove Item
                </Button>
            </AccordionDetails>
        </Accordion>

        // <Accordion>
        //     <Accordion.Item eventKey='0'>
        //         <Accordion.Header></Accordion.Header>
        //         <Accordion.Body>
        //             <div className='col'>

        //             </div>

        //             <div>

        //             </div>
        //         </Accordion.Body>
        //     </Accordion.Item>
        // </Accordion>
    );
};

export default ShopList;
