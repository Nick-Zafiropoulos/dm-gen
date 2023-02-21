import React from 'react';
import { MdAccountCircle, MdLogin, MdHome, MdLogout, MdPersonAdd, MdOutlineHelp, MdNavigateNext } from 'react-icons/md';
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
                        <MdHome /> My Campaigns
                    </Link>
                </Box>
            </li>
        );
    }

    return (
        <nav class='navbar navbar-expand-lg navbar-light bg-light'>
            <a class='navbar-brand' href='#'>
                Navbar
            </a>
            <button
                class='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span class='navbar-toggler-icon'></span>
            </button>
            <div class='collapse navbar-collapse' id='navbarNav'>
                <ul class='navbar-nav'>
                    <li class='nav-item active'>
                        <a class='nav-link' href='#'>
                            Home <span class='sr-only'>(current)</span>
                        </a>
                    </li>
                    <li class='nav-item'>
                        <a class='nav-link' href='#'>
                            Features
                        </a>
                    </li>
                    <li class='nav-item'>
                        <a class='nav-link' href='#'>
                            Pricing
                        </a>
                    </li>
                    <li class='nav-item'>
                        <a class='nav-link disabled' href='#'>
                            Disabled
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
