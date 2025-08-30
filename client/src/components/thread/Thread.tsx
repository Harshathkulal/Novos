import { useState, useEffect } from "react";
import { PostForm } from "@/components/thread/PostForm";
import { PostCard } from "@/components/thread//PostCard";
import { getPosts } from "@/services/threadService";
import type { Post } from "@/types/thread.types";

export default function Thread() {
  const [posts, setPosts] = useState<Post[]>([  {
    id: 1,
    author: {
      name: "John Doe",
      username: "@johndoe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    content: "Just finished building an amazing React app! The new hooks are incredible 🚀",
    image: null,
    timestamp: "2h",
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false
  },
  {
    id: 2,
    author: {
      name: "Sarah Wilson",
      username: "@sarahwilson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    content: "Beautiful sunset today! Nature never fails to amaze me ✨",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    timestamp: "4h",
    likes: 156,
    comments: 23,
    shares: 12,
    isLiked: true
  }
]);

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
      <div className="space-y-4 mt-4">
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
