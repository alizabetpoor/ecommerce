import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import Rate from "@/components/Product/Rate";
import { ProductType } from "@/interface/Component/ProductList";

export default async function Page({ params }: { params: { id: string } }) {
  const productDetail: ProductType = await getData(params.id);
  return (
    <div className="my-10 flex justify-center">
      <div className="w-11/12 sm:w-10/12 flex bg-white rounded-lg lg:flex-row flex-col">
        <div className="w-full lg:w-4/12 lg:border-l flex flex-col items-end py-8 px-4 xl:p-8">
          <Rate rate={productDetail.rating.rate} />

          <div className="w-8/12 h-[260px] sm:h-[500px] lg:h-[300px] relative mt-4 self-center">
            <Image
              src={productDetail.image}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              alt={productDetail.title}
              title={productDetail.title}
            />
          </div>
        </div>

        <div className="w-full lg:w-8/12 py-8 px-4 divide-y flex flex-col justify-between gap-y-4 text-sm sm:text-base">
          <div className="flex justify-between item gap-x-4">
            <span>{productDetail.title}</span>
            <span className="text-gray-500">
              امتیاز:{productDetail.rating.rate}
            </span>
          </div>
          <div className="flex flex-col pt-6">
            <span>توضیح محصول:</span>
            <span dir="ltr" className="text-gray-500">
              {productDetail.description}
            </span>
            <div className="mt-4">
              <span>دسته بندی:</span>
              <span className="text-gray-500">{productDetail.category}</span>
            </div>
          </div>
          <div className="w-full">
            <AddToCart productDetail={productDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}

async function getData(productId) {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
