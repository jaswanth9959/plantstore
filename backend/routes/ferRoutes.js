import express from "express";
import {
  getAllFertilizers,
  getFerById,
} from "../controllers/categoryControllers.js";
const router = express.Router();

router.route("/").get(getAllFertilizers);
router.route("/:id").get(getFerById);

export default router;
