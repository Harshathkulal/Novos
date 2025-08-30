export interface Author {
  name: string;
  username: string;
  avatar: string;
}

export interface Post {
  id: number;
  author: Author;
  content: string;
  image: string | null;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

export interface EngagementProps {
  post: Post;
  updatePost: (post: Post) => void;
}

export interface PostCardProps {
  post: Post;
  updatePost: (post: Post) => void;
  removePost: (id: number) => void;
}

export interface PostFormProps {
  addPost: (post: Post) => void;
}
