import React from 'react';
import Navbar from '../components/Navbar';
import NewNPCOptions from '../components/NewNPCOptions';

class NewNPC extends React.Component {
    render() {
        return (
            <div>
                <Navbar />

                <div className='row'>
                    <NewNPCOptions />
                </div>
            </div>
        );
    }
}

export default NewNPC;
