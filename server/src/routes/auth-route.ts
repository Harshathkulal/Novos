import {
  register,
  login,
  logout,
  session,
} from "../controllers/auth-controller";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/session", session);
export default router;
