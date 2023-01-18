import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const ShopList = ({ item }) => {
    return (
        <Accordion>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>{item.item_name}</Accordion.Header>
                <Accordion.Body>
                    <div>{item.item_desc}</div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default ShopList;
