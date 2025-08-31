import { RepositoryRepo } from "../repository/registry";
import { ApiError } from "../utils/apiError";

const { threadRepo } = RepositoryRepo();

export class ThreadService {
  /** Create a new thread */
  async createThread(authorId: string, content: string, image?: string) {
    if (!content?.trim()) throw new ApiError(400, "Content is required");

    const newThread = await threadRepo.createThread({
      author: authorId,
      content,
      image,
    });

    return {
      id: newThread._id?.toString(),
      content: newThread.content,
      createdAt: newThread.createdAt,
    };
  }

  /** Get all threads (feed) */
  async getThreads(requestingUserId?: string) {
    const threads = await threadRepo.getAllThreads();

    // On fetch, return full formatted data
    return threads.map((thread: any) => ({
      id: thread._id?.toString(),
      content: thread.content,
      image: thread.image || null,
      createdAt: thread.createdAt,
      author: {
        id: thread.author?._id?.toString(),
        name: thread.author?.name || "Unknown",
        username: `@${thread.author?.username || "user"}`,
        avatar: thread.author?.avatar || null,
      },
      likes: thread.likes?.length || 0,
      comments: thread.comments?.length || 0,
      shares: thread.shares?.length || 0,
      isLiked: requestingUserId
        ? thread.likes?.some((id: any) => id.toString() === requestingUserId)
        : false,
    }));
  }

  /** Update a thread */
  async updateThread(threadId: string, userId: string, content: string) {
    if (!content?.trim()) throw new ApiError(400, "Content cannot be empty");

    const updated = await threadRepo.updateThread(threadId, userId, content);
    if (!updated) throw new ApiError(404, "Thread not found or unauthorized");

    return {
      id: updated._id?.toString(),
      content: updated.content,
      updatedAt: updated.updatedAt,
    };
  }

  /** Delete a thread */
  async deleteThread(threadId: string, userId: string) {
    const deleted = await threadRepo.deleteThread(threadId, userId);
    if (!deleted) throw new ApiError(404, "Thread not found or unauthorized");

    return { success: true, id: deleted._id?.toString() || threadId };
  }

  /** Like / Unlike a thread */
  async likeThread(threadId: string, userId: string) {
    const thread = await threadRepo.toggleLike(threadId, userId);
    if (!thread) throw new ApiError(404, "Thread not found");

    return {
      id: thread._id?.toString(),
      likes: thread.likes?.length || 0,
      isLiked: thread.likes?.some((id: any) => id.toString() === userId),
    };
  }
}
