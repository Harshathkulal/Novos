import { useState, useEffect } from "react";
import { PostForm } from "@/components/thread/PostForm";
import { PostCard } from "@/components/thread//PostCard";
import { getPosts } from "@/services/threadService";
import type { Post } from "@/types/thread.types";

export default function Thread() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const addPost = (post: Post) => setPosts([post, ...posts]);
  const updatePost = (updated: Post) =>
    setPosts(posts.map((p) => (p.id === updated.id ? updated : p)));
  const removePost = (id: number) => setPosts(posts.filter((p) => p.id !== id));

  return (
    <div className="min-h-screen">
      <PostForm addPost={addPost} />
      <div className="space-y-4 mt-4 mb-12">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              updatePost={updatePost}
              removePost={removePost}
            />
          ))
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No posts yet. Be the first to share!
          </div>
        )}
      </div>
    </div>
  );
}
