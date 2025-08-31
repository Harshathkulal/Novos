import { Router } from "express";
import authRoute from "./auth-route";
import userRoute from "./user-route";
import messageRoute from "./message-route";
import threadRoute from "./thread-route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/messages", messageRoute);
router.use("/threads", threadRoute);

export default router;
