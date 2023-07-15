"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";

export default function AddToCart({ productDetail }) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center mt-6 self-stretch">
      <span className="text text-gray-800 text-sm sm:text-base">
        قیمت:{productDetail.price} تومان
      </span>
      <button
        onClick={() => dispatch(addToCart(productDetail))}
        className="rounded-lg text-sm sm:text-base bg-green-600 border border-green-600 text-gray-50 px-2 lg:px-6 py-2"
      >
        افزودن به سبد
      </button>
    </div>
  );
}
