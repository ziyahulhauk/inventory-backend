import Sale from "../models/Sale.js";

export const getSales = async (req, res) => {
  const data = await Sale.find();
  res.json(data);
};

export const addSale = async (req, res) => {
  const sale = await Sale.create(req.body);
  res.json(sale);
};

export const deleteSale = async (req, res) => {
  await Sale.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};