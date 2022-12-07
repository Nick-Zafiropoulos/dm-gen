import axios from 'axios';

const API_URL = 'http://localhost:5000/api/shops/';

// Create a campaign
const createShop = async (shopData, token, currentCampaign) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, { shopData, currentCampaign }, tokenHeader);

    return response.data;
};

// Get a campaign
// const getCampaign = async (token) => {
//     const tokenHeader = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     const response = await axios.get(API_URL, tokenHeader);

//     return response.data;
// };

const shopService = {
    createShop,
    // getCampaign,
};

export default shopService;
