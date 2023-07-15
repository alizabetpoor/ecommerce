"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MinusSquare, AddSquare, Trash } from "iconsax-react";
import Link from "next/link";
import {
  increaseCount,
  decreaseCount,
  deleteProductFromCart,
} from "@/redux/features/cartSlice";
import { ProductType } from "@/interface/Component/ProductList";

export default function CartPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const cartProducts: ProductType[] = useSelector(
    (state) => state.cart.products
  );

  useEffect(() => {
    setProducts(cartProducts);
  }, [cartProducts]);

  return (
    <div className="w-10/12 flex flex-col">
      {products.length !== 0 ? (
        <>
          <div className="flex flex-col divide-y-2 p-4 bg-white">
            {products.map((productDetail) => {
              return (
                <div key={productDetail.id} className="flex gap-x-4 py-4">
                  <div className="w-3/12 border border-gray-300 rounded-lg px-[80px] py-4 bg-white">
                    <div className="w-full h-[200px] relative self-center">
                      <Image
                        src={productDetail.image}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                        alt={productDetail.title}
                        title={productDetail.title}
                      />
                    </div>
                  </div>

                  <div className="w-9/12 flex flex-col justify-between">
                    <span>{productDetail.title}</span>
                    <div className="flex justify-between">
                      <span>
                        قیمت:{productDetail.price * productDetail.count} تومان
                      </span>
                      <div className="flex items-center gap-x-2">
                        <AddSquare
                          onClick={() =>
                            dispatch(increaseCount(productDetail.id))
                          }
                          color="#16a34a"
                          className="cursor-pointer"
                          width={28}
                          height={28}
                        />
                        <span>تعداد:{productDetail.count}</span>
                        {productDetail.count !== 1 ? (
                          <>
                            <MinusSquare
                              onClick={() =>
                                dispatch(decreaseCount(productDetail.id))
                              }
                              color="#dc2626"
                              className="cursor-pointer"
                              width={28}
                              height={28}
                            />
                            <Trash
                              onClick={() =>
                                dispatch(
                                  deleteProductFromCart(productDetail.id)
                                )
                              }
                              color="#dc2626"
                              className="cursor-pointer"
                              width={28}
                              height={28}
                            />
                          </>
                        ) : (
                          <Trash
                            onClick={() =>
                              dispatch(deleteProductFromCart(productDetail.id))
                            }
                            color="#dc2626"
                            className="cursor-pointer"
                            width={28}
                            height={28}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href="/checkout"
            className="bg-green-600 text-white px-6 py-2 my-4 rounded-lg self-end"
          >
            تکمیل خرید
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center p-4 h-12 bg-white">
          سبد خرید شما خالی است.
        </div>
      )}
    </div>
  );
}
