export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface Post {
  id: string;
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
  removePost: (id: string) => void;
}

export interface PostFormProps {
  addPost: (post: Post) => void;
}
