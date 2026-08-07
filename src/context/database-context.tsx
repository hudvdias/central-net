import { createContext } from "react";
import type { Category } from "../types/category";
import type { Post } from "../types/post";

export type DatabaseContext = {
  posts: Post[];
  categories: Category[];
  createPost: (post: Post) => void;
  deletePost: (postId: string) => void;
};

export const databaseContext = createContext<DatabaseContext>({
  posts: [],
  categories: [],
  createPost: () => {},
  deletePost: () => {},
});
