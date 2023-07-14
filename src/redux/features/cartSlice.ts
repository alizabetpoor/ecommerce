import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  ProductListType,
  ProductType,
} from "@/interface/Component/ProductList";

const products =
  typeof localStorage !== "undefined" ? localStorage.getItem("products") : null;

const initialState: ProductListType = {
  products: products ? JSON.parse(products) : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const newProduct = action.payload;
      state.products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
