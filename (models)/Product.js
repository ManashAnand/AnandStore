import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required."],
      minlength: 2,
      maxlength: 255,
    },
    description: {
      type: String,
      required: [true, "Product description is required."],
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Product category is required."],
    },
    brand: {
      type: String,
      required: [true, "Product brand is required."],
    },
    inventory: {
      type: Number,
      required: [true, "Product inventory is required."],
      min: 0,
    },
    imageUrl: {
      type: String,
      required: [true, "Product image URL is required."],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    tags: [String],
    size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL"], // Valid size options
        required: [true, "Product size is required."],
      },
      color: {
        type: String,
        required: [true, "Product color is required."],
      },
    variants: [
      {
        name: String,
        options: [String],
      },
    ], 
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
