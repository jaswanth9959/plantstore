import express from "express";
const router = express.Router();
import {
  getSerById,
  getServices,
  deleteSer,
  createSer,
  updateSer,
} from "../controllers/ServiceControllers.js";

router.route("/").get(getServices).post(createSer);

router.route("/:id").get(getSerById).put(updateSer).delete(deleteSer);

export default router;
