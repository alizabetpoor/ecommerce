"use client";

import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useForm, useController } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import citiesJson from "@/static/iran_cities.json";
import { SelectType } from "@/interface/Component/CheckoutForm";

const schema = yup.object({
  state: yup.string().required("لطفاً استانی را انتخاب کنید"),
  city: yup.string().required("لطفا شهری را انتخاب کنید"),
});

export default function CheckoutForm({ onSubmitHandler }) {
  const [state, setState] = useState<string>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { field: stateField } = useController({ name: "state", control });
  const {
    value: stateValue,
    onChange: stateOnChange,
    ...restStateField
  } = stateField;

  const { field: cityField } = useController({ name: "city", control });
  const {
    value: cityValue,
    onChange: cityOnChange,
    ...restCityField
  } = cityField;

  const stateSelectOptions = useMemo(() => {
    const selectOptions = citiesJson.map((state) => {
      return { value: state.name, label: state.name };
    });
    return selectOptions;
  }, []);

  const citySelectOptions = useMemo(() => {
    if (!state) return [];
    const selectedState = citiesJson.find((State) => State.name == state);
    const selectOptions = selectedState?.cities.map((city) => {
      return { value: city.name, label: city.name };
    });
    cityOnChange("");
    return selectOptions;
  }, [state]);

  const handleStateSelect = (selected: SelectType) => {
    if (selected) {
      setState(selected.value);
    } else {
      setState(null);
    }
    stateOnChange(selected ? selected.value : selected);
  };

  const handleCitySelect = (selected: SelectType) => {
    cityOnChange(selected ? selected.value : selected);
  };

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="flex px-6 md:px-0 items-stretch md:justify-center md:items-start gap-y-4 gap-x-4 z-10 flex-col md:flex-row">
        <div>
          <Select
            options={stateSelectOptions}
            onChange={(selected) => handleStateSelect(selected)}
            isSearchable={true}
            className="w-full md:w-[180px]"
            value={
              stateValue
                ? stateSelectOptions.find(
                    (option) => option.value === stateValue
                  )
                : stateValue
            }
            placeholder="استان"
            {...restStateField}
          />
          <p className="text-red-600 text-sm">{errors.state?.message}</p>
        </div>
        <div>
          <Select
            options={citySelectOptions}
            onChange={(selected) => handleCitySelect(selected)}
            isSearchable={true}
            className="w-full md:w-[180px]"
            isClearable={true}
            value={
              cityValue
                ? citySelectOptions.find((option) => option.value === cityValue)
                : cityValue
            }
            placeholder="شهر"
            {...restCityField}
          />
          <p className="text-red-600 text-sm">{errors.city?.message}</p>
        </div>
        <button className="bg-green-600 text-white rounded-lg py-2 px-4">
          پرداخت
        </button>
      </div>
    </form>
  );
}
