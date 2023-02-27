import React from 'react';
import Navbar from '../components/Navbar';
import ShopList from '../components/ShopList';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteShop, reset, getShop, setShop, getOneShop, addItem } from '../features/shops/shopSlice';
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
import { v4 as uuidv4 } from 'uuid';
import Modal from '@mui/material/Modal';

const styles = {
    backgroundCanvas: {
        backgroundImage: `url(${blankCanvas})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        height: '100vw',
    },
    backgroundSolid: {
        backgroundColor: '#030418',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        height: '100vw',
        minHeight: '1200px',
    },
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 455,
    bgcolor: '#ECEFF1',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
    let textInput = useRef(null);

    const [editNewItemState, setEditNewItemState] = useState({
        new_item_name: '',
        new_item_description: '',
        new_item_equipment_category: '',
        new_item_rarity: '',
    });

    const { new_item_name, new_item_description, new_item_equipment_category, new_item_rarity } = editNewItemState;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [errorMessage, setErrorMessage] = useState({
        new_item_name: '',
        new_item_description: '',
        new_item_equipment_category: '',
        new_item_rarity: '',
    });

    const disallowedSymbols = ['/', '=', '[', ']', '{', '}', ';', '<', '>', '`', '~'];

    // Error message new_item_name
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => editNewItemState.new_item_name.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                new_item_name: 'Contains disallowed character',
            }));
        }
    }, [editNewItemState.new_item_name]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (
                !disallowedSymbols.some((el) => editNewItemState.new_item_name.includes(el)) &&
                errorMessage.new_item_name
            ) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    new_item_name: '',
                }));
            }
        },
        [editNewItemState.new_item_name, errorMessage.new_item_name]
    );

    // Error message new_item_description
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => editNewItemState.new_item_description.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                new_item_description: 'Contains disallowed character',
            }));
        }
    }, [editNewItemState.new_item_description]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (
                !disallowedSymbols.some((el) => editNewItemState.new_item_description.includes(el)) &&
                errorMessage.new_item_description
            ) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    new_item_description: '',
                }));
            }
        },
        [editNewItemState.new_item_description, errorMessage.new_item_description]
    );

    // Error message new_item_equipment_category
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => editNewItemState.new_item_equipment_category.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                new_item_equipment_category: 'Contains disallowed character',
            }));
        }
    }, [editNewItemState.new_item_equipment_category]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (
                !disallowedSymbols.some((el) => editNewItemState.new_item_equipment_category.includes(el)) &&
                errorMessage.new_item_equipment_category
            ) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    new_item_equipment_category: '',
                }));
            }
        },
        [editNewItemState.new_item_equipment_category, errorMessage.new_item_equipment_category]
    );

    // Error message new_item_rarity
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => editNewItemState.new_item_rarity.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                new_item_rarity: 'Contains disallowed character',
            }));
        }
    }, [editNewItemState.new_item_rarity]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (
                !disallowedSymbols.some((el) => editNewItemState.new_item_rarity.includes(el)) &&
                errorMessage.new_item_rarity
            ) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    new_item_rarity: '',
                }));
            }
        },
        [editNewItemState.new_item_rarity, errorMessage.new_item_rarity]
    );

    useEffect(() => {
        getCurrentShop();
        window.scrollTo(0, 0);
    }, [navigate]);

    const getCurrentShop = async () => {
        const shopData = shopInUse._id;

        const newShopData = await dispatch(getOneShop(shopData));

        const shopRefresh = {
            shop_name: newShopData.payload.shop_name,
            shop_owner: newShopData.payload.shop_owner,
            shop_location: newShopData.payload.shop_location,
            shop_campaign: newShopData.payload.shop_campaign,
            shop_list: newShopData.payload.shop_list,
            shop_hidden_list: newShopData.payload.shop_hidden_list,
            _id: shopInUse._id,
        };

        dispatch(setShop(shopRefresh));
    };

    const onChange = (e) => {
        setEditNewItemState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const shopDelete = async (e) => {
        e.preventDefault();
        const shopToDelete = shopInUse._id;
        dispatch(deleteShop(shopToDelete));
        await dispatch(getShop());
        navigate('/campaign');
    };

    const addCustomItem = async (e) => {
        e.preventDefault();

        let newItemId = uuidv4();
        let itemDesc = new_item_description;
        let itemDescArray = itemDesc.split('\n').filter((elm) => elm);
        let arrayBeginning;
        if (new_item_equipment_category === '' || new_item_rarity === '') {
            arrayBeginning = `${new_item_equipment_category}${new_item_rarity}`;
        } else {
            arrayBeginning = `${new_item_equipment_category}, ${new_item_rarity}`;
        }
        itemDescArray.unshift(arrayBeginning);

        const newItemToRedux = {
            _id: newItemId,
            item_name: new_item_name,
            item_desc: itemDescArray,
            equipment_category: new_item_equipment_category,
            item_rarity: new_item_rarity,
            item_cursed: editNewItemCursed,
        };

        let new_shop_list = Object.assign([], shopInUse.shop_list);
        new_shop_list.push(newItemToRedux);

        const newItemAndShop = {
            _id: newItemId,
            new_item_name,
            new_item_description: itemDescArray,
            new_item_equipment_category,
            new_item_rarity,
            new_item_cursed: editNewItemCursed,
            shopId: shopInUse._id,
        };

        const shopReduxUpdate = {
            shop_name: shopInUse.shop_name,
            shop_owner: shopInUse.shop_owner,
            shop_location: shopInUse.shop_location,
            shop_campaign: shopInUse.shop_campaign,
            shop_list: new_shop_list,
            shop_hidden_list: shopInUse.shop_hidden_list,
            _id: shopInUse._id,
        };

        await dispatch(addItem(newItemAndShop));

        await dispatch(setShop(shopReduxUpdate));
        textInput.current.value = '';
        setEditNewItemState((prevState) => ({
            new_item_name: '',
            new_item_description: '',
            new_item_equipment_category: '',
            new_item_rarity: '',
        }));

        setEditNewItemToggleState(0);

        navigate('/shop');
    };

    let deleteVisibility;
    if (user._id == campaignInUse.dungeon_master[0]) {
        deleteVisibility = (
            <div>
                <Button color='calmRed' variant='outlined' onClick={handleOpen}>
                    Delete Shop
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box sx={modalStyle}>
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            Are you sure you want to delete this shop?
                        </Typography>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'right' }}>
                            <Button
                                onClick={shopDelete}
                                type='button'
                                variant='contained'
                                color='calmRed'
                                sx={{ color: 'white' }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
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
                sx={{ display: 'inline-flex', maxWidth: '992px', mt: 3, mr: 3, mb: 3, boxShadow: 10 }}
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
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    mt: 2,
                                    maxWidth: { xs: '90%', sm: '51%' },
                                }}
                                fullWidth
                                id='standard-basic'
                                error={disallowedSymbols.some((el) => editNewItemState.new_item_name.includes(el))}
                                helperText={errorMessage.new_item_name}
                                inputProps={{ pattern: '[A-Za-z0-9\'".!?@#$%^&*_+-,:() ]{1,}' }}
                                inputRef={textInput}
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
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    mt: 2,
                                    maxWidth: { xs: '90%', sm: '51%' },
                                }}
                                fullWidth
                                id='standard-basic'
                                error={disallowedSymbols.some((el) =>
                                    editNewItemState.new_item_equipment_category.includes(el)
                                )}
                                helperText={errorMessage.new_item_equipment_category}
                                inputProps={{ pattern: "[A-Za-z0-9'.!?@#$%^&*_+-,:() ]{1,}" }}
                                inputRef={textInput}
                                label='Category'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter a category (weapon, armor, ring, etc...)'
                                name='new_item_equipment_category'
                                value={new_item_equipment_category}
                                onChange={onChange}
                            />
                            <TextField
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    mt: 2,
                                    maxWidth: { xs: '90%', sm: '51%' },
                                }}
                                fullWidth
                                id='standard-basic'
                                error={disallowedSymbols.some((el) => editNewItemState.new_item_rarity.includes(el))}
                                helperText={errorMessage.new_item_rarity}
                                inputProps={{ pattern: "[A-Za-z0-9'.!?@#$%^&*_+-,:() ]{1,}" }}
                                inputRef={textInput}
                                label='Rarity'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter the item rarity (uncommon, rare, etc...)'
                                name='new_item_rarity'
                                value={new_item_rarity}
                                onChange={onChange}
                            />
                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 2, maxWidth: '100%' }}
                                fullWidth
                                multiline
                                rows={6}
                                id='standard-basic'
                                inputRef={textInput}
                                label='Description'
                                variant='outlined'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter an item description'
                                name='new_item_description'
                                value={new_item_description}
                                onChange={onChange}
                            />
                            <Box sx={{ mt: 3, mb: 3 }}>
                                <Button type='submit' variant='contained' color='secondary'>
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
                        <Typography sx={{ color: 'white', mt: 2 }}>This shop has no items!</Typography>
                    )}
                </Box>
                <Box sx={{ ml: 5, mt: 3 }}>{addItemVisibility}</Box>
                <Box sx={{ ml: 3, mt: 3 }}>{editNewItem}</Box>
            </Box>
        </Box>
    );
};

export default Shop;
