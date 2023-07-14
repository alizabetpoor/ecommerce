import { MainSlider, ProductList } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start">
      <MainSlider />
      <div className="w-4/6 flex mt-8 mb-8">
        <ProductList />
      </div>
    </div>
  );
}
