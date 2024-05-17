
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDb";
import Product from "@/(models)/Product";



export async function GET(req) {
  try {
    await connectDB();
    const allProduct = await Product.find();
  //  console.log(allProduct)
    return NextResponse.json({ allProduct }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}