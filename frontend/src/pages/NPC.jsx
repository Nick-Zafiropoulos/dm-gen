import React from 'react';
import Navbar from '../components/Navbar';
import NPCDetails from '../components/NPCDetails';

class NPC extends React.Component {
    render() {
        return (
            <div>
                <Navbar />

                <div className='row'>
                    <div className='col'>
                        <h1 className='m-3'>NPC Example #1</h1>
                    </div>
                    <div className='d-flex align-items-center justify-content-end col'>
                        <button type='button' className='m-3 btn btn-warning'>
                            Edit NPC
                        </button>
                        <button type='button' className='m-3 btn btn-danger'>
                            Delete NPC
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <NPCDetails />
                </div>
            </div>
        );
    }
}

export default NPC;
