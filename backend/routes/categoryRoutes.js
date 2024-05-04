import express from "express";
import {
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryControllers.js";
const router = express.Router();

router.route("/").get(getAllCategories);
router.route("/:id").put(updateCategory).get(getCategoryById);

export default router;
