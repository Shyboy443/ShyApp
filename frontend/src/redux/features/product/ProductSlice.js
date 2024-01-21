import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './ProductService';
import { toast } from 'react-toastify';

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


// Create New Product
const createProduct = createAsyncThunk(
    "products/create",
    async (formData, thunkAPI) => {
        try {
            return await productService.createProduct(formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message)

        }
    }
)


const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CAL_STORE_VALUE(state, action) {
            console.log("store Value");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log(action.payload);
                state.products.push(action.payload)
                toast.success("Product added Succesfully")
            })
            .addCase(createProduct.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
    }
});

export const { CALC_STORE_VALUE } = ProductSlice.actions

export default ProductSlice.reducer