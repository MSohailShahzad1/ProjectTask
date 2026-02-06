import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem } from "@/types/cart"
import type { Product } from "@/types/product"

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const item = state.items.find(
                (i) => i.id === action.payload.id
            )

            if (item) {
                item.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(
                (i) => i.id !== action.payload
            )
        },
    },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
