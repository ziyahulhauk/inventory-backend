// models/Product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    category: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Product",
  productSchema
);