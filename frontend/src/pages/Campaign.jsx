import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterResults from '../components/FilterResults';
import NPCFilter from '../components/NPCFilter';
import { getShop } from '../features/shops/shopSlice';
import { getNPC } from '../features/npcs/npcSlice';
import { reset as npcReset } from '../features/npcs/npcSlice';
import { reset as shopReset } from '../features/shops/shopSlice';
import { Box, shadows, Typography, Button } from '@mui/material';
import blankCanvas from '../images/dmgenblankcloth.png';
import { useTheme } from '@mui/material/styles';
import { GiDualityMask, GiShop, GiTwoShadows } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';

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

const Campaign = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const theme = useTheme();

    const { user, isLoading, isError, message } = useSelector((state) => state.auth);
    const { isSuccess } = useSelector((state) => state.shop);
    const { isSuccess: npcSuccess } = useSelector((state) => state.npc);

    const { shops } = useSelector((state) => state.shop);
    const { npcs } = useSelector((state) => state.npc);
    const { campaignInUse } = useSelector((state) => state.campaign);

    useEffect(() => {
        dispatch(npcReset());
        dispatch(shopReset());
        dispatch(getShop());
        dispatch(getNPC());
    }, [user, navigate, isError, message, dispatch]);

    // Shop search functionality
    const filterResults = (searchValue) => {
        if (searchValue === '') {
            return shops;
        }

        let nameFilter = shops.filter((result) => result.shop_name.toLowerCase().includes(searchValue.toLowerCase()));
        let locationFilter = shops.filter((result) =>
            result.shop_location.toLowerCase().includes(searchValue.toLowerCase())
        );
        let combinedArray = nameFilter.concat(locationFilter);

        let set = new Set(combinedArray);

        combinedArray = Array.from(set);

        return combinedArray;
    };

    const [results, setResults] = useState(shops);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const filteredResults = filterResults(searchValue);
        setResults(filteredResults);
    }, [searchValue]);

    useEffect(() => {
        setResults(shops);
    }, [isSuccess]);

    // NPC search functionality
    const filterNPCResults = (NPCsearchValue) => {
        if (NPCsearchValue === '') {
            return npcs;
        }
        let npcNameFilter = npcs.filter((result) =>
            result.npc_name.toLowerCase().includes(NPCsearchValue.toLowerCase())
        );
        let occupationFilter = npcs.filter((result) =>
            result.npc_occupation.toLowerCase().includes(NPCsearchValue.toLowerCase())
        );
        let npcCombinedArray = npcNameFilter.concat(occupationFilter);

        let npcSet = new Set(npcCombinedArray);

        npcCombinedArray = Array.from(npcSet);

        return npcCombinedArray;
    };

    const [NPCresults, setNPCResults] = useState(npcs);
    const [NPCsearchValue, setNPCSearchValue] = useState('');

    useEffect(() => {
        const filteredNPCResults = filterNPCResults(NPCsearchValue);
        setNPCResults(filteredNPCResults);
    }, [NPCsearchValue]);

    useEffect(() => {
        setNPCResults(npcs);
    }, [npcSuccess]);

    // Element Visibility Logic
    let ShopCreateVisibility;
    if (
        document.URL.includes('campaign') &&
        !document.URL.includes('campaigns') &&
        user._id == campaignInUse.dungeon_master[0]
    ) {
        ShopCreateVisibility = (
            <Box sx={{ mt: 3, ml: 2 }}>
                <Button
                    component={Link}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                    type='button'
                    variant='contained'
                    color='secondary'
                    to='/shop/newshop'
                    style={{ color: '#FFF' }}
                >
                    + New Shop
                </Button>
            </Box>
        );
    } else {
        ShopCreateVisibility = <span></span>;
    }

    let NPCCreateVisibility;
    if (
        document.URL.includes('campaign') &&
        !document.URL.includes('campaigns') &&
        user._id == campaignInUse.dungeon_master[0]
    ) {
        NPCCreateVisibility = (
            <Box sx={{ mt: 3, ml: 2 }}>
                <Button
                    component={Link}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                    type='button'
                    variant='contained'
                    color='secondary'
                    to='/npc/newnpc'
                    style={{ color: '#FFF' }}
                >
                    + New NPC
                </Button>
            </Box>
        );
    } else {
        NPCCreateVisibility = <span></span>;
    }

    return (
        <>
            <Box style={styles.backgroundCanvas}>
                <Navbar position='sticky' />
                <Box
                    component={motion.div}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.1 }}
                    initial={{ opacity: 0 }}
                >
                    <Box sx={{ mt: 6 }}>
                        <Typography
                            sx={{
                                display: 'flex',
                                ml: 3,
                                mt: 3,
                                mb: 3,
                                fontSize: { xs: '1.5em', sm: '35px' },
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '2px 2px #262626',
                            }}
                        >
                            {campaignInUse.campaign_name}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'flex-start',
                            gap: 4,
                            p: 3,
                        }}
                    >
                        <Box sx={{ width: { xs: '100%', sm: '40%' } }}>
                            <Box sx={{ width: { xs: '80%', sm: '50%' } }}>
                                <IconContext.Provider
                                    value={{ color: 'white', className: 'global-class-name', size: '40px' }}
                                >
                                    <GiShop />
                                </IconContext.Provider>
                                <Box sx={{ mt: 1 }}>
                                    <SearchBar
                                        callback={(searchValue) => setSearchValue(searchValue)}
                                        searchType='shops'
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ width: '100%' }}>
                                {results.length >= 0 ? (
                                    <div className='campaigns'>
                                        {results.map((shop) => (
                                            <FilterResults key={results._id} shop={shop} />
                                        ))}
                                    </div>
                                ) : (
                                    <p>You do not have any shops yet!</p>
                                )}
                            </Box>
                            {ShopCreateVisibility}
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: '40%' } }}>
                            <Box sx={{ width: { xs: '80%', sm: '50%' } }}>
                                <IconContext.Provider
                                    value={{ color: 'white', className: 'global-class-name', size: '40px' }}
                                >
                                    <GiTwoShadows />
                                </IconContext.Provider>
                                <Box sx={{ mt: 1 }}>
                                    <SearchBar
                                        callback={(NPCsearchValue) => setNPCSearchValue(NPCsearchValue)}
                                        searchType='NPCs'
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ width: '100%' }}>
                                {NPCresults.length >= 0 ? (
                                    <div className='campaigns'>
                                        {NPCresults.map((npc) => (
                                            <NPCFilter key={NPCresults._id} npc={npc} />
                                        ))}
                                    </div>
                                ) : (
                                    <p>You do not have any NPCs yet!</p>
                                )}
                            </Box>
                            {NPCCreateVisibility}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Campaign;
