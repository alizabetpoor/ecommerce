"use client";

import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import Product from "@/components/Product";
import Pagination from "@/components/Pagination";
import Filter from "@/components/Filter";
import { useGetProductsQuery } from "@/redux/services/products";
import { CategorySelectType } from "@/interface/Component/Filter";

export default function ProductPageList() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [rateValue, setRateValue] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<CategorySelectType>({
    value: "all",
    label: "همه",
  });

  const filteredProductsByCategory = products?.filter((product) =>
    selectedCategory.value != "all"
      ? product.category === selectedCategory.value
      : products
  );

  const filteredProductsByRate = filteredProductsByCategory?.filter(
    (product) => product.rating.rate >= rateValue
  );

  const filteredProducts = filteredProductsByRate?.filter((product) =>
    searchInputValue != ""
      ? product.title.toLowerCase().includes(searchInputValue.toLowerCase())
      : filteredProductsByRate
  );

  const productPerPage: number = 6;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategorySelect = (selected: CategorySelectType) => {
    setSelectedCategory(selected);
    setCurrentPage(1);
  };

  const handleRating = (rate: number) => {
    setRateValue(rate);
  };

  const searchInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
    setCurrentPage(1);
  };

  const debouncedSearchInputHandler = useMemo(
    () => debounce(searchInputHandler, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearchInputHandler.cancel();
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Filter
        debouncedSearchInputHandler={debouncedSearchInputHandler}
        handleCategorySelect={handleCategorySelect}
        handleRating={handleRating}
      />
      <div className="w-full lg:w-10/12">
        {filteredProducts?.length === 0 ? (
          <div className="bg-gray-300 text-red-600 w-full flex justify-center items-center rounded-lg h-16">
            کالا با مشخصات مورد نظر پیدا نشد
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full bg-white rounded-lg text-gray-600 divide-y divide-y-reverse`}
          >
            {currentProducts?.map((product: ProductType) => {
              return (
                <Fragment key={product.id}>
                  <Product productDetail={product} />
                </Fragment>
              );
            })}
          </div>
        )}
        {filteredProducts?.length !== 0 ? (
          <Pagination
            productPerPage={productPerPage}
            totalProducts={filteredProducts?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </>
  );
}
