import React from 'react';
import Navbar from '../components/Navbar';
import NewShopOptions from '../components/NewShopOptions';

class NewShop extends React.Component {
    render() {
        return (
            <div>
                <Navbar />

                <div className='row'>
                    <NewShopOptions />
                </div>
            </div>
        );
    }
}

export default NewShop;
