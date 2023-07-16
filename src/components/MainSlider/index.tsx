"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css";

export default function MainSlider() {
  return (
    <div className="w-full sm:w-4/5 sm:mt-8">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop
        autoplay={{
          delay: 4000,
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img
            src="/images/slide1.webp"
            className="h-full w-full"
            alt="slide1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/slide2.webp"
            className="h-full w-full"
            alt="slide2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/slide3.webp"
            className="h-full w-full"
            alt="slide3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/slide4.webp"
            className="h-full w-full"
            alt="slide4"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
