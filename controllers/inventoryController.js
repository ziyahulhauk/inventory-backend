import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const data = await Product.find();
  res.json(data);
};

export const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};