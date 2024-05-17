
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDb";
import Product from "@/(models)/Product";
import { validateProductData } from "@/lib/validateProduct";


export async function POST(req) {
  try {
    await connectDB();
    const incomingData = await req.json();
    const {data,imageUrl} = incomingData;
    const errors = validateProductData(data,imageUrl);
    console.log(data)
    console.log(errors)
    if (errors.length > 0) {
        return NextResponse.json(400).json(  { message: "All fields are required." },
        { status: 400 },{errors});
    }
    const newProduct = new Product({
        title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      brand: data.brand,
      inventory: data.inventory,
      imageUrl: imageUrl,
      isFeatured: data.isFeatured,
      isAvailable: data.isAvailable,
      ratings: data.ratings,
      reviews: data.reviews,
      tags: data.tags,
      size: data.size,
      color: data.color,
    //   variants: data.variants
    });

    const savedProduct = await newProduct.save();
    return NextResponse.json({ message: "Product Saved." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}