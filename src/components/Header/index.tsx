"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ShoppingCart, User } from "iconsax-react";
import logo from "../../../public/images/ecommerce_icon.png";

export default function Header() {
  const [countOfProducts, setCountOfProducts] = useState<number>(0);
  const cartProducts = useSelector((state) => state.cart.products);
  const initialValue = 0;
  useEffect(() => {
    const cartProductLength = cartProducts.reduce(
      (total, currentProduct) => total + currentProduct.count,
      initialValue
    );
    setCountOfProducts(cartProductLength);
  }, [cartProducts]);

  return (
    <nav className="h-20 py-[10px] px-6 bg-gray-800 w-full flex justify-between">
      <div className="flex gap-x-4 items-center">
        <Link href="/">
          <Image src={logo} width={50} height={50} alt="ecommerce logo" />
        </Link>
        <Link
          href="/products"
          className="text-gray-50 text-sm sm:text-xl bg-gray-600 px-4 rounded-lg py-2"
        >
          محصولات
        </Link>
      </div>
      <div className="flex gap-x-2 items-center">
        <>
          <Link
            href="/login"
            className="border-green-600 border p-2 rounded block sm:hidden"
          >
            <User color="#16a34a" width={28} height={28} />
          </Link>

          <Link
            href="/login"
            className="hidden py-2 bg-gray-600 text-gray-50 rounded px-8 sm:block"
          >
            ورود
          </Link>
        </>

        <Link
          href="/cart"
          className="border-gray-400 border p-2 rounded relative"
        >
          <ShoppingCart color="#F9FAFB" width={28} height={28} />
          <span className="absolute text-[10px] -top-3 -left-3 bg-green-700 text-green-50 rounded-full w-5 h-5 flex justify-center items-center">
            {countOfProducts}
          </span>
        </Link>
      </div>
    </nav>
  );
}
