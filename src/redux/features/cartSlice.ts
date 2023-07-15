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
      if (state.products.length !== 0) {
        const indexProduct = state.products.findIndex(
          (product) => product.id === newProduct.id
        );
        if (indexProduct === -1) {
          state.products.push({ ...newProduct, count: 1 });
        } else {
          state.products[indexProduct].count =
            state.products[indexProduct].count + 1;
        }
      } else {
        state.products.push({ ...newProduct, count: 1 });
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    increaseCount: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const indexProduct = state.products.findIndex(
        (product) => product.id === productId
      );
      state.products[indexProduct].count =
        state.products[indexProduct].count + 1;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    decreaseCount: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const indexProduct = state.products.findIndex(
        (product) => product.id === productId
      );
      if (state.products[indexProduct].count === 1) {
        const newProducts = state.products.filter(
          (product) => product.id !== productId
        );
        state.products = newProducts;
      } else {
        state.products[indexProduct].count =
          state.products[indexProduct].count - 1;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    deleteProductFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      const newProducts = state.products.filter(
        (product) => product.id !== productId
      );
      state.products = newProducts;

      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

export const {
  addToCart,
  increaseCount,
  decreaseCount,
  deleteProductFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
