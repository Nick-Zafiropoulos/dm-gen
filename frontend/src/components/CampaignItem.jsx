import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCampaign, reset } from '../features/campaigns/campaignSlice';

function CampaignItem({ campaign }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const currentCampaign = campaign._id;
        console.log(currentCampaign);
        dispatch(setCampaign(currentCampaign));
    };

    return (
        <Accordion>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>{campaign.campaign_name}</Accordion.Header>
                <Accordion.Body>
                    <form onSubmit={onSubmit}>
                        <div>
                            {/* <Link to='/campaigns/cid' className='btn btn-primary mb-3'>
                                Go To Campaign
                            </Link> */}
                            <button type='submit' className='btn btn-primary'>
                                Go To Campaign
                            </button>
                        </div>
                        <div>{campaign.campaign_description}</div>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

        // <div className='accordion' id='accordionExample'>
        //     <div className='accordion-item'>
        //         <h2 className='accordion-header' id='headingOne'>
        //             <button
        //                 className='accordion-button'
        //                 type='button'
        //                 data-bs-toggle='collapse'
        //                 data-bs-target='#collapseOne'
        //                 aria-expanded='true'
        //                 aria-controls='collapseOne'
        //             >
        //                 {campaign.campaign_name}
        //             </button>
        //         </h2>
        //         <div
        //             id='collapseOne'
        //             className='accordion-collapse collapse show'
        //             aria-labelledby='headingOne'
        //             data-bs-parent='#accordionExample'
        //         >
        //             <div className='accordion-body'>
        //                 <div>
        //                     <a className='btn btn-primary mb-3' href='/campaigns/cid' role='button'>
        //                         Go To Campaign
        //                     </a>
        //                 </div>
        //                 <strong>{campaign.campaign_description}</strong>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default CampaignItem;
