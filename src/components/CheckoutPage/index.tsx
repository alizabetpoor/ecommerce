"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NeshanMap from "react-neshan-map-leaflet";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "@/components/CheckoutForm";
import { buy } from "@/redux/features/cartSlice";
import citiesJson from "@/static/iran_cities.json";

export default function CheckoutPage() {
  const [addressCordinate, setAddressCordinate] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapValidation, setMapValidation] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const productCount = useSelector((state) => state.cart.products.length);
  const onSubmitHandler = (data: object) => {
    if (addressCordinate !== null) {
      dispatch(buy());
      router.push("/success_buy");
    }
    setMapValidation(true);
  };

  useEffect(() => {
    if (productCount === 0 || !productCount) router.push("/products");
  }, []);

  return (
    <div className="bg-white w-10/12 flex items-center flex-col gap-y-[50px] py-6">
      <CheckoutForm onSubmitHandler={onSubmitHandler} />
      <div className="z-0 w-full lg:w-[800px] flex flex-col items-center lg:p-0 sm:p-8 p-2">
        <span className="mb-4 inline-block">
          آدرس تحویل را روی نقشه مشخص کنید:
        </span>
        {mapValidation ? (
          <p className="text-red-600 text-sm">
            برای تکمیل خرید باید آدرس در نقشه مشخص شده باشد.
          </p>
        ) : null}

        <NeshanMap
          options={{
            key: "web.1ef1fe847de74539b66a04f1b7e4c389",
            center: [35.699739, 51.338097],
            zoom: 9,
          }}
          style={{ width: "100%" }}
          onInit={(L, myMap) => {
            let marker = L.marker([0, 0])
              .addTo(myMap)
              .bindPopup("آدرس تحویل بار");
            myMap.on("click", function (e) {
              marker.setLatLng(e.latlng);
              setAddressCordinate(e.latlng);
              console.log(e.latlng);
            });
          }}
        />
      </div>
    </div>
  );
}
