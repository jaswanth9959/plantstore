import express from "express";
import {
  getAllCategories,
  getCategoryById,
  updateCategory,
  getAllFertilizers,
  getFerById,
} from "../controllers/categoryControllers.js";
const router = express.Router();

router.route("/").get(getAllCategories);
router.route("/:id").put(updateCategory).get(getCategoryById);
router.route("/fertilizer").get(getAllFertilizers);
router.route("/fertilizer/:id").get(getFerById);

export default router;
