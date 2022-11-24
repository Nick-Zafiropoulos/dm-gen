import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

function CampaignItem({ campaign }) {
    return (
        <Accordion>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>{campaign.campaign_name}</Accordion.Header>
                <Accordion.Body>
                    <div>
                        <Link to='/campaigns/cid' className='btn btn-primary mb-3'>
                            Go To Campaign
                        </Link>
                    </div>
                    <div>{campaign.campaign_description}</div>
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
