import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
      default: "",
    },

    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered", "Cancelled"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Partial"],
      default: "Unpaid",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Online"],
      default: "Cash",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);