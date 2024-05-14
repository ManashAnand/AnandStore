"use client";
import { useRouter } from "next/navigation";
import React from "react";


const BackButton = () => {
    const router = useRouter();
  return (
    <div className="">
      <button
        type="button"
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
};

export default BackButton;