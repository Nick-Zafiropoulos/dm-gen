import React from 'react';
import { MdAccountCircle, MdLogin, MdHome, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <header className='header'>
                <nav class='navbar navbar-expand-lg bg-light'>
                    <div class='container-fluid'>
                        <span class='navbar-brand'>My Campaigns</span>
                        <button
                            class='navbar-toggler'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#navbarText'
                            aria-controls='navbarText'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                        >
                            <span class='navbar-toggler-icon'></span>
                        </button>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li>
                                <Link to='/campaigns/cid/newshop'>New Shop</Link>
                            </li>
                            <li>
                                <Link to='/campaigns/cid/newnpc'>New NPC</Link>
                            </li>
                        </ul>
                        <div class='collapse navbar-collapse' id='navbarText'>
                            <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li class='nav-item'></li>
                            </ul>
                            <span class='navbar'>
                                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                    <li>
                                        <Link to='/'>
                                            <MdHome /> Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/login'>
                                            <MdLogout /> Logout
                                        </Link>
                                    </li>
                                </ul>
                            </span>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Navbar;
