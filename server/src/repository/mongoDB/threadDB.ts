import Thread from "../../models/thread-model";
import { Types } from "mongoose";
import { IThreadRepository } from "../../types/repository";

export class MongoThreadDB implements IThreadRepository {
  async createThread(data: { content: string; image?: string; author: string }) {
    return Thread.create({
      content: data.content,
      image: data.image,
      author: new Types.ObjectId(data.author),
    });
  }

  async getAllThreads() {
    return Thread.find()
      .populate("author", "name username avatar")
      .populate("likes", "username")
      .sort({ createdAt: -1 });
  }

  async updateThread(threadId: string, userId: string, content: string) {
    return Thread.findOneAndUpdate(
      { _id: threadId, author: userId },
      { content },
      { new: true }
    );
  }

  async deleteThread(threadId: string, userId: string) {
    return Thread.findOneAndDelete({ _id: threadId, author: userId });
  }

  async toggleLike(threadId: string, userId: string) {
    const thread = await Thread.findById(threadId);
    if (!thread) return null;

    const userObjectId = new Types.ObjectId(userId);
    const alreadyLiked = thread.likes.some((id) => id.equals(userObjectId));

    if (alreadyLiked) {
      thread.likes = thread.likes.filter((id) => !id.equals(userObjectId));
    } else {
      thread.likes.push(userObjectId);
    }

    await thread.save();
    return thread;
  }
}
