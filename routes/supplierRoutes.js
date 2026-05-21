import express from "express";

const router = express.Router();

/* TEMP DATA */
let suppliers = [];

/* GET ALL */
router.get("/", (req, res) => {
  res.json(suppliers);
});

/* CREATE */
router.post("/", (req, res) => {
  const supplier = {
    _id: Date.now().toString(),
    ...req.body,
  };

  suppliers.push(supplier);

  res.status(201).json(supplier);
});

/* DELETE */
router.delete("/:id", (req, res) => {
  suppliers = suppliers.filter(
    (s) => s._id !== req.params.id
  );

  res.json({
    message: "Supplier deleted",
  });
});

export default router;