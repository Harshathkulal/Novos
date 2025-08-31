import { Request, Response } from "express";
import { ThreadService } from "../services/threadService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

const threadService = new ThreadService();

/** Create Thread */
export const createThread = asyncHandler(
  async (req: Request & { user?: { id: string } }, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const { content } = req.body;
    const thread = await threadService.createThread(req.user.id, content);

    res.status(201).json(new ApiResponse(201, thread, "Thread created"));
  }
);

/** Get Threads */
export const getThreads = asyncHandler(
  async (req: Request & { user?: { id: string } }, res: Response) => {
    const threads = await threadService.getThreads(req.user?.id);
    res.status(200).json(new ApiResponse(200, threads, "Threads fetched"));
  }
);

/** Update Thread */
export const updateThread = asyncHandler(
  async (req: Request & { user?: { id: string } }, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const updated = await threadService.updateThread(
      req.params.id,
      req.user.id,
      req.body.content
    );

    res.status(200).json(new ApiResponse(200, updated, "Thread updated"));
  }
);

/** Delete Thread */
export const deleteThread = asyncHandler(
  async (req: Request & { user?: { id: string } }, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const deleted = await threadService.deleteThread(
      req.params.id,
      req.user.id
    );
    res.status(200).json(new ApiResponse(200, deleted, "Thread deleted"));
  }
);

/** Like/Unlike Thread */
export const likeThread = asyncHandler(
  async (req: Request & { user?: { id: string } }, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const thread = await threadService.likeThread(req.params.id, req.user.id);
    res.status(200).json(new ApiResponse(200, thread, "Thread liked/unliked"));
  }
);
