import {
  register,
  login,
  logout,
  resetPassword,
  getUser,
  verifyToken,
} from "../controllers/auth-controller";
import { protectRoute } from "../middleware/protectedRoute";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resetPassword", resetPassword);
router.get('/verify', verifyToken);
router.get("/getUser", protectRoute, getUser);
export default router;
