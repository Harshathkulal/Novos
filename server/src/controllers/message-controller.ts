import { Request, Response } from "express";
import { MessageService } from "../services/messageServices";
import { emitNewMessage } from "../services/socketService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

const messageService = new MessageService();

/**  Send Message Controller **/
export const sendMessage = asyncHandler(
  async (req: Request & { user?: { id: string } }, res: Response) => {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user?.id;

    if (!senderId) {
      throw new ApiError(401, "Unauthorized");
    }

    const newMessage = await messageService.sendMessage(
      senderId,
      receiverId,
      message
    );

    emitNewMessage(receiverId, newMessage);

    res
      .status(201)
      .json(new ApiResponse(201, newMessage, "Message sent successfully"));
  }
);

/**  Get Messages Controller **/
export const getMessages = asyncHandler(
  async (req: Request & { user?: { id: string } }, res: Response) => {
    const userToChatId = req.params.id;
    const senderId = req.user?.id;

    if (!senderId) {
      throw new ApiError(401, "Unauthorized");
    }

    const messages = await messageService.getConversationMessages(
      senderId,
      userToChatId
    );

    res
      .status(200)
      .json(new ApiResponse(200, messages, "Messages fetched successfully"));
  }
);
