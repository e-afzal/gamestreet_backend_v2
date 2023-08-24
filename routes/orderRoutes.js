// PACKAGE
import express from "express";
const router = express.Router();

// CONTROLLERS
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controller/orderController.js";

// MIDDLEWARE
import { protect } from "../middleware/authMiddleware.js";

// ROUTES
router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
