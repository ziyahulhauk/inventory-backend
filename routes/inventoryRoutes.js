import express from "express";
import multer from "multer";
import Inventory from "../models/Inventory.js";

const router = express.Router();

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= GET ALL ================= */
router.get("/", async (req, res) => {
  try {
    const inventoryItems = await Inventory.find().sort({ createdAt: -1 });
    res.json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= CREATE ================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const inventoryItem = await Inventory.create({
      name,
      category,
      price,
      quantity,
      image,
    });

    res.status(201).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= UPDATE ================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    let updateData = { name, category, price, quantity };

    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Inventory Item Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;