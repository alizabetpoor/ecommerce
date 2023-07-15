import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "@/interface/Component/ProductList";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => "/products",
    }),
    getProductDetails: builder.query<ProductType, string | undefined>({
      query: (productId) => `/products/${productId}`,
    }),
    getProductCategorys: builder.query<string[], string | undefined>({
      query: () => `/products/categories`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductCategorysQuery,
} = productsApi;
