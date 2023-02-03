import axios from 'axios';

const API_URL = 'http://localhost:5000/api/campaigns/';
const API_URL_LEAVE = 'http://localhost:5000/api/campaigns/leave';

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

// Leave a campaign
const leaveCampaign = async (joinCode, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL_LEAVE, { code: `${joinCode}` }, tokenHeader);

    return response.data;
};

// Delete a npc
const deleteCampaign = async (campaignId, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(`${API_URL}?campaignId=${campaignId}`, tokenHeader);
    return response.data;
};

const campaignService = {
    createCampaign,
    getCampaign,
    updateCampaign,
    leaveCampaign,
    deleteCampaign,
};

export default campaignService;
