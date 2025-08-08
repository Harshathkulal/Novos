import express from "express";
import { protectRoute } from "../middleware/protectedRoute";
import { UserController } from "../controllers/index";

const router = express.Router();

router.get("/getUser", protectRoute, UserController.getUser);
router.get("/users", protectRoute, UserController.getAllUsers);

export default router;
