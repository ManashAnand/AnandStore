
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/(models)/User";
import { connectDB } from "@/lib/connectDb";

export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json();

    //Confirm data exists
    if (!body.email || !body.password || !body.phone) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: body.email })
      // .lean()
      // .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
    
    const res =     await User.create({
      name:body.name,
      email:body.email,
      password:body.password,
      phone:body.phone
    });
    // console.log(res)
    return NextResponse.json({ message: "User Created.",res }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}