// models/Sale.js

import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Sale",
  saleSchema
);