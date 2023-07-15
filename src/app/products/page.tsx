import ProductPageList from "@/components/ProductPageList";

export default function page() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="flex items-stretch lg:items-start flex-col lg:flex-row w-11/12 xl:w-10/12 gap-4">
        <ProductPageList />
      </div>
    </div>
  );
}
