import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const updateRole = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};