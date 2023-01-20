import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import npcService from './npcService';

const npcFromLocalStorage = JSON.parse(localStorage.getItem('localStorageNPC'));

// Create initial state for campaign creation
const initialState = {
    npcs: [],
    npcInUse: npcFromLocalStorage ? npcFromLocalStorage : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Creating a npc
export const createNPC = createAsyncThunk('npc/createnpc', async (npcData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const currentCampaign = thunkAPI.getState().campaign.campaignInUse;

        return await npcService.createNPC(npcData, token, currentCampaign);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get npcs from DB
export const getNPC = createAsyncThunk('npc/getnpc', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const currentCampaign = thunkAPI.getState().campaign.campaignInUse;

        return await npcService.getNPC(currentCampaign, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Set current npc
export const setNPC = createAsyncThunk('npc/setnpc', async (npc, thunkAPI) => {
    const currentNPC = npc;

    localStorage.setItem('localStorageNPC', JSON.stringify(currentNPC));
    return currentNPC;
});

// Creating npc slice
export const npcSlice = createSlice({
    name: 'npc',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNPC.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNPC.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.npcs.push(action.payload);
            })
            .addCase(createNPC.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getNPC.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNPC.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.npcs = action.payload;
            })
            .addCase(getNPC.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(setNPC.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.npcInUse = action.payload;
            })
            .addCase(setNPC.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setNPC.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.npcInUse = action.payload;
            });
    },
});

export const { reset } = npcSlice.actions;
export default npcSlice.reducer;
