
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDb";
import Product from "@/(models)/Product";
import { validateProductData } from "@/lib/validateProduct";




export async function POST(req) {
  try {
      const {ProductId} = await req.json()
     await connectDB();
     const delProduct = await Product.findByIdAndDelete(ProductId);
    if (!delProduct) {
      return NextResponse.json(
        { message: "Product not found ." },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Product deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}