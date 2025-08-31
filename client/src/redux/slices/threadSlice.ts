import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "@/types/thread.types";

interface ThreadState {
  posts: Post[];
}

const initialState: ThreadState = {
  posts: [],
};

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setPosts, addPost, updatePost, removePost } = threadSlice.actions;
export default threadSlice.reducer;
