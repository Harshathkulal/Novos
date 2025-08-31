import React from "react";
import { Heart, MessageCircle, Share } from "lucide-react";
import { likePostApi } from "@/services/threadService";
import type { EngagementProps } from "@/types/thread.types";

export const EngagementButtons: React.FC<EngagementProps> = ({
  post,
  updatePost,
}) => {
  const handleLike = async () => {
    const updated = await likePostApi(post.id);
    updatePost(updated);
  };
  console.log(post.isLiked)

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

      <button className="flex items-center  hover:text-green-500 transition-colors group">
        <div className="p-1 rounded-full cursor-pointer transition-colors">
          <Share size={18} />
        </div>
        <span className="text-sm">{post.shares}</span>
      </button>
    </div>
  );
};
