import { Route, Routes } from "react-router";
import { Layout } from "../components/layout";
import { AdminPage } from "../pages/admin/admin";
import { CreatePostPage } from "../pages/admin/create-post";
import { HomePage } from "../pages/home";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="admin">
          <Route index element={<AdminPage />} />
          <Route path="create-post" element={<CreatePostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
