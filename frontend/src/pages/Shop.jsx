import React from 'react';
import Navbar from '../components/Navbar';
import ShopList from '../components/ShopList';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteShop, reset, getShop, setShop, addItem } from '../features/shops/shopSlice';
import { Box, shadows, Typography, Button, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import blankCanvas from '../images/dmgenblankcloth.png';
import { motion } from 'framer-motion';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MdClose } from 'react-icons/md';
import { IconContext } from 'react-icons';
import IconButton from '@mui/material/IconButton';

const styles = {
    backgroundCanvas: {
        backgroundImage: `url(${blankCanvas})`,
        // backgroundColor: 'lightgray',
        backgroundPosition: 'top',
        backgroundSize: 'cover',

        height: '100vw',
    },
    backgroundSolid: {
        backgroundColor: '#030418',
        backgroundPosition: 'top',
        backgroundSize: 'cover',

        height: '100vw',
    },
};

const Shop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { campaignInUse } = useSelector((state) => state.campaign);
    const { shopInUse } = useSelector((state) => state.shop);
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
    const { isSuccess: shopSuccess } = useSelector((state) => state.shop);
    const [editNewItemToggleState, setEditNewItemToggleState] = useState(0);

    let editNewItemCursed = false;

    const [editNewItemState, setEditNewItemState] = useState({
        new_item_name: '',
        new_item_description: '',
        new_item_equipment_category: '',
        new_item_rarity: '',
    });

    const { new_item_name, new_item_description, new_item_equipment_category, new_item_rarity } = editNewItemState;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

    const onChange = (e) => {
        setEditNewItemState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const shopDelete = (e) => {
        e.preventDefault();
        const shopToDelete = shopInUse._id;
        console.log(shopToDelete);
        dispatch(deleteShop(shopToDelete));

        navigate('/campaign');
    };

    const addCustomItem = (e) => {
        e.preventDefault();
        let itemDesc = new_item_description;
        let itemDescArray = itemDesc.split('\n').filter((elm) => elm);

        const newItemAndShop = {
            new_item_name,
            new_item_description: itemDescArray,
            new_item_equipment_category,
            new_item_rarity,
            new_item_cursed: editNewItemCursed,
            shopId: shopInUse._id,
        };
        console.log(itemDescArray);
        dispatch(addItem(newItemAndShop));
        // dispatch(getShop());

        // navigate('/shop');
    };

    let deleteVisibility;
    if (user._id == campaignInUse.dungeon_master[0]) {
        deleteVisibility = (
            <Button onClick={shopDelete} type='button' variant='contained' color='dangerRed' sx={{ color: 'white' }}>
                Delete Shop
            </Button>
        );
    } else {
        deleteVisibility = <span></span>;
    }

    const itemEdit = () => {
        if (editNewItemToggleState == 0) {
            setEditNewItemToggleState(1);
        } else {
            setEditNewItemToggleState(0);
        }
    };

    let addItemVisibility;
    if (user._id == campaignInUse.dungeon_master[0]) {
        if (editNewItemToggleState == 0) {
            addItemVisibility = (
                <Button
                    component={motion.div}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                    onClick={itemEdit}
                    type='button'
                    variant='contained'
                    color='secondary'
                >
                    Add Custom Item
                </Button>
            );
        } else {
        }
    } else {
        addItemVisibility = <span></span>;
    }

    let editNewItem;
    if (editNewItemToggleState == 0) {
        editNewItem = <span></span>;
    } else {
        editNewItem = (
            <Card
                component={motion.div}
                initial={{ x: 50, opacity: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 40,
                    opacity: {
                        duration: 0.15,
                    },
                }}
                animate={{ x: 0, opacity: 1 }}
                sx={{ display: 'inline-flex', maxWidth: '992px', mt: 3, boxShadow: 10 }}
            >
                <CardContent>
                    <Box key='newItemEdit' sx={{ ml: 3, mr: 3, mt: 1 }}>
                        <form onSubmit={addCustomItem}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography
                                    sx={{
                                        display: 'flex',

                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textShadow: '2px 2px #262626',
                                    }}
                                >
                                    New Item
                                </Typography>
                                <Box>
                                    <IconButton
                                        component={motion.div}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.1 }}
                                        initial={{ opacity: 0 }}
                                        onClick={itemEdit}
                                        type='button'
                                        variant='contained'
                                        color='calmRed'
                                        sx={{}}
                                    >
                                        <IconContext.Provider
                                            value={{
                                                color: 'calmRed',
                                                className: 'global-class-name',
                                                size: '2rem',
                                            }}
                                        >
                                            <MdClose />
                                        </IconContext.Provider>
                                    </IconButton>
                                </Box>
                            </Box>
                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '51%' }}
                                fullWidth
                                id='standard-basic'
                                label='Item Name'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter an item name'
                                name='new_item_name'
                                value={new_item_name}
                                onChange={onChange}
                            />
                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                                fullWidth
                                multiline
                                rows={6}
                                id='standard-basic'
                                label='Description'
                                variant='outlined'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter an item description'
                                name='new_item_description'
                                value={new_item_description}
                                onChange={onChange}
                            />
                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '51%' }}
                                fullWidth
                                id='standard-basic'
                                label='Category'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter a category'
                                name='new_item_equipment_category'
                                value={new_item_equipment_category}
                                onChange={onChange}
                            />
                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '51%' }}
                                fullWidth
                                id='standard-basic'
                                label='Rarity'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter the item rarity'
                                name='new_item_rarity'
                                value={new_item_rarity}
                                onChange={onChange}
                            />

                            <FormGroup sx={{ mt: 3, color: 'white' }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color='secondary'
                                            size='small'
                                            onChange={() => {
                                                if (!editNewItemCursed) {
                                                    editNewItemCursed = true;
                                                } else {
                                                    editNewItemCursed = false;
                                                }
                                            }}
                                        />
                                    }
                                    label='Cursed?'
                                />
                            </FormGroup>

                            <Box sx={{ mt: 3, mb: 3 }}>
                                <Button onClick={addCustomItem} type='submit' variant='contained' color='secondary'>
                                    Save
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <Box>
            <Box style={styles.backgroundCanvas}>
                <Navbar />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
                    <Card
                        component={motion.div}
                        initial={{ x: -500 }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 40,
                        }}
                        animate={{ x: -20 }}
                        sx={{ display: 'inline-flex', maxWidth: '30rem', mt: 3, boxShadow: 10 }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        ml: 5,
                                        mr: 3,
                                        mb: 3,
                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textShadow: '2px 2px #262626',
                                    }}
                                >
                                    {shopInUse.shop_name}
                                </Typography>
                            </Box>
                            <Box sx={{ ml: 5 }}>
                                <Box sx={{ display: 'inline-flex' }}>
                                    <Typography sx={{ fontWeight: 'bold', mr: 1, mb: 1, color: '#90A4AE' }}>
                                        Owner:
                                    </Typography>
                                    <Typography sx={{ mr: 3 }}>{shopInUse.shop_owner}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ ml: 5 }}>
                                <Box sx={{ display: 'inline-flex' }}>
                                    <Typography sx={{ fontWeight: 'bold', mr: 1, color: '#90A4AE' }}>
                                        Location:{' '}
                                    </Typography>
                                    <Typography sx={{ mr: 3 }}>{shopInUse.shop_location}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Box sx={{ mr: 3, mt: 3 }}>{deleteVisibility}</Box>
                </Box>

                <Typography
                    component={motion.div}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                    sx={{
                        mt: 4,
                        ml: 3,
                        display: 'flex',

                        fontSize: '35px',
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '2px 2px #262626',
                    }}
                >
                    Shop Inventory
                </Typography>

                <Box sx={{ display: 'inline-flex', ml: 3, mt: 1 }}>
                    {shopInUse.shop_list.length > 0 ? (
                        <Box>
                            {shopInUse.shop_list.map((item) => (
                                <ShopList key={shopInUse.shop_list.item} item={item} />
                            ))}{' '}
                        </Box>
                    ) : (
                        <Typography>This shop has no items!</Typography>
                    )}
                </Box>
                <Box sx={{ ml: 3, mt: 3 }}>{addItemVisibility}</Box>
                <Box sx={{ ml: 3, mt: 3 }}>{editNewItem}</Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </Box>
    );
};

export default Shop;

// Need to do:
// - set a state key:value for shopInUse when clicking on the shop in the campain dashboard
// - take shopInUse and GET item values, name, owner, and location from shopInUse Object to display on Shop/ShopList components
