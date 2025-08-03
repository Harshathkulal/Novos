import { Request, Response } from "express";
import { MessageService } from "../services/messageServices";
import { emitNewMessage } from "../services/socketService";

const messageService = new MessageService();

/**
 * Sends a message from the logged-in user to another user.
 *
 * - Validates that the sender is authenticated.
 * - Saves the message to the database.
 * - Emits the new message to the receiver's socket.
 *
 * @param req - Contains the message and receiver ID in params and body.
 * @param res - Responds with the saved message or an error.
 */
export const sendMessage = async (
  req: Request & { user?: { _id: string } },
  res: Response
): Promise<void> => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user?._id;

    // Verify sender is authenticated
    if (!senderId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const newMessage = await messageService.sendMessage(senderId, receiverId, message);

    emitNewMessage(receiverId, newMessage);

    // Respond with the saved message
    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error("Error in sendMessage:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Retrieves all messages exchanged between the logged-in user and the specified user.
 *
 * - Fetches messages from the conversation between the two users.
 * - Returns an array of messages or an empty array if no messages are found.
 *
 * @param req - userToChatId from params and senderId from user
 * @param res - messages or error response
 */
export const getMessages = async (
  req: Request & { user?: { _id: string } },
  res: Response
): Promise<void> => {
  try {
    const userToChatId = req.params.id;
    const senderId = req.user?._id;

    // Verify sender is authenticated
    if (!senderId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const messages = await messageService.getConversationMessages(senderId, userToChatId);
    res.status(200).json(messages);
  } catch (error: any) {
    console.error("Error in getMessages:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
