import express from "express";
const router = express.Router();
import {
  createPlant,
  deletePlant,
  getPlantById,
  getPlants,
  updatePlant,
} from "../controllers/plantControllers.js";
import { protect, admin } from "../middlewares/authMiddleWare.js";

router.route("/").get(getPlants).post(createPlant);

router.route("/:id").get(getPlantById).put(updatePlant).delete(deletePlant);

export default router;
