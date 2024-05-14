"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import {
//   SelectValue,
//   SelectTrigger,
//   SelectItem,
//   SelectContent,
//   Select,
// } from "@/components/ui/select";

import Select from "react-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import BackButton from "@/components/Custom/BackButton";
import { Controller, useForm } from "react-hook-form";
import { uploadImage } from "@/lib/uploadImage";

const CreateProduct = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Cart");
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {},
  });

  // react-select options
  const categories = [
    { value: "Computer-Science", label: "Computer Science" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Mathematics", label: "Mathematics" },
  ];

  const sizes = [
    { value: "xs", label: "XS" },
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
  ];
  const colors = [
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
  ];
  const colors2 = [
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
  ];
  const size2 = [
    { value: "xs", label: "XS" },
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
  ];
  const tags = [
    { value: "new-arrival", label: "New Arrival" },
    { value: "sale", label: "Sale" },
    { value: "best-seller", label: "Best Seller" },
    { value: "limited-edition", label: "Limited Edition" },
    { value: "exclusive", label: "Exclusive" },
  ];

  const onSubmit = async (data) => {
    console.log(data);
    const image = data.image[0];
    // console.log(process.env.NEXT_PUBLIC_CLOUDINARY_USERNAME);

    const imageUrl = uploadImage(image);
    console.log(imageUrl);
  };

  return (
    <>
      <form className=" py-1 bg-blueGray-50" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6 bg-light_prm dark:bg-dark_prm">
          <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-6">
            <BackButton />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter product title"
                    {...register("title", { minLength: 2, required: true })}
                  />
                  {errors.title && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field and title length should be
                      greater than 2.
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    className="min-h-[120px]"
                    id="description"
                    placeholder="Enter product description"
                    {...register("description", {
                      minLength: 2,
                      required: true,
                    })}
                  />
                  {errors.description && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field and description length should be
                      greater than 2.
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="Enter product price"
                    type="number"
                    {...register("price", {
                      valueAsNumber: true,
                      min: 0,
                      required: true,
                    })}
                  />
                  {errors.price && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field and price should be greater than
                      0.
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        classNames={{
                          control: () => "border border-gray-300 rounded-md",
                        }}
                        {...field}
                        isSearchable
                        options={categories}
                      />
                    )}
                  />
                  {errors.categories && (
                    <p className="errorMsg">This is a required field.</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="Enter brand name"
                    {...register("brand", { required: true })}
                  />
                  {errors.brand && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input
                    id="inventory"
                    placeholder="Enter inventory count"
                    type="number"
                    {...register("inventory", { valueAsNumber: true, min: 0 })}
                  />
                  {errors.inventory && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field and minm should be greater than
                      0.
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="image-url">Image URL</Label>
                  <input
                    {...register("image")}
                    className="relative mt-4 m-0 block w-full min-w-0 flex-auto rounded border cursor-pointer border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-700 hover:file:text-white focus:border-blue focus:text-blue-700 focus:shadow-text-blue focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-blue"
                    type="file"
                    id="formFile"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    {...register("featured")}
                  />
                  <Label htmlFor="featured">Is Featured</Label>
                  {errors.featured && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field .
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available"
                    {...register("available")}
                  />
                  <Label htmlFor="available">Is Available</Label>
                  {errors.available && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field{" "}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ratings">Ratings</Label>
                  <Input
                    id="ratings"
                    placeholder="Enter ratings"
                    type="number"
                    {...register("ratings", {
                      valueAsNumber: true,
                      max: 5,
                      min: 0,
                    })}
                  />
                  {errors.ratings && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field and maxm lte 5 and gte 0{" "}
                    </p>
                  )}
                </div>
                {/* <div>
                  <Label htmlFor="reviews">Reviews</Label>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="review-user">User</Label>
                      <Input
                        id="review-user"
                        placeholder="Enter reviewer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="review-text">Review</Label>
                      <Textarea
                        className="min-h-[120px]"
                        id="review-text"
                        placeholder="Enter review text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="review-rating">Rating</Label>
                      <Input
                        id="review-rating"
                        placeholder="Enter review rating"
                        type="number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="review-created-at">Created At</Label>
                      <Input
                        id="review-created-at"
                        type="date"
                        {...register("Created")}
                      />
                    </div>
                  </div>
                </div> */}
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Controller
                    name="tags"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} isMulti isSearchable options={tags} />
                    )}
                  />
                  {errors.tags && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field.
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>

                  <Controller
                    name="size"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} isSearchable options={sizes} />
                    )}
                  />
                  {errors.sizes && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field.
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Controller
                    name="color"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} isSearchable options={colors} />
                    )}
                  />
                  {errors.colors && (
                    <p className="errorMsg text-red-500 mt-2">
                      This is a required field.
                    </p>
                  )}
                </div>
                {/* <div>
                  <Label>Variants</Label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="variant-size">Size</Label>
                        <Controller
                          name="size2"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select {...field} options={size2} />
                          )}
                        />
                        {errors.size2 && (
                          <p className="errorMsg">This is a required field.</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="variant-color">Color</Label>
                        <Controller
                          name="colors2"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select {...field} options={colors2} />
                          )}
                        />
                        {errors.colors2 && (
                          <p className="errorMsg">This is a required field.</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="variant-inventory">Inventory</Label>
                        <Input
                          id="variant-inventory"
                          placeholder="Enter inventory count"
                          type="number"
                        />
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Add Variant
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Product</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
