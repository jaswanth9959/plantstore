import express from "express";
const router = express.Router();
import {
  createCounterorder,
  createorder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleWare.js";
router.route("/").post(protect, createorder).get(getAllOrders);
router.route("/counter").post(createCounterorder);
router.route("/:id").get(getOrderById).put(updateStatus);
router.route("/mine/:id").get(getMyOrders);

export default router;
