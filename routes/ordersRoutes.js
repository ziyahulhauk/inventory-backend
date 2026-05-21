import express from "express";
import mongoose from "mongoose";
import Order from "../models/Orders.js";

const router = express.Router();

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD order (THIS FIXES YOUR ERROR)
router.post("/", async (req, res) => {
  try {
    console.log("ORDER BODY:", req.body);

    const newOrder = new Order({
      orderNumber: "ORD-" + Date.now(),
      customerName: req.body.customerName,
      items: [
        {
          productId: new mongoose.Types.ObjectId(),
          name: req.body.productName,
          quantity: Number(req.body.quantity),
          price: Number(req.body.total),
        },
      ],
      totalAmount: Number(req.body.total),
    });

    const savedOrder = await newOrder.save();

    console.log("ORDER SAVED:", savedOrder);

    res.status(201).json(savedOrder);   // 🔥 IMPORTANT
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});
// DELETE order
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted", order: deletedOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;