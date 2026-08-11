import { createContext } from "react";
import type { Category } from "../types/category";
import type { Post } from "../types/post";

export type CreatePostProps = { post: Post; file?: File };

export type DatabaseContext = {
  directory: FileSystemDirectoryHandle | null;
  posts: Post[];
  categories: Category[];

  selectDirectory: () => void;

  createCategory: (category: Category) => void;
  editCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;

  createPost: (props: CreatePostProps) => void;
  editPost: (post: Post) => void;
  deletePost: (postId: string) => void;
};

export const databaseContext = createContext<DatabaseContext>({
  posts: [],
  categories: [],
  directory: null,

  selectDirectory: () => {},

  createCategory: () => {},
  editCategory: () => {},
  deleteCategory: () => {},

  createPost: () => {},
  editPost: () => {},
  deletePost: () => {},
});
