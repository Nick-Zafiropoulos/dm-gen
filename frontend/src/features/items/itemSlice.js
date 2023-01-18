// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import itemService from './itemService';

// // Create initial state for item creation
// const initialState = {
//     items: [],
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: '',
// };

// // Get items from DB
// export const getItem = createAsyncThunk('item/getitem', async (_, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token;
//         const itemList = thunkAPI.getState().shop.shopInUse.shop_list;

//         return await itemService.getItem(itemList, token);
//     } catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// });

// // Creating item slice
// export const itemSlice = createSlice({
//     name: 'item',
//     initialState,
//     reducers: {
//         reset: (state) => initialState,
//     },
//     extraReducers: (builder) => {
//         builder

//             .addCase(getItem.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getItem.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.isSuccess = true;
//                 state.items = action.payload;
//             })
//             .addCase(getItem.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = true;
//                 state.message = action.payload;
//             });
//     },
// });

// export const { reset } = itemSlice.actions;
// export default itemSlice.reducer;
