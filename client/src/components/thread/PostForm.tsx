import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/services/threadService";
import type { PostFormProps } from "@/types/thread.types";

export const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const post = await createPost({ content, image });
    addPost(post);
    setContent("");
    setImage(null);
  };

  return (
    <div className="p-4">
      <Textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-2"
      />
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => console.log("Upload image")}
        ></Button>
        <Button onClick={handleSubmit} disabled={!content.trim()}>
          Post
        </Button>
      </div>
    </div>
  );
};
