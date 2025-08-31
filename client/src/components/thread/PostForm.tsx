import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/services/threadService";
import type { PostFormProps } from "@/types/thread.types";

export const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const post = await createPost({ content });
    addPost(post);
    setContent("");
  };

  return (
    <div className="p-4 sticky top-0 bg-background z-10 border-b">
      <Textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-2"
      />
      <div className="flex justify-end items-center">
        <Button onClick={handleSubmit} disabled={!content.trim()}>
          Post
        </Button>
      </div>
    </div>
  );
};
