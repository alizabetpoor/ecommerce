import Image from "next/legacy/image";
import Link from "next/link";
import { ShoppingCart } from "iconsax-react";
import logo from "../../../public/images/ecommerce_icon.png";

export default function Header() {
  return (
    <nav className="h-20 py-[10px] px-6 bg-gray-800 w-full flex justify-between">
      <div className="flex gap-x-4 items-center">
        <Image src={logo} width={50} height={50} />
        <span className="text-gray-50 sm:text-xl">فروشگاه</span>
      </div>
      <div className="flex gap-x-2 items-center">
        <Link
          href="/login"
          className="py-2 bg-gray-600 text-gray-50 rounded px-8"
        >
          ورود
        </Link>
        <Link
          href="shopping_cart"
          className="border-gray-400 border p-2 rounded relative"
        >
          <ShoppingCart color="#F9FAFB" width={28} height={28} />
          <span className="absolute text-[10px] -top-3 -left-3 bg-green-700 text-green-50 rounded-full w-5 h-5 flex justify-center items-center">
            17
          </span>
        </Link>
      </div>
    </nav>
  );
}
