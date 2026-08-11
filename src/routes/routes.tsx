import { Route, Routes } from "react-router";
import { AdminLayout } from "../components/admin-layout";
import { Layout } from "../components/layout";
import { AdminCategoriesPage } from "../pages/admin/categories/admin-categories";
import { CreateCategoryPage } from "../pages/admin/categories/create-category";
import { EditCategoryPage } from "../pages/admin/categories/edit-category";
import { AdminPostsPage } from "../pages/admin/posts/admin-posts";
import { CreatePostPage } from "../pages/admin/posts/create-post";
import { EditPostPage } from "../pages/admin/posts/edit-post";
import { ContentPage } from "../pages/content";
import { HomePage } from "../pages/home";
import { SearchPage } from "../pages/search";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} /> {/** Redireciona para o slug "informativo" */}
        <Route path="search" element={<SearchPage />}></Route> {/** Página de pesquisa */}
        <Route path=":slug" element={<ContentPage />}></Route> {/** Página de conteúdo das categorias */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminCategoriesPage />}></Route> {/** Página inicial de admin - Lista as categorias e seleciona a pasta */}
          <Route path="create-category" element={<CreateCategoryPage />}></Route> {/** Cria uma categoria */}
          <Route path=":category_id" element={<AdminPostsPage />}></Route> {/** Lista os Posts de uma página */}
          <Route path=":category_id/edit" element={<EditCategoryPage />}></Route> {/** Edita a categoria */}
          <Route path="create-post" element={<CreatePostPage />}></Route> {/** Cria uma postagem */}
          <Route path="edit-post/:post_id" element={<EditPostPage />}></Route> {/** Edita uma postagem */}
        </Route>
      </Route>
    </Routes>
  );
}
