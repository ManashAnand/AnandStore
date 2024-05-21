
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDb";
import Product from "@/(models)/Product";




export async function POST(req,{params}) {
  try {
      console.log(params)
      const {ProductId} = params
      const incomingData = await req.json();
      const {data,imageUrl} = incomingData;
      const errors = validateProductData(data,imageUrl);
      if (errors.length > 0) {
        return NextResponse.json(400).json(  { message: "All fields are required." },
        { status: 400 },{errors});
      }
     await connectDB();
     const updatedProduct = await Product.findByIdAndUpdate(
      ProductId,
      { ...data, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Product updated successfully.", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}