"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/uploadImage";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import BackButton from "@/components/Custom/BackButton";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { categoryItems, sizes, taginitialState,colors } from "@/data";

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

  const [categorieValue, setCategorieValue] = useState("Electronics");
  const [sizeValue, setSizeValue] = useState("xs");
  const [colorValue, setColorValue] = useState("black");

  const handleCategorieChange = (value) => {
    setCategorieValue(value);
    setValue("category", value);
  };
  const handleSizeChange = (value) => {
    setSizeValue(value);
    setValue("size", value);
  };
  const handleColorChange = (value) => {
    setColorValue(value);
    setValue("color", value);
  };

  // react-select options

 


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


  const processInputData = (data) => {
    return {
      ...data,
      category: Array.from(data.category).join(', '), 
      size: Array.from(data.size).join(', '), 
      color: Array.from(data.color).join(', '), 
      tags: data.tags.split(',')
    };
  };

  const onSubmit = async (data) => {
    data = processInputData(data);
    console.log(data);
    // const image = data.image[0];

    // const imageUrl = uploadImage(image);
    // console.log(imageUrl);
    // if (imageUrl == false) {
    //   toast("Image doesn't upload , try again !!!");
    // } else {
    // }
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
                  <Label className="ml-2" htmlFor="title">
                    Title
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your title"
                    {...register("title", { minLength: 2, required: true })}
                  />

                  {errors.title && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required field and title length should be
                      greater than 2.
                    </p>
                  )}
                </div>
                <div>
                  <Label className="ml-2" htmlFor="description">
                    Description
                  </Label>
                  <Textarea
                    className=" bg-light_input_bg dark:bg-dark_input_bg"
                    id="description"
                    placeholder="Enter product description"
                    {...register("description", {
                      minLength: 2,
                      required: true,
                    })}
                  />
                  {errors.description && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required field and description length should be
                      greater than 2.
                    </p>
                  )}
                </div>

                <div>
                  <Label className="ml-2" htmlFor="price">
                    Price
                  </Label>
                  <Input
                    id="price"
                    placeholder="Enter product price"
                    type="number"
                    className="bg-light_input_bg dark:bg-dark_input_bg"
                    {...register("price", {
                      valueAsNumber: true,
                      min: 0,
                      required: true,
                    })}
                  />
                  {errors.price && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required field and price should be greater than
                      0.
                    </p>
                  )}
                </div>
                <div>
                  <Label className="ml-2 mt-2" >
                      category
                    </Label>
                  <Dropdown >
                    <DropdownTrigger>
                      <Button variant="shadow" className="capitalize max-w-md w-full">
                        {categorieValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      onSelectionChange={handleCategorieChange}
                      {...register("category",{required:true})}
                      htmlFor="category"
                      className=" w-full "
                    >
                      {categoryItems?.map((item) => {
                        return (
                          <DropdownItem key={item.value} value={item.value} 
                          >
                            {item.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  {errors.category && (
                      <p className=" text-red-500 mt-2 text-xs ml-2">
                        This is a required field
                      </p>
                    )}

                </div>
                <div>
                  <Label className="ml-2" htmlFor="brand">
                    Brand
                  </Label>
                  <Input
                    id="brand"
                    placeholder="Enter brand name"
                    className="bg-light_input_bg dark:bg-dark_input_bg"
                    {...register("brand", { required: true })}
                  />
                  {errors.brand && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required field
                    </p>
                  )}
                </div>
                <div>
                  <Label className="ml-2" htmlFor="inventory">
                    Inventory
                  </Label>
                  <Input
                    id="inventory"
                    placeholder="Enter inventory count"
                    type="number"
                    className="bg-light_input_bg dark:bg-dark_input_bg"
                    {...register("inventory", {
                      valueAsNumber: true,
                      min: 0,
                      required: true,
                    })}
                  />
                  {errors.inventory && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required field and minm should be greater than
                      0.
                    </p>
                  )}
                </div>
                <div>
                  <Label className="ml-2" htmlFor="image-url">
                    Image URL
                  </Label>
                  <input
                    {...register(
                      "image"
                      // ,{required:true}
                    )}
                    className="relative mt-4 m-0 block w-full min-w-0 flex-auto rounded border cursor-pointer border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-700 hover:file:text-white focus:border-blue focus:text-blue-700 focus:shadow-text-blue focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-blue"
                    type="file"
                    id="formFile"
                  />
                  {errors.image && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required image field .
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    {...register("isFeatured", {})}
                  />
                  <Label className="ml-2" htmlFor="isFeatured">
                    Is Featured
                  </Label>
                  {errors.isFeatured && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required field .
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    {...register("isAvailable")}
                  />
                  <Label className="ml-2" htmlFor="isAvailable">
                    Is Available
                  </Label>
                  {errors.isAvailable && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required field{" "}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="ml-2" htmlFor="ratings">
                    Ratings
                  </Label>
                  <Input
                    id="ratings"
                    placeholder="Enter ratings"
                    type="number"
                    className="bg-light_input_bg dark:bg-dark_input_bg"
                    {...register("ratings", {
                      valueAsNumber: true,
                      max: 5,
                      min: 0,
                      required: true,
                    })}
                  />
                  {errors.ratings && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required field and maxm lte 5 and gte 0{" "}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="ml-2" htmlFor="tags">
                    Tags
                  </Label>
                  {/* <SelectFancy {...register("tags")}/> */}
                  <div className="flex w-full max-w-md flex-col gap-2">
                    <Select
                      label="Selected Tags"
                      selectionMode="multiple"
                      placeholder="Select  Tags"
                      className="max-w-md"
                      {...register("tags", {
                        required: true,
                      })}
                    >
                      {taginitialState.map((tag) => (
                        <SelectItem key={tag.value} value={tag.value}>
                          {tag.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  {errors.tags && (
                    <p className=" text-red-500 mt-2 text-xs ml-2">
                      This is a required field.
                    </p>
                  )}
                </div>
                <div>
                  <Label className="ml-2 mt-2" >
                      Sizes
                    </Label>
                  <Dropdown >
                    <DropdownTrigger>
                      <Button variant="shadow" className="capitalize max-w-md w-full">
                        {sizeValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      onSelectionChange={handleSizeChange}
                      {...register("size",{required:true})}
                      htmlFor="size"
                      className=" w-full "
                    >
                      {sizes?.map((item) => {
                        return (
                          <DropdownItem key={item.value} value={item.value} 
                          >
                            {item.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  {errors.size && (
                      <p className=" text-red-500 mt-2 text-xs ml-2">
                        This is a required field
                      </p>
                    )}

                </div>


                <div>
                  <Label className="ml-2 mt-2" >
                      Colors
                    </Label>
                  <Dropdown >
                    <DropdownTrigger>
                      <Button variant="shadow" className="capitalize max-w-md w-full">
                        {colorValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      onSelectionChange={handleColorChange}
                      {...register("color",{required:true})}
                      htmlFor="color"
                      className=" w-full "
                    >
                      {colors?.map((item) => {
                        return (
                          <DropdownItem key={item.value} value={item.value} 
                          >
                            {item.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  {errors.color && (
                      <p className=" text-red-500 mt-2 text-xs ml-2">
                        This is a required field
                      </p>
                    )}

                </div>


              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="ghost">Save Product</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
