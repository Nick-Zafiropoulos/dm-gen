import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import campaignReducer from '../features/campaigns/campaignSlice';
import shopReducer from '../features/shops/shopSlice';
import npcReducer from '../features/npcs/npcSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        campaign: campaignReducer,
        shop: shopReducer,
        npc: npcReducer,
    },
});
