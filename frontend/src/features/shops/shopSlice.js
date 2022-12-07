import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shopService from './shopService';

// Create initial state for campaign creation
const initialState = {
    shops: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Creating a shop
export const createShop = createAsyncThunk('shop/createshop', async (shopData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const currentCampaign = thunkAPI.getState().campaign.campaignInUse;

        return await shopService.createShop(shopData, token, currentCampaign);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// // Get campaigns from DB
// export const getCampaign = createAsyncThunk('campaign/getcampaign', async (_, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token;
//         return await campaignService.getCampaign(token);
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// });

// // Set current campaign
// export const setCampaign = createAsyncThunk('campaign/setcampaign', async (campaign, thunkAPI) => {
//     const currentCampaign = campaign;
//     return currentCampaign;
// });

// Creating shop slice
export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createShop.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createShop.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.shops.push(action.payload);
            })
            .addCase(createShop.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
        // .addCase(getCampaign.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(getCampaign.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = true;
        //     state.campaigns = action.payload;
        // })
        // .addCase(getCampaign.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.message = action.payload;
        // })
        // .addCase(setCampaign.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = true;
        //     state.campaignInUse = action.payload;
        // })
        // .addCase(setCampaign.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(setCampaign.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.campaignInUse = action.payload;
        // });
    },
});

export const { reset } = shopSlice.actions;
export default shopSlice.reducer;
