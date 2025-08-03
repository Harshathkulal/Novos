import { Request, Response } from "express";
import { UserService } from "../services/userServices";

const userService = new UserService();

/**
 * Retrieves the logged-in user's details.
 * @param req - Contains the logged-in user's ID from the request object.
 * @param res - Responds with the user details or an error message.
 */
export const getUser = async (
  req: Request & { user?: { _id: string } },
  res: Response
): Promise<void> => {
  try {
    const user = await userService.getUserById(req.user?._id);

    if (!user) {
      res.status(400).json({ message: "User not found!" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error("failed to fetch User:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Retrieves all users except the logged-in user.
 * @param req - Contains the logged-in user's ID from the request object.
 * @param res - Responds with an array of users or an error message.
 */
export const getAllUsers = async (
  req: Request & { user?: { _id: string } },
  res: Response
): Promise<void> => {
  try {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      res.status(401).json({ error: "Unauthorized please Log In" });
      return;
    }

    const users = await userService.getAllUsers(loggedInUserId);

    res.status(200).json({
      message: "Users fetched successfully!",
      users,
    });
  } catch (error: any) {
    console.error("failed to fetch Users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
