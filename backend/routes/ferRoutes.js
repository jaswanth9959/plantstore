import express from "express";
const router = express.Router();
import {
  getFerById,
  getfers,
  deletefer,
  createFer,
  updateFer,
} from "../controllers/fertilizerController.js";

router.route("/").get(getfers).post(createFer);

router.route("/:id").get(getFerById).put(updateFer).delete(deletefer);

export default router;
