import axios from 'axios';

const API_URL = 'http://localhost:5000/api/campaigns/';

// Create a campaign
const createCampaign = async (campaignData, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, campaignData, tokenHeader);

    return response.data;
};

// Get a campaign
const getCampaign = async (token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, tokenHeader);

    return response.data;
};

// Update a campaign
const updateCampaign = async (joinCode, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL, { code: `${joinCode}` }, tokenHeader);

    return response.data;
};

const campaignService = {
    createCampaign,
    getCampaign,
    updateCampaign,
};

export default campaignService;
