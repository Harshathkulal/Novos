import express from "express";
import {protectRoute} from "../middleware/protectedRoute";
import { getMessages, sendMessage } from "../controllers/message-controller";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;