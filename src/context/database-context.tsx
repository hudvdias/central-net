import { createContext } from "react";
import type { Category } from "../types/category";
import type { Post } from "../types/post";

export type DatabaseContext = {
  directory: FileSystemDirectoryHandle | null;
  posts: Post[];
  categories: Category[];

  selectDirectory: () => void;

  createCategory: (category: Category) => void;

  createPost: (post: Post) => void;
  deletePost: (postId: string) => void;
};

export const databaseContext = createContext<DatabaseContext>({
  posts: [],
  categories: [],
  directory: null,

  selectDirectory: () => {},

  createCategory: () => {},

  createPost: () => {},
  deletePost: () => {},
});
