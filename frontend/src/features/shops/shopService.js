import axios from 'axios';

const API_URL = 'http://localhost:5000/api/shops/';
const ITEM_API_URL = 'http://localhost:5000/api/items/';

// Create a shop
const createShop = async (shopData, token, currentCampaign) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, { shopData, currentCampaign }, tokenHeader);

    return response.data;
};

// Get a shop
const getShop = async (currentCampaign, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${API_URL}?currentCampaign=${currentCampaign}`, tokenHeader);
    return response.data;
};

const shopService = {
    createShop,
    getShop,
};

export default shopService;
// , { params: { currentCampaign } }
