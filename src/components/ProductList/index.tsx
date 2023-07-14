import Image from "next/image";
import { Fragment } from "react";
import Product from "@/components/Product";
import makeTextShorter from "@/utils/makeTextShorter";
import {
  ProductListProps,
  ProductListType,
  ProductType,
} from "@/interface/Component/ProductList";

export default async function ProductList({
  numberOfCols = 3,
}: ProductListProps) {
  const products: ProductListType = await getData();
  return (
    <div
      className={`grid grid-cols-${numberOfCols} w-full bg-white rounded-lg text-gray-600 divide-y divide-y-reverse`}
    >
      {products.map((product: ProductType, index: number) => {
        return (
          <Fragment key={product.id}>
            <Product
              productDetail={product}
              index={index}
              productsLength={products.length}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

async function getData() {
  const res = await fetch("https://fakestoreapi.com/products");

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}