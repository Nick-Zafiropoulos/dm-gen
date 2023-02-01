import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shopService from './shopService';

const shopFromLocalStorage = JSON.parse(localStorage.getItem('localStorageShop'));

// Create initial state for campaign creation
const initialState = {
    shops: [],
    shopInUse: shopFromLocalStorage ? shopFromLocalStorage : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Creating a shop
export const createShop = createAsyncThunk('shop/createshop', async (shopData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const currentCampaign = thunkAPI.getState().campaign.campaignInUse._id;

        return await shopService.createShop(shopData, token, currentCampaign);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get shops from DB
export const getShop = createAsyncThunk('shop/getshop', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const currentCampaign = thunkAPI.getState().campaign.campaignInUse._id;

        return await shopService.getShop(currentCampaign, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Set current shop
export const setShop = createAsyncThunk('shop/setshop', async (shop, thunkAPI) => {
    const currentShop = shop;

    localStorage.setItem('localStorageShop', JSON.stringify(currentShop));
    return currentShop;
});

// delete shop from DB
export const deleteShop = createAsyncThunk('shop/deleteshop', async (shopToDelete, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await shopService.deleteShop(shopToDelete, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

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
            })
            .addCase(getShop.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getShop.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.shops = action.payload;
            })
            .addCase(getShop.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(setShop.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.shopInUse = action.payload;
            })
            .addCase(setShop.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setShop.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.shopInUse = action.payload;
            });
    },
});

export const { reset } = shopSlice.actions;
export default shopSlice.reducer;
