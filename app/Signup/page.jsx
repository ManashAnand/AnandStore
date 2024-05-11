"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const SignUp = () => {
  const router = useRouter();

  const schema = z
    .object({
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must be at most 50 characters long" })
        .nonempty({ message: "Name is required" })
        .optional(),
      email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .nonempty({ message: "Email is required" })
        .optional(),
      phone: z
        .string()
        .regex(/^\d{10}$/, {
          message: "Please enter a valid 10-digit phone number",
        })
        .nonempty({ message: "Phone number is required" })
        .optional(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" })
        .nonempty({ message: "Password is required" })
        .optional(),
    })
    .or(
      z.object({
        name: z
          .string()
          .min(2, { message: "Name must be at least 2 characters long" })
          .max(50, { message: "Name must be at most 50 characters long" })
          .nonempty({ message: "Name is required" }),
        email: z
          .string()
          .email({ message: "Please enter a valid email address" })
          .nonempty({ message: "Email is required" }),
        phone: z
          .string()
          .regex(/^\d{9}$/, {
            message: "Please enter a valid 9-digit phone number",
          })
          .nonempty({ message: "Phone number is required" }),
        password: z
          .string()
          .min(8, { message: "Password must be at least 8 characters long" })
          .max(100, { message: "Password must be at most 100 characters long" })
          .nonempty({ message: "Password is required" }),
      })
    );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      schema.parse(formData);
      // Form is valid, submit the data or perform further actions
      console.log("Form data:", formData);
      const {name,email,phone,password} = formData;
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name, phone }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const response = await res.json();
        console.log(response)
        setFormErrors([...formErrors, response.message]);
      } else {
        router.refresh();
        router.push("/api/auth/signin");
      }
    } catch (error) {
      console.log(error)
      const err =  JSON.parse(error?.message) ;
      console.log(err);
      setFormErrors(err.map((err) => err.message));
     
    } finally {
      setLoading(false);
    }

  };
  // console.log(formErrors)
  return (
    <>
      <form
        className="max-w-sm mx-auto mt-10 p-10 rounded-md bg-light_prm border-2 border-dark_prm border-opacity-25 dark:bg-dark_prm"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your username"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Phone number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="123456789"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={loading}
        >
          Signup
        </button>
        {/* <p className="text-red-500 mt-5 ml-2">{errorMessage}</p> */}
        <div>
          <ul className="mt-4 list-disc">
            {formErrors?.map((item) => {
              return (
                <li className="text-red-400 text-dec" key={item}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </>
  );
};

export default SignUp;
