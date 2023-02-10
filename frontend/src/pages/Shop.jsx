import React from 'react';
import Navbar from '../components/Navbar';
import ShopList from '../components/ShopList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteShop, reset, getShop, setShop } from '../features/shops/shopSlice';
import { Box, shadows, Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import blankCanvas from '../images/dmgenblankcloth.png';
import { motion } from 'framer-motion';

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
            <Button onClick={shopDelete} type='button' variant='contained' color='dangerRed' sx={{ color: 'white' }}>
                Delete Shop
            </Button>
        );
    } else {
        deleteVisibility = <p></p>;
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
                    transition={{ delay: 0.4, duration: 0.1 }}
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
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </Box>
    );
};

export default Shop;

// Need to do:
// - set a state key:value for shopInUse when clicking on the shop in the campain dashboard
// - take shopInUse and GET item values, name, owner, and location from shopInUse Object to display on Shop/ShopList components
