"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import makeTextShorter from "@/utils/makeTextShorter";
import { ProductProps } from "@/interface/Component/Product";
import Rate from "@/components/Product/Rate";
import { AddToCart } from "@/components";

export default function Product({ productDetail }: ProductProps) {
  const dispatch = useDispatch();

  return (
    <div
      className={`flex flex-col items-start border-b justify-between p-4 border-x`}
    >
      <Rate rate={productDetail.rating.rate} />
      <Link
        href={`/products/${productDetail.id}`}
        className="w-3/6 h-[200px] relative self-center"
      >
        <Image
          src={productDetail.image}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          alt={productDetail.title}
          title={productDetail.title}
        />
      </Link>
      <Link
        href={`/products/${productDetail.id}`}
        dir="ltr"
        title={productDetail.title}
        className="mt-8 h-16 font-semibold self-end"
      >
        {makeTextShorter(productDetail.title, 70)}
      </Link>
      <AddToCart productDetail={productDetail} />
    </div>
  );
}
