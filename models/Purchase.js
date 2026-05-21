import mongoose
from "mongoose";

const purchaseSchema =
  new mongoose.Schema({

    supplier: String,

    products: Array,

    amount: Number,

    status: String,

  },
  {
    timestamps: true,
  });

export default mongoose.model(
  "Purchase",
  purchaseSchema
);