import React from 'react';
import {
    MdAccountCircle,
    MdLogin,
    MdOutlineHome,
    MdLogout,
    MdPersonAdd,
    MdHelpOutline,
    MdNavigateNext,
} from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Box, shadows } from '@mui/material';
import dmgenlogoblack from '../images/dmgenlogoblack.png';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPlusCircle, BsPersonPlus, BsBackspace } from 'react-icons/bs';

const styles = {
    dmgentext: {
        width: 'auto',
        height: 'auto',
        maxWidth: '50px',
        marginLeft: 5,
        margin: 0,
        padding: 0,
    },
    hamburger: {
        marginBottom: 10,
    },
};

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { campaignInUse } = useSelector((state) => state.campaign);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    let CampaignCreateVisibility;
    if (document.URL.includes('campaigns') || document.URL.includes('join')) {
        CampaignCreateVisibility = (
            <li>
                <Link to='/campaigns/newcampaign'>
                    <BsPlusCircle /> Create a Campaign
                </Link>
            </li>
        );
    } else {
        CampaignCreateVisibility = <span></span>;
    }

    let ShopCreateVisibility;
    if (
        document.URL.includes('campaign') &&
        !document.URL.includes('campaigns') &&
        user._id == campaignInUse.dungeon_master[0]
    ) {
        ShopCreateVisibility = (
            <li>
                <Link to='/shop/newshop'>
                    <BsPlusCircle /> New Shop
                </Link>
            </li>
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
            <li>
                <Link to='/npc/newnpc'>
                    <BsPlusCircle /> New NPC
                </Link>
            </li>
        );
    } else {
        NPCCreateVisibility = <span></span>;
    }

    let CampaignJoinVisibility;
    if (document.URL.includes('campaigns') || document.URL.includes('join')) {
        CampaignJoinVisibility = (
            <li>
                <Link to='/join'>
                    <BsPersonPlus /> Join a Campaign
                </Link>
            </li>
        );
    } else {
        CampaignJoinVisibility = <span></span>;
    }

    let ToCampaignVisibility;
    if (document.URL.includes('shop') || document.URL.includes('npc')) {
        ToCampaignVisibility = (
            <li>
                <Link to='/campaign'>
                    <BsBackspace /> Back to Campaign
                </Link>
            </li>
        );
    } else {
        ToCampaignVisibility = <span></span>;
    }

    let LogoVisibility;
    if (document.URL.includes('login') || document.URL.includes('register')) {
        LogoVisibility = (
            <Link to='/'>
                <img style={styles.dmgentext} className='' src={dmgenlogoblack} />
            </Link>
        );
    } else {
        LogoVisibility = <span></span>;
    }

    let MyCampaigns;
    if (document.URL.includes('campaigns')) {
        MyCampaigns = <span></span>;
    } else {
        MyCampaigns = (
            <li>
                <Box>
                    <Link to='/campaigns'>
                        <IconContext.Provider
                            value={{ color: 'black', className: 'global-class-name', size: '1.2rem' }}
                        >
                            <MdOutlineHome />
                        </IconContext.Provider>
                        My Campaigns
                    </Link>
                </Box>
            </li>
        );
    }

    return (
        <Box width='100%' sx={{ boxShadow: 4 }}>
            <header className='header'>
                {user ? (
                    <nav className='navbar sticky-top navbar-expand-xl navcolor'>
                        <div className='container-fluid'>
                            <Link to='/'>
                                <img style={styles.dmgentext} className='' src={dmgenlogoblack} />
                            </Link>

                            {/* <Box sx={{ ml: 3, mb: 1 }}>
                                <span style={{ fontSize: '30px' }} className='navbar-brand'>
                                    |
                                </span>
                            </Box> */}

                            <Box sx={{ ml: 3 }}>
                                <span className='navbar-brand'>{user.user_name}'s Dashboard</span>
                            </Box>
                            {/* <IconContext.Provider
                                value={{ color: 'black', className: 'global-class-name', size: '35px' }}
                            >
                                <MdNavigateNext />
                            </IconContext.Provider> */}

                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                {/* {MyCampaigns}
                                {ShopCreateVisibility}
                                {NPCCreateVisibility}
                                {CampaignCreateVisibility}
                                {CampaignJoinVisibility}
                                {ToCampaignVisibility} */}
                            </ul>

                            {/* <button
                                className='navbar-toggler'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#navbarText'
                                aria-controls='navbarText'
                                aria-expanded='false'
                                aria-label='Toggle navigation'
                            >
                                <span className='navbar-toggler-icon'></span>
                            </button> */}
                            <button
                                className='navbar-toggler'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#navbarText'
                                aria-controls='navbarText'
                                aria-expanded='false'
                                aria-label='Toggle navigation'
                            >
                                <span className='navbar-toggler-icon'></span>
                            </button>
                            <div className='collapse navbar-collapse' id='navbarText'>
                                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                    <li className='nav-item'></li>
                                </ul>

                                <span className='navbar'>
                                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                        {user ? (
                                            <>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        flexDirection: { xs: 'column', lg: 'row' },
                                                    }}
                                                >
                                                    {ToCampaignVisibility}
                                                    {MyCampaigns}
                                                    {ShopCreateVisibility}
                                                    {NPCCreateVisibility}
                                                    {CampaignCreateVisibility}
                                                    {CampaignJoinVisibility}

                                                    <li>
                                                        <Link to='/howitworks'>
                                                            <IconContext.Provider
                                                                value={{
                                                                    color: 'black',
                                                                    className: 'global-class-name',
                                                                    size: '1.1rem',
                                                                }}
                                                            >
                                                                <MdHelpOutline />
                                                            </IconContext.Provider>
                                                            How It Works
                                                        </Link>
                                                    </li>
                                                </Box>

                                                <li>
                                                    <button className='btn logoutButton' onClick={onLogout}>
                                                        <MdLogout /> Logout
                                                    </button>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <Link to='/'>
                                                        <MdOutlineHome /> Home
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/login'>
                                                        <MdLogin /> Login
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </nav>
                ) : (
                    <nav className='navbar sticky-top navbar-expand-xl navcolor'>
                        <div className='container-fluid'>
                            <span className='navbar-brand'></span>

                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <Link to='/'>
                                    <img style={styles.dmgentext} className='' src={dmgenlogoblack} />
                                </Link>
                            </ul>
                            <button
                                style={styles.hamburger}
                                className='navbar-toggler'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#navbarText'
                                aria-controls='navbarText'
                                aria-expanded='false'
                                aria-label='Toggle navigation'
                            >
                                <span className='navbar-toggler-icon'></span>
                            </button>
                            <div className='collapse navbar-collapse' id='navbarText'>
                                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                    <li className='nav-item'></li>
                                </ul>
                                <span className='navbar'>
                                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                        {user ? (
                                            <>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        flexDirection: { xs: 'column', lg: 'row' },
                                                    }}
                                                >
                                                    <li>
                                                        <Link to='/howitworks'>
                                                            <IconContext.Provider
                                                                value={{
                                                                    color: 'black',
                                                                    className: 'global-class-name',
                                                                    size: '1.1rem',
                                                                }}
                                                            >
                                                                <MdHelpOutline />
                                                            </IconContext.Provider>
                                                            How It Works
                                                        </Link>
                                                    </li>
                                                </Box>

                                                <li>
                                                    <button className='btn' onClick={onLogout}>
                                                        <MdLogout /> Logout
                                                    </button>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        flexDirection: { xs: 'column', lg: 'row' },
                                                    }}
                                                >
                                                    <li>
                                                        <Link to='/howitworks'>
                                                            <IconContext.Provider
                                                                value={{
                                                                    color: 'black',
                                                                    className: 'global-class-name',
                                                                    size: '1.1rem',
                                                                }}
                                                            >
                                                                <MdHelpOutline />
                                                            </IconContext.Provider>
                                                            How It Works
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/register'>
                                                            <MdPersonAdd /> Register
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/login'>
                                                            <MdLogin /> Login
                                                        </Link>
                                                    </li>
                                                </Box>
                                            </>
                                        )}
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </nav>
                )}
            </header>
        </Box>
    );
}

export default Navbar;
