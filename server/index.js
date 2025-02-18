import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import userRoutes from "./src/routes/userRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
// import serviceRoutes from "./src/routes/serviceRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import subCategoryRoutes from "./src/routes/subCategoryRoutes.js";
import serviceCommentRoutes from "./src/routes/serviceCommentRoutes.js";
import eventCommentRoutes from "./src/routes/eventCommentRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import advertisementRoutes from "./src/routes/advertisementRoutes.js";
import countryRoutes from "./src/routes/countryRoutes.js";
import cityRoutes from "./src/routes/cityRoutes.js";
import currencyRoutes from "./src/routes/currencyRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";
import tripRoutes from "./src/routes/tripRoutes.js";

import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Connect to MongoDB
connectDB(); // Initiates MongoDB connection using database.js

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/trips", tripRoutes);
// app.use("/api/services", serviceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/serviceComments", serviceCommentRoutes);
app.use("/api/eventComments", eventCommentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/subCategory", subCategoryRoutes);
app.use("/api/currency", currencyRoutes);
app.use("/api/images", imageRoutes);
app.get("/upload-form", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/upload.html"));
});

// Start server
const PORT = process.env.PORT || 8443;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
