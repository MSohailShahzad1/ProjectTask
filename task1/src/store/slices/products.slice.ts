import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Product } from "@/types/product"

interface ProductsState {
    items: Product[]
    loading: boolean
}

const initialState: ProductsState = {
    items: [],
    loading: false,
}

export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async () => {
        const res = await fetch(
            "https://dummyjson.com/products?limit=1000"
        )
        const data = await res.json()
        return data.products as Product[]
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = false
            })
    },
})

export default productsSlice.reducer
