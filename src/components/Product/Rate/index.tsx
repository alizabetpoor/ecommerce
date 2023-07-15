"use client";

import { Rating } from "react-simple-star-rating";
import { RateProps } from "@/interface/Component/Product/Rate";

export default function Rate({ rate }: RateProps) {
  return (
    <Rating
      size={20}
      allowFraction
      readonly
      initialValue={rate}
      emptyStyle={{ display: "flex" }}
      fillStyle={{ display: "-webkit-inline-box" }}
      style={{ direction: "ltr" }}
      iconsCount={5}
    />
  );
}
