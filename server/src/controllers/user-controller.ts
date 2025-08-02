import { Request, Response } from "express";
import { UserDB } from "../repository/mongoDB/userDB";

const userDB = new UserDB();

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

    const filteredUsers = await userDB.findAllUsers(loggedInUserId);

    res.status(200).json({
      message: "User fetched successfully!",
      users: filteredUsers.map((user) => ({
        _id: user._id,
        fullName: user.fullName,
        profileImg: user.profileImg,
      })),
    });
  } catch (error: any) {
    console.error("failed to fetch User:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
