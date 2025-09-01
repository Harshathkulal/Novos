import React from "react";
import { Heart, MessageCircle, Share } from "lucide-react";
import { likeThread } from "@/services/threadService";
import type { EngagementProps } from "@/types/thread.types";
import { useState } from "react";

export const EngagementButtons: React.FC<EngagementProps> = ({
  post,
  updatePost,
}) => {
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    const previousPost = { ...post };
    const updatedPost = {
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    };
    updatePost(updatedPost);

    try {
      await likeThread(post.id);
    } catch {
      updatePost(previousPost);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex space-x-6 mt-3 text-muted-foreground ml-9">
      <button
        onClick={handleLike}
        className="flex items-center transition-colors group hover:text-red-500"
      >
        <div className="p-1 rounded-full cursor-pointer transition-colors">
          <Heart
            size={18}
            className={post.isLiked ? "fill-red-500 text-red-500" : ""}
          />
        </div>
        <span className="text-sm">{post.likes}</span>
      </button>

      <button className="flex items-center transition-colors group hover:text-blue-500">
        <div className="p-1 rounded-full cursor-pointer transition-colors">
          <MessageCircle size={18} />
        </div>
        <span className="text-sm">{post.comments}</span>
      </button>

      <button className="flex items-center hover:text-green-500 transition-colors group">
        <div className="p-1 rounded-full cursor-pointer transition-colors">
          <Share size={18} />
        </div>
        <span className="text-sm">{post.shares}</span>
      </button>
    </div>
  );
};
