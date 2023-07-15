"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { Rating } from "react-simple-star-rating";
import { useGetProductCategorysQuery } from "@/redux/services/products";
import { FilterProps } from "@/interface/Component/Filter";

export default function Filter({
  handleCategorySelect,
  debouncedSearchInputHandler,
  handleRating,
}: FilterProps) {
  const {
    data: productsCategory,
    error,
    isLoading,
  } = useGetProductCategorysQuery();

  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    if (productsCategory) {
      const modifiedCategorys = productsCategory.map((category) => {
        return { value: category, label: category };
      });
      console.log(modifiedCategorys);
      modifiedCategorys.push({ value: "all", label: "همه" });
      setCategorys(modifiedCategorys);
    }
  }, [productsCategory]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full rounded-lg lg:w-2/12 bg-white p-2 flex flex-col items-stretch gap-y-4">
      <div>
        <div className="mb-2 text-sm">دسته بندی:</div>
        <Select
          options={categorys}
          onChange={(selected) => handleCategorySelect(selected)}
          defaultValue={{ value: "all", label: "همه" }}
          isSearchable={true}
        />
      </div>
      <div>
        <input
          className="w-full p-2 rounded-lg border border-gray-400 text-sm"
          type="text"
          placeholder="نام محصول"
          onChange={debouncedSearchInputHandler}
        />
      </div>
      <div className="text-sm">فیلتر براساس امتیاز:</div>
      <div className="self-center">
        <Rating
          onClick={handleRating}
          size={24}
          allowFraction
          emptyStyle={{ display: "flex" }}
          fillStyle={{ display: "-webkit-inline-box" }}
          style={{ direction: "ltr" }}
          iconsCount={5}
        />
      </div>
    </div>
  );
}
