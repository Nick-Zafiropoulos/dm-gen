import React from 'react';
import { Outlet, Link } from 'react-router-dom';

class Layout extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                    </ul>
                </nav>

                <Outlet />
            </div>
        );
    }
}

export default Layout;
