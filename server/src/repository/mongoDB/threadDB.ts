import Thread from "../../models/thread-model";
import { Types } from "mongoose";
import { IThreadRepository } from "../../types/repository";

export class MongoThreadDB implements IThreadRepository {
  async createThread(data: {
    content: string;
    image?: string;
    author: string;
  }) {
    const thread = await Thread.create({
      content: data.content,
      image: data.image,
      author: new Types.ObjectId(data.author),
    });

    // normalized data
    return thread.populate("author", "name username avatar");
  }

  async getAllThreads() {
    return Thread.find()
      .populate("author", "name username avatar")
      .sort({ createdAt: -1 })
      .lean();
  }

  async updateThread(threadId: string, userId: string, content: string) {
    return Thread.findOneAndUpdate(
      { _id: threadId, author: userId },
      { content, updatedAt: new Date() },
      { new: true }
    )
      .populate("author", "name username avatar")
      .lean();
  }

  async deleteThread(threadId: string, userId: string) {
    return Thread.findOneAndDelete({ _id: threadId, author: userId }).lean();
  }

  async toggleLike(threadId: string, userId: string) {
    const userObjectId = new Types.ObjectId(userId);

    const thread = await Thread.findOneAndUpdate(
      { _id: threadId, likes: { $ne: userObjectId } },
      { $addToSet: { likes: userObjectId } },
      { new: true }
    )
      .populate("author", "name username avatar")
      .lean();

    // If not found, user had already liked → unlike instead
    if (!thread) {
      return Thread.findOneAndUpdate(
        { _id: threadId },
        { $pull: { likes: userObjectId } },
        { new: true }
      )
        .populate("author", "name username avatar")
        .lean();
    }

    return thread;
  }
}
