import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostForm } from "@/components/thread/PostForm";
import { PostCard } from "@/components/thread/PostCard";
import { getThreads } from "@/services/threadService";
import type { Post } from "@/types/thread.types";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  setPosts,
  addPost,
  updatePost,
  removePost,
} from "@/redux/slices/threadSlice";
import ThreadSkeleton from "./ThreadSkeleton";

export default function Thread() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.thread.posts);

  useEffect(() => {
    if (posts.length === 0) {
      setLoading(true);
      async function fetchAllPosts() {
        const data = await getThreads();
        dispatch(setPosts(data));
        setLoading(false);
      }
      fetchAllPosts();
    }
  }, [dispatch, posts.length]);

  return (
    <div className="min-h-screen">
      <PostForm addPost={(post: Post) => dispatch(addPost(post))} />
      <div className="space-y-4 mt-4 mb-12">
        {loading ? (
          <ThreadSkeleton />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              updatePost={(p: Post) => dispatch(updatePost(p))}
              removePost={(id: string) => dispatch(removePost(id))}
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
