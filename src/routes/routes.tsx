import { Route, Routes } from "react-router";
import { AdminLayout } from "../components/admin-layout";
import { Layout } from "../components/layout";
import { AdminCategoriesPage } from "../pages/admin/admin-categories";
import { AdminPostsPage } from "../pages/admin/admin-posts";
import { CreateCategoryPage } from "../pages/admin/create-category";
import { CreatePostPage } from "../pages/admin/create-post";
import { HomePage } from "../pages/home";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminCategoriesPage />}></Route>
          <Route path="create-category" element={<CreateCategoryPage />}></Route>
          <Route path=":category_id">
            <Route index element={<AdminPostsPage />}></Route>
            <Route path="create-post" element={<CreatePostPage />}></Route>
            <Route path="edit-post/:post_id" element={<CreatePostPage />}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
