import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ important for forms

// ================= STATIC FILES =================
app.use("/uploads", express.static("uploads")); // ✅ clean & safe

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ================= DATABASE =================
mongoose
  .connect("mongodb://127.0.0.1:27017/inventoryERP")
  .then(() => {
    console.log("MongoDB Connected 🚀");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// ================= SERVER =================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT} 🚀`);
});