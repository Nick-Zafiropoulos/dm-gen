import React from 'react';
import Navbar from '../components/Navbar';
import CampaignList from '../components/CampaignList';

class Campaigns extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <CampaignList />
            </div>
        );
    }
}

export default Campaigns;
