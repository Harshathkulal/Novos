import express from "express";
import { protectRoute } from "../middleware/protectedRoute";
import { MessageController } from "../controllers/index";

const router = express.Router();

router.get("/:id", protectRoute, MessageController.getMessages);
router.post("/send/:id", protectRoute, MessageController.sendMessage);

export default router;
