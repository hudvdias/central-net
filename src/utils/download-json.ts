import type { Post } from "../types/post";

export function downloadPostsJson(posts: Post[]) {
  const json = JSON.stringify(posts, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "posts.json";
  link.click();
  URL.revokeObjectURL(url);
}
