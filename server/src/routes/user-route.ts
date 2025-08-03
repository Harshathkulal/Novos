import express from "express";
import {protectRoute} from "../middleware/protectedRoute";
import { getAllUsers, getUser} from "../controllers/user-controller";

const router = express.Router();

router.get("/getUser", protectRoute, getUser);
router.get("/users", protectRoute, getAllUsers);

export default router;