import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide a username."], // Name is required
      minlength: 2, // Minimum length of name
      maxlength: 50, // Maximum length of name
    },
    email: {
      type: String,
      required: [true, "Must provide a email."], // Email is required
      unique: [true, "Must be unique"], // Email must be unique
      trim: true, // Trim whitespace
      lowercase: true, // Convert email to lowercase
      match: /^\S+@\S+\.\S+$/, // Regex for email format validation
    },
    phone: {
      type: String,
      required: [true, "Must provide a number."], // Number is required
      match: /^[0-9]{10}$/, // Regex for 10-digit number validation
    },
    password: {
      type: String,
      required: [true, "Must provide a password."], // Password is required
      minlength: 8, // Minimum length of password
      maxlength: 100, // Maximum length of password
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
