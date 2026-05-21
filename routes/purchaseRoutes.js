import express
from "express";

import Purchase
from "../models/Purchase.js";

const router =
  express.Router();

router.post(
  "/",
  async (req, res) => {

    const purchase =
      await Purchase.create(
        req.body
      );

    res.json(purchase);
  }
);

router.get(
  "/",
  async (req, res) => {

    const purchases =
      await Purchase.find();

    res.json(purchases);
  }
);

export default router;