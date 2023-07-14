"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import makeTextShorter from "@/utils/makeTextShorter";
import { ProductProps } from "@/interface/Component/Product";

export default function Product({ productDetail }: ProductProps) {
  const dispatch = useDispatch();

  return (
    <div
      className={`flex flex-col items-start border-b justify-between p-4 border-x`}
    >
      <Link
        href={`/product/${productDetail.id}`}
        className="w-3/6 h-[200px] relative self-center"
      >
        <Image
          src={productDetail.image}
          fill={true}
          alt={productDetail.title}
          title={productDetail.title}
        />
      </Link>
      <Link
        href={`/product/${productDetail.id}`}
        dir="ltr"
        title={productDetail.title}
        className="mt-8 h-16 font-semibold self-end"
      >
        {makeTextShorter(productDetail.title, 70)}
      </Link>
      <div className="flex justify-between items-center mt-4 self-stretch">
        <span className="text text-gray-800">
          قیمت:{productDetail.price} تومان
        </span>
        <button
          onClick={() => dispatch(addToCart(productDetail))}
          className="rounded-lg bg-green-600 border border-green-600 text-gray-50 px-6 py-2"
        >
          افزودن به سبد
        </button>
      </div>
    </div>
  );
}
