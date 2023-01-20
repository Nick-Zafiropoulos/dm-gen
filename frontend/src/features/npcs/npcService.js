import axios from 'axios';

const API_URL = 'http://localhost:5000/api/npcs/';

// Create a npc
const createNPC = async (npcData, token, currentCampaign) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, { npcData, currentCampaign }, tokenHeader);

    return response.data;
};

// Get a npc
const getNPC = async (currentCampaign, token) => {
    const tokenHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${API_URL}?currentCampaign=${currentCampaign}`, tokenHeader);
    return response.data;
};

const npcService = {
    createNPC,
    getNPC,
};

export default npcService;
