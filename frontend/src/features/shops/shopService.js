import axios from 'axios';

const API_URL = '/api/shops/';
const API_URL_ONESHOP = '/api/shops/oneshop';
const API_URL_REMOVEITEM = '/api/shops/removeitem';
const API_URL_ADDITEM = '/api/shops/additem';

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

// Get shops
const getShop = async (currentCampaign, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${API_URL}?currentCampaign=${currentCampaign}`, tokenHeader);
    return response.data;
};

// Get a shop
const getOneShop = async (shopData, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${API_URL_ONESHOP}?shopData=${shopData}`, tokenHeader);
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

// Add item to shop
const addItem = async (newItemAndShop, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL_ADDITEM, { newItemAndShop }, tokenHeader);

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
    getOneShop,
    removeItem,
    addItem,
    deleteShop,
};

export default shopService;
