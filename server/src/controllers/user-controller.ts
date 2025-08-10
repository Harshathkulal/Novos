import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

const userService = new UserService();

/**  Get Logged-in User Controller. **/
export const getUser = asyncHandler(
  async (req: Request & { user?: { id: string } }, res: Response) => {
    const user = await userService.getUserById(req.user?.id);

    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched successfully"));
  }
);

/**  Get All Users Except Logged-in User Controller. **/
export const getAllUsers = asyncHandler(
  async (req: Request & { user?: { id: string } }, res: Response) => {
    const loggedInUserId = req.user?.id;

    if (!loggedInUserId) {
      throw new ApiError(401, "Unauthorized. Please log in.");
    }

    const users = await userService.getAllUsers(loggedInUserId);

    res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  }
);
