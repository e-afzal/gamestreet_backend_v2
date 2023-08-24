// PACKAGES
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import path from "path";

// ROUTES IMPORT
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import connectDB from "./config/db.js";

const app = express();

// BODY PARSER
app.use(express.json());
dotenv.config();

// CONNECT TO 'MONGODB'
connectDB();

// MORGAN
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// SET HEADERS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// API ROUTES
app.get("/", (req, res) => res.send("API is LIVE"));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// 404 ERROR HANDLER
app.use(notFound);
// ERROR MIDDLEWARE
app.use(errorHandler);

// SERVER - LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`.yellow.bold)
);
