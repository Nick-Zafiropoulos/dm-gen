import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterCheckbox from '../components/FilterCheckbox';
import FilterResults from '../components/FilterResults';
import NPCFilter from '../components/NPCFilter';
import { getShop } from '../features/shops/shopSlice';
import { getNPC } from '../features/npcs/npcSlice';
import { reset as npcReset } from '../features/npcs/npcSlice';
import { reset as shopReset } from '../features/shops/shopSlice';
import { Box, shadows, Typography } from '@mui/material';
import blankCanvas from '../images/dmgenblankcloth.png';
import { useTheme } from '@mui/material/styles';
import { GiDualityMask, GiShop, GiTwoShadows } from 'react-icons/gi';
import { IconContext } from 'react-icons';
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
        return shops.filter((result) => result.shop_name.toLowerCase().includes(searchValue.toLowerCase()));
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
        return npcs.filter((result) => result.npc_name.toLowerCase().includes(NPCsearchValue.toLowerCase()));
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

    return (
        // <div className='pageBody'>
        //     <Navbar />

        //     <div className='row'>
        //         <div className='col'>
        //             <SearchBar callback={(searchValue) => setSearchValue(searchValue)} searchType='shop' />
        //         </div>
        //         <div className='col'>
        //             {results.length >= 0 ? (
        //                 <div className='campaigns'>
        //                     {results.map((shop) => (
        //                         <FilterResults key={results._id} shop={shop} />
        //                     ))}{' '}
        //                 </div>
        //             ) : (
        //                 <p>You do not have any shops yet!</p>
        //             )}
        //         </div>

        //         <div className='col'>
        //             <SearchBar callback={(NPCsearchValue) => setNPCSearchValue(NPCsearchValue)} searchType='NPC' />

        //             {NPCresults.length >= 0 ? (
        //                 <div className='campaigns'>
        //                     {NPCresults.map((npc) => (
        //                         <NPCFilter key={NPCresults._id} npc={npc} />
        //                     ))}{' '}
        //                 </div>
        //             ) : (
        //                 <p>You do not have any NPCs yet!</p>
        //             )}
        //         </div>
        //     </div>
        // </div>
        <>
            <Box style={styles.backgroundCanvas}>
                <Navbar />
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
                                fontSize: '35px',
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '2px 2px #262626',
                            }}
                        >
                            {campaignInUse.campaign_name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 4, p: 3 }}>
                        <Box sx={{ width: '40%' }}>
                            <Box sx={{ width: '50%' }}>
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
                                        ))}{' '}
                                    </div>
                                ) : (
                                    <p>You do not have any shops yet!</p>
                                )}
                            </Box>
                        </Box>
                        <Box sx={{ width: '40%' }}>
                            <Box sx={{ width: '50%' }}>
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
                                        ))}{' '}
                                    </div>
                                ) : (
                                    <p>You do not have any NPCs yet!</p>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box style={styles.backgroundSolid}></Box>
        </>
    );
};

export default Campaign;
