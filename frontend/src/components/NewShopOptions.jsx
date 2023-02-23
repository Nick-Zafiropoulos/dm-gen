import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createShop, reset } from '../features/shops/shopSlice';
import Spinner from '../components/Spinner';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { IconContext } from 'react-icons';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

function NewShopOptions() {
    const [formData, setFormData] = useState({
        shop_name: '',
        shop_owner: '',
        shop_location: '',
        shop_itemCount: '',
        shop_categories: [],
        shop_rarities: [],
    });

    const [itemTotal, setItemTotal] = useState('');

    const [errorMessage, setErrorMessage] = useState({
        shop_name: '',
        shop_owner: '',
        shop_location: '',
    });

    const disallowedSymbols = [
        '/',
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',

        '+',
        '=',

        '[',
        ']',
        '{',
        '}',
        ';',
        ':',

        '_',

        '<',
        '>',
    ];

    // Error message shop name
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => formData.shop_name.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                shop_name: 'Contains disallowed character',
            }));
        }
    }, [formData.shop_name]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (!disallowedSymbols.some((el) => formData.shop_name.includes(el)) && errorMessage.shop_name) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    shop_name: '',
                }));
            }
        },
        [formData.shop_name, errorMessage.shop_name]
    );

    // Error message shop owner
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => formData.shop_owner.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                shop_owner: 'Contains disallowed character',
            }));
        }
    }, [formData.shop_owner]);

    useEffect(() => {
        // Set empty erroMessage only if text does not include disallowed symbols
        // and errorMessage is not empty.
        // avoids setting empty errorMessage if the errorMessage is already empty
        if (!disallowedSymbols.some((el) => formData.shop_owner.includes(el)) && errorMessage.shop_owner) {
            setErrorMessage((prevState) => ({
                ...prevState,
                shop_owner: '',
            }));
        }
    }, [formData.shop_owner, errorMessage.shop_owner]);

    // Error message shop location
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => formData.shop_location.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                shop_location: 'Contains disallowed character',
            }));
        }
    }, [formData.shop_location]);

    useEffect(() => {
        // Set empty erroMessage only if text does not include disallowed symbols
        // and errorMessage is not empty.
        // avoids setting empty errorMessage if the errorMessage is already empty
        if (!disallowedSymbols.some((el) => formData.shop_location.includes(el)) && errorMessage.shop_location) {
            setErrorMessage((prevState) => ({
                ...prevState,
                shop_location: '',
            }));
        }
    }, [formData.shop_location, errorMessage.shop_location]);

    const handleChange = (event) => {
        setItemTotal(event.target.value);
    };
    // category data
    const categories = useRef({
        weapon: false,
        armor: false,
        wondrousItem: false,
        ring: false,
        potion: false,
        scroll: false,
        wand: false,
        staff: false,
    });

    let rarityError = false;
    let rarityErrorVisibility;
    let categoryArray = [];

    // rarity data
    const rarities = useRef({
        uncommon: false,
        rare: false,
        veryRare: false,
        legendary: false,
    });

    let rarityArray = [];

    const { shop_name, shop_owner, shop_location, shop_itemCount, shop_categories, shop_rarities } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.shop);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const priceChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            shop_prices: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // populate selected categories array
        if (categories.weapon) {
            categoryArray.push('Weapon');
        }
        if (categories.armor) {
            categoryArray.push('Armor');
        }
        if (categories.wondrousItem) {
            categoryArray.push('Wondrous Items');
        }
        if (categories.ring) {
            categoryArray.push('Ring');
        }
        if (categories.potion) {
            categoryArray.push('Potion');
        }
        if (categories.scroll) {
            categoryArray.push('Scroll');
        }
        if (categories.wand) {
            categoryArray.push('Wand');
        }
        if (categories.staff) {
            categoryArray.push('Staff');
        }

        // populate selected rarities array

        if (rarities.uncommon) {
            rarityArray.push('Uncommon');
        }
        if (rarities.rare) {
            rarityArray.push('Rare');
        }
        if (rarities.veryRare) {
            rarityArray.push('Very Rare');
        }
        if (rarities.legendary) {
            rarityArray.push('Legendary');
        }

        for (let element of categoryArray) {
            shop_categories.push(element);
        }

        for (let element of rarityArray) {
            shop_rarities.push(element);
        }

        // reset categories
        categories.current.weapon = false;
        categories.current.armor = false;
        categories.current.wondrousItem = false;
        categories.current.ring = false;
        categories.current.potion = false;
        categories.current.scroll = false;
        categories.current.wand = false;
        categories.current.staff = false;

        // reset rarities

        rarities.current.uncommon = false;
        rarities.current.rare = false;
        rarities.current.veryRare = false;
        rarities.current.legendary = false;

        const shopData = {
            shop_name,
            shop_owner,
            shop_location,
            shop_itemCount: itemTotal,
            shop_categories,
            shop_rarities,
        };

        if (shopData.shop_rarities.length < 1 || shopData.shop_categories.length < 1) {
            rarityError = true;
            categoryArray = [];
            rarityArray = [];
            setFormData((prevState) => ({
                ...prevState,
                shop_rarities: [],
                shop_categories: [],
            }));

            rarityErrorVisibility = (
                <Box>
                    <Alert severity='error'>You need at least one rarity type!</Alert>
                </Box>
            );

            window.alert('You need at least one rarity and one equipment type!');
        } else {
            await dispatch(createShop({ shopData }));

            navigate('/campaign');
        }
    };

    // if (rarityError == true) {

    //     console.log('hello');
    // } else {
    //     // rarityErrorVisibility = <span></span>;
    //     console.log('i shouldnt see this');
    // }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Box
            component={motion.div}
            initial={{ x: -550 }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 40,
                opacity: {
                    duration: 0.4,
                },
            }}
            animate={{ x: 0, opacity: 1 }}
            sx={{ mt: { xs: 0, sm: 5 }, ml: { xs: 0, sm: 5 }, maxWidth: '500px' }}
        >
            <Card sx={{ boxShadow: 10 }}>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <div className='ms-3'>
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
                                    Create a Shop
                                </Typography>

                                <Box>
                                    <IconButton
                                        component={Link}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.1 }}
                                        initial={{ opacity: 0 }}
                                        to='/campaign'
                                        type='button'
                                        variant='contained'
                                        color='calmRed'
                                        style={{ color: '#E57373' }}
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
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                error={disallowedSymbols.some((el) => formData.shop_name.includes(el))}
                                helperText={errorMessage.shop_name}
                                inputProps={{ pattern: '[A-Za-z0-9\'",-?(). ]{1,}' }}
                                label='Shop Name'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter a name for the shop'
                                name='shop_name'
                                value={shop_name}
                                onChange={onChange}
                            />

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                error={disallowedSymbols.some((el) => formData.shop_owner.includes(el))}
                                helperText={errorMessage.shop_owner}
                                inputProps={{ pattern: '[A-Za-z0-9\'",-?(). ]{1,}' }}
                                label='Shop Owner'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter a name for the shop owner'
                                name='shop_owner'
                                value={shop_owner}
                                onChange={onChange}
                            />

                            <TextField
                                sx={{ backgroundColor: 'transparent', color: 'white', mt: 1, maxWidth: '75%' }}
                                fullWidth
                                id='standard-basic'
                                error={disallowedSymbols.some((el) => formData.shop_location.includes(el))}
                                helperText={errorMessage.shop_location}
                                inputProps={{ pattern: '[A-Za-z0-9\'",-?(). ]{1,}' }}
                                label='Location'
                                variant='standard'
                                type='text'
                                className='searchBarInput form-control'
                                placeholder='Enter the location for the shop '
                                name='shop_location'
                                value={shop_location}
                                onChange={onChange}
                            />

                            <FormControl variant='standard' sx={{ mt: 1, width: '60%' }}>
                                <InputLabel id='demo-simple-select-standard-label'>
                                    How many items in the shop?
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-standard-label'
                                    id='demo-simple-select-standard'
                                    value={itemTotal}
                                    onChange={handleChange}
                                    label='Amount of Items'
                                >
                                    <MenuItem value=''>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography sx={{ mt: 4 }}>What types of items are in the shop?</Typography>

                            <Box sx={{ ml: 1, mt: 1 }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color='secondary'
                                                size='small'
                                                onChange={() => {
                                                    if (!categories.weapon) {
                                                        categories.weapon = true;
                                                    } else {
                                                        categories.weapon = false;
                                                    }
                                                }}
                                            />
                                        }
                                        label='Weapons'
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color='secondary'
                                                size='small'
                                                onChange={() => {
                                                    if (!categories.armor) {
                                                        categories.armor = true;
                                                    } else {
                                                        categories.armor = false;
                                                    }
                                                }}
                                            />
                                        }
                                        label='Armor'
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color='secondary'
                                                size='small'
                                                onChange={() => {
                                                    if (!categories.ring) {
                                                        categories.ring = true;
                                                    } else {
                                                        categories.ring = false;
                                                    }
                                                }}
                                            />
                                        }
                                        label='Rings'
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color='secondary'
                                                size='small'
                                                onChange={() => {
                                                    if (!categories.wondrousItem) {
                                                        categories.wondrousItem = true;
                                                    } else {
                                                        categories.wondrousItem = false;
                                                    }
                                                }}
                                            />
                                        }
                                        label='Wondrous Items'
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color='secondary'
                                                size='small'
                                                onChange={() => {
                                                    if (!categories.scroll) {
                                                        categories.scroll = true;
                                                    } else {
                                                        categories.scroll = false;
                                                    }
                                                }}
                                            />
                                        }
                                        label='Scrolls'
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color='secondary'
                                                size='small'
                                                onChange={() => {
                                                    if (!categories.potion) {
                                                        categories.potion = true;
                                                    } else {
                                                        categories.potion = false;
                                                    }
                                                }}
                                            />
                                        }
                                        label='Potions'
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color='secondary'
                                                size='small'
                                                onChange={() => {
                                                    if (!categories.wand) {
                                                        categories.wand = true;
                                                    } else {
                                                        categories.wand = false;
                                                    }
                                                }}
                                            />
                                        }
                                        label='Wands'
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color='secondary'
                                                size='small'
                                                onChange={() => {
                                                    if (!categories.staff) {
                                                        categories.staff = true;
                                                    } else {
                                                        categories.staff = false;
                                                    }
                                                }}
                                            />
                                        }
                                        label='Staves'
                                    />
                                </FormGroup>
                            </Box>
                            <Typography sx={{ mt: 3 }}>What rarities of items are in the shop?</Typography>

                            <Box sx={{ ml: 1, mt: 1 }}>
                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={<Switch color='secondary' size='small' />}
                                        label='Uncommon'
                                        onChange={() => {
                                            if (!rarities.uncommon) {
                                                rarities.uncommon = true;
                                            } else {
                                                rarities.uncommon = false;
                                            }
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={<Switch color='secondary' size='small' />}
                                        label='Rare'
                                        onChange={() => {
                                            if (!rarities.rare) {
                                                rarities.rare = true;
                                            } else {
                                                rarities.rare = false;
                                            }
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={<Switch color='secondary' size='small' />}
                                        label='Very Rare'
                                        onChange={() => {
                                            if (!rarities.veryRare) {
                                                rarities.veryRare = true;
                                            } else {
                                                rarities.veryRare = false;
                                            }
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup sx={{ mt: 0.2 }}>
                                    <FormControlLabel
                                        control={<Switch color='secondary' size='small' />}
                                        label='Legendary'
                                        onChange={() => {
                                            if (!rarities.legendary) {
                                                rarities.legendary = true;
                                            } else {
                                                rarities.legendary = false;
                                            }
                                        }}
                                    />
                                </FormGroup>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',

                                    mt: 3,
                                }}
                            >
                                <Button type='submit' variant='contained' color='secondary'>
                                    Create
                                </Button>
                            </Box>
                            <Typography sx={{ fontSize: '.8rem', mt: 2 }}>
                                Some filter combinations may not have enough items to generate a full shop. If that is
                                the case, your shop will still generate.
                            </Typography>
                        </div>
                    </form>
                </CardContent>
            </Card>
            {rarityErrorVisibility}
        </Box>
    );
}

export default NewShopOptions;
