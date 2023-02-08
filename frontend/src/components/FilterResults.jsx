import React from 'react';
// import Accordion from 'react-bootstrap/Accordion';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, shadows, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getShop, reset, setShop } from '../features/shops/shopSlice';

const FilterResults = ({ shop }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const onSubmit = async (e) => {
        e.preventDefault();

        const currentShop = shop;

        await dispatch(setShop(currentShop));
        navigate('/shop');
    };

    useEffect(() => {
        // dispatch(getShop());
    }, [user, navigate, isError, message, dispatch]);

    return (
        <Accordion sx={{ boxShadow: 3, width: { xs: '100%', lg: '100%' } }}>
            <AccordionSummary
                sx={{ color: 'white' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
            >
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textShadow: '2px 2px #262626' }}>
                    {shop.shop_name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <form onSubmit={onSubmit}>
                        <div></div>
                        <p>Owner: {shop.shop_owner}</p>
                        <p>Location: {shop.shop_location}</p>
                        <Button type='submit' variant='contained' color='secondary'>
                            Enter Shop
                        </Button>
                    </form>
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default FilterResults;
