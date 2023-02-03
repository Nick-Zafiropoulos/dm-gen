import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCampaign, reset, leaveCampaign, deleteCampaign } from '../features/campaigns/campaignSlice';

const CampaignItem = ({ campaign }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const onSubmit = async (e) => {
        e.preventDefault();

        const currentCampaign = campaign;

        await dispatch(setCampaign(currentCampaign));
        navigate('/campaign');
    };

    const clickLeaveCampaign = (e) => {
        e.preventDefault();

        const joinCode = campaign.campaign_link;

        dispatch(leaveCampaign(joinCode));
        navigate('/');
    };

    const clickDeleteCampaign = (e) => {
        e.preventDefault();

        const campaignId = campaign._id;

        dispatch(deleteCampaign(campaignId));
        navigate('/');
    };

    let campaignLinkVisibility;
    console.log(campaign.dungeon_master);
    console.log(user._id);
    if (user._id == campaign.dungeon_master[0]) {
        campaignLinkVisibility = <div>Campaign Link: {campaign.campaign_link}</div>;
    } else {
        campaignLinkVisibility = <p></p>;
    }

    let leaveLinkVisibility;
    if (user._id == campaign.dungeon_master[0]) {
        leaveLinkVisibility = <p></p>;
    } else {
        leaveLinkVisibility = (
            <button onClick={clickLeaveCampaign} type='button' className='btn btn-primary'>
                Leave Campaign
            </button>
        );
    }

    let campaignDeleteVisibility;
    console.log(campaign.dungeon_master);
    console.log(user._id);
    if (user._id == campaign.dungeon_master[0]) {
        campaignDeleteVisibility = (
            <button onClick={clickDeleteCampaign} type='submit' className='btn btn-primary btn-danger'>
                Delete Campaign
            </button>
        );
    } else {
        campaignDeleteVisibility = <p></p>;
    }

    return (
        <Accordion>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>{campaign.campaign_name}</Accordion.Header>
                <Accordion.Body>
                    <form onSubmit={onSubmit}>
                        <div>
                            <button type='submit' className='btn btn-primary'>
                                Go To Campaign
                            </button>
                        </div>
                        <div>{campaign.campaign_description}</div>
                        {campaignLinkVisibility}
                        {leaveLinkVisibility}
                        {campaignDeleteVisibility}
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default CampaignItem;
