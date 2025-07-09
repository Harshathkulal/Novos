import { Request, Response } from "express";
import User from "../models/user-modal";

export const getAllUser = async (
  req: Request & { user?: { _id: string } },
  res: Response
): Promise<void> => {
  try {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      res.status(401).json({ error: "Unauthorized please Log In" });
      return;
    }

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error: any) {
    console.error("failed to fetch User:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
