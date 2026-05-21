import express from "express";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

const router = express.Router();

/* ================= GET ALL SALES ================= */
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= CREATE SALE ================= */
router.post("/", async (req, res) => {
  try {
    const { customerName, productName, quantity, total } = req.body;

    if (!customerName || !total) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const sale = await Sale.create({
      customerName,
      productName,
      quantity,
      total,
    });

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= DELETE SALE ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;