import { Route, Routes } from "react-router";
import { AdminLayout } from "../components/admin-layout";
import { Layout } from "../components/layout";
import { AdminPostsPage } from "../pages/admin/admin-posts";
import { AdminCategoriesPage } from "../pages/admin/categories/admin-categories";
import { CreateCategoryPage } from "../pages/admin/categories/create-category";
import { EditCategoryPage } from "../pages/admin/categories/edit-category";
import { CreatePostPage } from "../pages/admin/create-post";
import { HomePage } from "../pages/home";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} /> {/** HomePage - Informativo */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminCategoriesPage />}></Route> {/** Página inicial de admin - Lista as categorias e seleciona a pasta */}
          <Route path="create-category" element={<CreateCategoryPage />}></Route> {/** Cria uma categoria */}
          <Route path=":category_id" element={<AdminPostsPage />}></Route> {/** Lista os Posts de uma página */}
          <Route path=":category_id/edit" element={<EditCategoryPage />}></Route> {/** Edita a categoria */}
          <Route path=":category_id/create-post" element={<CreatePostPage />}></Route> {/** Cria uma postagem */}
          <Route path=":category_id/edit-post/:post_id" element={<CreatePostPage />}></Route> {/** Edita uma postagem */}
        </Route>
      </Route>
    </Routes>
  );
}
