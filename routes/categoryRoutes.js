import express from "express";
import Category from "../models/category.js";

const router = express.Router();


// ✅ GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET single category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ CREATE category
router.post("/", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ✅ UPDATE category
router.put("/:id", async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ✅ DELETE category
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;