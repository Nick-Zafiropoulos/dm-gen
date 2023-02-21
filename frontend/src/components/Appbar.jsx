// import React from 'react';
import { MdAccountCircle, MdLogin, MdHome, MdLogout, MdPersonAdd, MdHelpOutline, MdNavigateNext } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
// import { Box, shadows } from '@mui/material';
import dmgenlogoblack from '../images/dmgenlogoblack.png';
// import { motion, AnimatePresence } from 'framer-motion';
import { BsPlusCircle, BsPersonPlus, BsBackspace } from 'react-icons/bs';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

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

let pages = [];
const settings = [
    {
        name: 'How It Works',
        icon: MdHelpOutline,
    },
    {
        name: 'Register',
        icon: MdPersonAdd,
    },
    {
        name: 'Login',
        icon: MdLogin,
    },
];

function Appbar() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleRedirect = (redirectlink) => {
        setAnchorElNav(null);
        console.log(redirectlink);

        switch (redirectlink) {
            case 'My Campaigns':
                navigate('/campaigns');
                break;
            case 'Login':
                navigate('/login');
                break;
            case 'Create Campaign':
                navigate('/campaigns/newcampaign');
                break;
            case 'Register':
                navigate('/register');
                break;
            default:
                break;
        }
    };

    if (user) {
        pages.push('Logoutyo');
        // pages = ['My Campaigns', 'Create Campaign', 'Join Campaign', 'Login'];
    }
    const dispatch = useDispatch();

    // const { campaignInUse } = useSelector((state) => state.campaign);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    // let CampaignCreateVisibility;
    // if (document.URL.includes('campaigns') || document.URL.includes('join')) {
    //     CampaignCreateVisibility = (
    //         <li>
    //             <Link to='/campaigns/newcampaign'>
    //                 <BsPlusCircle /> Create a Campaign
    //             </Link>
    //         </li>
    //     );
    // } else {
    //     CampaignCreateVisibility = <span></span>;
    // }

    // let ShopCreateVisibility;
    // if (
    //     document.URL.includes('campaign') &&
    //     !document.URL.includes('campaigns') &&
    //     user._id == campaignInUse.dungeon_master[0]
    // ) {
    //     ShopCreateVisibility = (
    //         <li>
    //             <Link to='/shop/newshop'>
    //                 <BsPlusCircle /> New Shop
    //             </Link>
    //         </li>
    //     );
    // } else {
    //     ShopCreateVisibility = <span></span>;
    // }

    // let NPCCreateVisibility;
    // if (
    //     document.URL.includes('campaign') &&
    //     !document.URL.includes('campaigns') &&
    //     user._id == campaignInUse.dungeon_master[0]
    // ) {
    //     NPCCreateVisibility = (
    //         <li>
    //             <Link to='/npc/newnpc'>
    //                 <BsPlusCircle /> New NPC
    //             </Link>
    //         </li>
    //     );
    // } else {
    //     NPCCreateVisibility = <span></span>;
    // }

    // let CampaignJoinVisibility;
    // if (document.URL.includes('campaigns') || document.URL.includes('join')) {
    //     CampaignJoinVisibility = (
    //         <li>
    //             <Link to='/join'>
    //                 <BsPersonPlus /> Join a Campaign
    //             </Link>
    //         </li>
    //     );
    // } else {
    //     CampaignJoinVisibility = <span></span>;
    // }

    // let ToCampaignVisibility;
    // if (document.URL.includes('shop') || document.URL.includes('npc')) {
    //     ToCampaignVisibility = (
    //         <li>
    //             <Link to='/campaign'>
    //                 <BsBackspace /> Back to Campaign
    //             </Link>
    //         </li>
    //     );
    // } else {
    //     ToCampaignVisibility = <span></span>;
    // }

    let LogoVisibility;
    if (document.URL.includes('login') || document.URL.includes('register')) {
        LogoVisibility = (
            <Link to='/'>
                <img style={styles.dmgentext} src={dmgenlogoblack} />
            </Link>
        );
    } else {
        LogoVisibility = <span></span>;
    }

    // let MyCampaigns;
    // if (document.URL.includes('campaigns')) {
    //     MyCampaigns = <span></span>;
    // } else {
    //     MyCampaigns = (
    //         <li>
    //             <Box>
    //                 <Link to='/campaigns'>
    //                     <MdHome /> My Campaigns
    //                 </Link>
    //             </Box>
    //         </li>
    //     );
    // }

    return (
        <AppBar position='sticky' style={{ background: '#5e5856' }}>
            <Container maxWidth='100vw'>
                <Toolbar disableGutters>
                    <Link to='/'>
                        <img style={styles.dmgentext} src={dmgenlogoblack} />
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleRedirect(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <Tooltip title='Open settings'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <MdAccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconContext.Provider
                                            value={{ color: 'white', className: 'global-class-name', size: '1.3em' }}
                                        >
                                            <setting.icon />
                                        </IconContext.Provider>
                                        <Typography sx={{ ml: 1 }} textAlign='center'>
                                            {setting.name}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {settings.map((setting) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconContext.Provider
                                    value={{
                                        color: 'black',
                                        className: 'global-class-name',
                                        size: '1.3em',
                                    }}
                                >
                                    <setting.icon />
                                </IconContext.Provider>

                                <Button
                                    key={setting.name}
                                    onClick={() => handleRedirect(setting.name)}
                                    sx={{ mr: 1, my: 2, color: 'white', display: 'block' }}
                                >
                                    {setting.name}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

        // <Box width='100%' sx={{ boxShadow: 4 }}>
        //     <header className='header'>
        //         {user ? (
        //             <nav className='navbar navbar-expand-lg bg-light'>
        //                 <div className='container-fluid'>
        //                     <Link to='/'>
        //                         <img style={styles.dmgentext} className='' src={dmgenlogoblack} />
        //                     </Link>

        //                     <Box sx={{ ml: 3, mb: 1 }}>
        //                         <span style={{ fontSize: '30px' }} className='navbar-brand'>
        //                             |
        //                         </span>
        //                     </Box>

        //                     <Box sx={{ ml: 1 }}>
        //                         <span className='navbar-brand'>{user.user_name}'s Dashboard</span>
        //                     </Box>
        //                     <IconContext.Provider
        //                         value={{ color: 'black', className: 'global-class-name', size: '35px' }}
        //                     >
        //                         <MdNavigateNext />
        //                     </IconContext.Provider>

        //                     <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        //                         {MyCampaigns}
        //                         {ShopCreateVisibility}
        //                         {NPCCreateVisibility}
        //                         {CampaignCreateVisibility}
        //                         {CampaignJoinVisibility}
        //                         {ToCampaignVisibility}
        //                     </ul>

        //                     {/* <button
        //                         className='navbar-toggler'
        //                         type='button'
        //                         data-bs-toggle='collapse'
        //                         data-bs-target='#navbarText'
        //                         aria-controls='navbarText'
        //                         aria-expanded='false'
        //                         aria-label='Toggle navigation'
        //                     >
        //                         <span className='navbar-toggler-icon'></span>
        //                     </button> */}

        //                     <div className='collapse navbar-collapse' id='navbarText'>
        //                         <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        //                             <li className='nav-item'></li>
        //                         </ul>

        //                         <span className='navbar'>
        //                             <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        //                                 {user ? (
        //                                     <>
        //                                         <li>
        //                                             <Link to='/howitworks'>
        //                                                 <MdOutlineHelp />
        //                                                 How It Works
        //                                             </Link>
        //                                         </li>
        //                                         <li>
        //                                             <button className='btn' onClick={onLogout}>
        //                                                 <MdLogout /> Logout
        //                                             </button>
        //                                         </li>
        //                                     </>
        //                                 ) : (
        //                                     <>
        //                                         <li>
        //                                             <Link to='/'>
        //                                                 <MdHome /> Home
        //                                             </Link>
        //                                         </li>
        //                                         <li>
        //                                             <Link to='/login'>
        //                                                 <MdLogin /> Login
        //                                             </Link>
        //                                         </li>
        //                                     </>
        //                                 )}
        //                             </ul>
        //                         </span>
        //                     </div>
        //                     <button
        //                         className='navbar-toggler'
        //                         type='button'
        //                         data-bs-toggle='collapse'
        //                         data-bs-target='#navbarText'
        //                         aria-controls='navbarText'
        //                         aria-expanded='false'
        //                         aria-label='Toggle navigation'
        //                     >
        //                         <span className='navbar-toggler-icon'></span>
        //                     </button>
        //                 </div>
        //             </nav>
        //         ) : (
        //             <nav className='navbar navbar-expand-lg bg-light'>
        //                 <div className='container-fluid'>
        //                     <span className='navbar-brand'></span>

        //                     <button
        //                         style={styles.hamburger}
        //                         className='navbar-toggler'
        //                         type='button'
        //                         data-bs-toggle='collapse'
        //                         data-bs-target='#navbarText'
        //                         aria-controls='navbarText'
        //                         aria-expanded='false'
        //                         aria-label='Toggle navigation'
        //                     >
        //                         <span className='navbar-toggler-icon'></span>
        //                     </button>
        //                     <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        //                         <Link to='/'>
        //                             <img style={styles.dmgentext} className='' src={dmgenlogoblack} />
        //                         </Link>
        //                     </ul>

        //                     <div className='collapse navbar-collapse' id='navbarText'>
        //                         <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        //                             <li className='nav-item'></li>
        //                         </ul>
        //                         <span className='navbar'>
        //                             <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        //                                 {user ? (
        //                                     <>
        //                                         <li>
        //                                             <Link to='/'>
        //                                                 <MdHome /> Home
        //                                             </Link>
        //                                         </li>
        //                                         <li>
        //                                             <button className='btn' onClick={onLogout}>
        //                                                 <MdLogout /> Logout
        //                                             </button>
        //                                         </li>
        //                                     </>
        //                                 ) : (
        //                                     <>
        //                                         <li>
        //                                             <Link to='/howitworks'>
        //                                                 <MdOutlineHelp />
        //                                                 How It Works
        //                                             </Link>
        //                                         </li>
        //                                         <li>
        //                                             <Link to='/register'>
        //                                                 <MdPersonAdd /> Register
        //                                             </Link>
        //                                         </li>
        //                                         <li>
        //                                             <Link to='/login'>
        //                                                 <MdLogin /> Login
        //                                             </Link>
        //                                         </li>
        //                                     </>
        //                                 )}
        //                             </ul>
        //                         </span>
        //                     </div>
        //                 </div>
        //             </nav>
        //         )}
        //     </header>
        // </Box>
    );
}

export default Appbar;
