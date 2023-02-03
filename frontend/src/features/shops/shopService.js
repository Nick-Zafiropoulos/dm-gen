import axios from 'axios';

const API_URL = 'http://localhost:5000/api/shops/';
const API_URL_REMOVEITEM = 'http://localhost:5000/api/shops/removeitem';
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

// Remove item from shop
const removeItem = async (removedItemIdAndShop, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL_REMOVEITEM, { removedItemIdAndShop }, tokenHeader);

    return response.data;
};

// Delete a shop
const deleteShop = async (shopToDelete, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(`${API_URL}?shopToDelete=${shopToDelete}`, tokenHeader);
    return response.data;
};

const shopService = {
    createShop,
    getShop,
    removeItem,
    deleteShop,
};

export default shopService;
// , { params: { currentCampaign } }
