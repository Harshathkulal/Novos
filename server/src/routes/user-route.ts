import express from "express";
import {protectRoute} from "../middleware/protectedRoute";
import { getAllUser } from "../controllers/user-controller";

const router = express.Router();

router.get("/user", protectRoute, getAllUser);

export default router;