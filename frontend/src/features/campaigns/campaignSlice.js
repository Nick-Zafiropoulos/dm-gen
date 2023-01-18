import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campaignService from './campaignService';

// Get current campaign from localStorage
const campaignFromLocalStorage = JSON.parse(localStorage.getItem('localStorageCampaign'));

// Create initial state for campaign creation
const initialState = {
    campaigns: [],
    campaignInUse: campaignFromLocalStorage ? campaignFromLocalStorage : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Creating a campaign
export const createCampaign = createAsyncThunk('campaign/createcampaign', async (campaignData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await campaignService.createCampaign(campaignData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get campaigns from DB
export const getCampaign = createAsyncThunk('campaign/getcampaign', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await campaignService.getCampaign(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Set current campaign
export const setCampaign = createAsyncThunk('campaign/setcampaign', async (campaign, thunkAPI) => {
    const currentCampaign = campaign;

    localStorage.setItem('localStorageCampaign', JSON.stringify(currentCampaign));
    return currentCampaign;
});

// Creating campaign slice
export const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCampaign.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCampaign.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.campaigns.push(action.payload);
            })
            .addCase(createCampaign.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCampaign.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCampaign.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.campaigns = action.payload;
            })
            .addCase(getCampaign.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(setCampaign.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.campaignInUse = action.payload;
            })
            .addCase(setCampaign.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setCampaign.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.campaignInUse = action.payload;
            });
    },
});

export const { reset } = campaignSlice.actions;
export default campaignSlice.reducer;
