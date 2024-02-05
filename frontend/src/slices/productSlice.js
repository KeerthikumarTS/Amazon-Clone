import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        product: {},
        error: null
    },
    reducers: {
        productRequest: (state, action) => {
            state.loading = true;
        },
        productSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
            state.error = null;

        },
        productFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { productRequest, productSuccess, productFail } = productSlice.actions;
export default productSlice.reducer;