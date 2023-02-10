import React from 'react';
import { MdAccountCircle, MdLogin, MdHome, MdLogout, MdPersonAdd, MdOutlineHelp, MdNavigateNext } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Box, shadows } from '@mui/material';
import dmgenlogoblack from '../images/dmgenlogoblack.png';
import { motion, AnimatePresence } from 'framer-motion';

const styles = {
    dmgentext: {
        width: 'auto',
        height: 'auto',
        maxWidth: '50px',
        margin: 0,
        padding: 0,
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
                <Link to='/campaigns/newcampaign'>Create a Campaign</Link>
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
                <Link to='/shop/newshop'>New Shop</Link>
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
                <Link to='/npc/newnpc'>New NPC</Link>
            </li>
        );
    } else {
        NPCCreateVisibility = <span></span>;
    }

    let CampaignJoinVisibility;
    if (document.URL.includes('campaigns') || document.URL.includes('join')) {
        CampaignJoinVisibility = (
            <li>
                <Link to='/join'>Join a Campaign</Link>
            </li>
        );
    } else {
        CampaignJoinVisibility = <span></span>;
    }

    let ToCampaignVisibility;
    if (document.URL.includes('shop') || document.URL.includes('npc')) {
        ToCampaignVisibility = (
            <li>
                <Link to='/campaign'>Back to Campaign</Link>
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

    let MyCampaignSlide;
    if (document.URL.includes('shop') || document.URL.includes('campaign') || document.URL.includes('npc')) {
        MyCampaignSlide = (
            <Link to='/campaigns'>
                <MdHome /> My Campaigns
            </Link>
        );
    } else {
        MyCampaignSlide = (
            <Box>
                <Link to='/campaigns'>
                    <MdHome /> My Campaigns
                </Link>
            </Box>
        );
    }

    return (
        <Box width='100%' sx={{ boxShadow: 4 }}>
            <header className='header'>
                {user ? (
                    <nav className='navbar navbar-expand-lg bg-light'>
                        <div className='container-fluid'>
                            <Link to='/'>
                                <img style={styles.dmgentext} className='' src={dmgenlogoblack} />
                            </Link>

                            <Box sx={{ ml: 3, mb: 1 }}>
                                <span style={{ fontSize: '30px' }} className='navbar-brand'>
                                    |
                                </span>
                            </Box>

                            <Box sx={{ ml: 1 }}>
                                <span className='navbar-brand'>{user.user_name}'s Dashboard</span>
                            </Box>
                            <IconContext.Provider
                                value={{ color: 'black', className: 'global-class-name', size: '35px' }}
                            >
                                <MdNavigateNext />
                            </IconContext.Provider>
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

                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                {ShopCreateVisibility}
                                {NPCCreateVisibility}
                                {CampaignCreateVisibility}
                                {CampaignJoinVisibility}
                                {ToCampaignVisibility}
                            </ul>

                            <div className='collapse navbar-collapse' id='navbarText'>
                                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                    <li className='nav-item'></li>
                                </ul>
                                <span className='navbar'>
                                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                        {user ? (
                                            <>
                                                <li>{MyCampaignSlide}</li>
                                                <li>
                                                    <button className='btn' onClick={onLogout}>
                                                        <MdLogout /> Logout
                                                    </button>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <Link to='/'>
                                                        <MdHome /> Home
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
                    <nav className='navbar navbar-expand-lg bg-light'>
                        <div className='container-fluid'>
                            <span className='navbar-brand'></span>
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
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <Link to='/'>
                                    <img style={styles.dmgentext} className='' src={dmgenlogoblack} />
                                </Link>
                            </ul>

                            <div className='collapse navbar-collapse' id='navbarText'>
                                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                    <li className='nav-item'></li>
                                </ul>
                                <span className='navbar'>
                                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                        {user ? (
                                            <>
                                                <li>
                                                    <Link to='/'>
                                                        <MdHome /> Home
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button className='btn' onClick={onLogout}>
                                                        <MdLogout /> Logout
                                                    </button>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <Link to='/howitworks'>
                                                        <MdOutlineHelp />
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
