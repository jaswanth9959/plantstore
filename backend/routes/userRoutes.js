import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleWare.js";
import {
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";

router.route("/").post(registerUser).get(getUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
