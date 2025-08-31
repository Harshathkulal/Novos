import express from "express";
import { protectRoute } from "../middleware/protectedRoute";
import * as ThreadController from "../controllers/thread-Controller";

const router = express.Router();

router.get("/", protectRoute, ThreadController.getThreads);
router.post("/", protectRoute, ThreadController.createThread);
router.put("/:id", protectRoute, ThreadController.updateThread);
router.delete("/:id", protectRoute, ThreadController.deleteThread);
router.post("/:id/like", protectRoute, ThreadController.likeThread);

export default router;
