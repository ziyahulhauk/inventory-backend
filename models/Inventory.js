import mongoose from "mongoose";

const inventorySchema =
  new mongoose.Schema(

    {

      name: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
        default: "",
      },

      barcode: {
        type: String,
        default: "",
      },

      sku: {
        type: String,
        default: "",
      },

      supplier: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      expiryDate: {
        type: Date,
      },

      lowStockLimit: {
        type: Number,
        default: 5,
      },

      stockStatus: {
        type: String,

        enum: [
          "In Stock",
          "Low Stock",
          "Out of Stock",
        ],

        default: "In Stock",
      },

    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Inventory",
  inventorySchema
);