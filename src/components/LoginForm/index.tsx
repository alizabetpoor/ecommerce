"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("ایمیل خود را به درستی وارد کنید.")
    .required("وارد کردن ایمیل ضروری است."),
  password: yup
    .string()
    .min(8, "پسورد باید حداقل 8 کاراکتر باشد.")
    .max(32, "پسورد باید حداکثر 32 کاراکتر باشد")
    .required("وارد کردن پسورد ضروری است."),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const onSubmitHandler = (data) => {
    console.log({ data });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full mx-4 sm:mx-0 px-4 py-8 sm:w-[400px] sm:p-8 flex flex-col
       text-gray-600 items-stretch gap-y-[32px] bg-gray-300 rounded-xl"
    >
      <span className="text-2xl self-center">ورود</span>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="email">ایمیل</label>
        <input
          id="email"
          dir="ltr"
          className={`${
            errors.email ? "border-red-600" : "border-transparent"
          } py-2 px-2 border rounded-lg`}
          type="email"
          placeholder="ali@gmail.com"
          {...register("email")}
          required
        />
        <p className="text-red-600 text-sm">{errors.email?.message}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="password">رمزعبور</label>
        <input
          id="password"
          dir="ltr"
          className={`${
            errors.password ? "border-red-600" : "border-transparent"
          } py-2 px-2 border rounded-lg`}
          type="password"
          placeholder="test123@#"
          {...register("password")}
          required
        />
        <p className="text-red-600 text-sm">{errors.password?.message}</p>
      </div>
      <button
        type="submit"
        className="bg-green-600 transition-colors text-gray-50 rounded-lg py-2 mt-4 border
         hover:border-green-600 hover:bg-gray-50 hover:text-green-600"
      >
        ورود به حساب کاربری
      </button>
    </form>
  );
}
