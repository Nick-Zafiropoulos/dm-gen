import React from 'react';
import { MdAccountCircle, MdLogin, MdHome, MdLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Box, shadows } from '@mui/material';

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
    if (document.URL.includes('campaigns')) {
        CampaignCreateVisibility = (
            <li>
                <Link to='/campaigns/newcampaign'>Create a Campaign</Link>
            </li>
        );
    } else {
        CampaignCreateVisibility = <p></p>;
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
        ShopCreateVisibility = <p></p>;
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
        NPCCreateVisibility = <p></p>;
    }

    let CampaignJoinVisibility;
    if (document.URL.includes('campaigns')) {
        CampaignJoinVisibility = (
            <li>
                <Link to='/join'>Join a Campaign</Link>
            </li>
        );
    } else {
        CampaignJoinVisibility = <p></p>;
    }

    let ToCampaignVisibility;
    if (document.URL.includes('shop') || document.URL.includes('npc')) {
        ToCampaignVisibility = (
            <li>
                <Link to='/campaign'>Back to Campaign</Link>
            </li>
        );
    } else {
        ToCampaignVisibility = <p></p>;
    }

    return (
        <Box width='100%' sx={{ boxShadow: 4 }}>
            <header className='header'>
                {user ? (
                    <nav className='navbar navbar-expand-lg bg-light'>
                        <div className='container-fluid'>
                            <span className='navbar-brand'>{user.user_name}'s Dashboard</span>
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
                    <nav className='navbar navbar-expand-lg'>
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
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'></ul>

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
                )}
            </header>
        </Box>
    );
}

export default Navbar;
