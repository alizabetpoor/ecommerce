import { MainSlider, ProductList } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start">
      <MainSlider />
      <div className="w-full px-4 sm:mx-0 sm:w-4/6 md:w-5/6 lg:w-4/6 flex mt-8 mb-8">
        <ProductList />
      </div>
    </div>
  );
}
