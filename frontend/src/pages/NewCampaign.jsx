import React from 'react';
import Navbar from '../components/Navbar';
import NewCampaignOptions from '../components/NewCampaignOptions';

function NewCampaign() {
    return (
        <div>
            <Navbar />

            <div className='row'>
                <NewCampaignOptions />
            </div>
        </div>
    );
}

export default NewCampaign;
