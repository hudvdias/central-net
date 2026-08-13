import { useEffect, useState, type ReactNode } from "react";
import { databaseContext, type CreatePostProps, type EditPostProps } from "../context/database-context";
import type { Category } from "../types/category";
import type { Post } from "../types/post";
import { createSlug } from "../utils/create-slug";
import { getDirectoryHandle, saveDirectoryHandle } from "../utils/file-system-storage";

type Props = { children: ReactNode };

export function DatabaseContextProvider(props: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [directory, setDirectory] = useState<FileSystemDirectoryHandle | null>(null);
  const [categoriesHandle, setCategoriesHandle] = useState<FileSystemFileHandle | null>(null);
  const [postsHandle, setPostsHandle] = useState<FileSystemFileHandle | null>(null);

  // Altera o arquivo Json
  async function writeJsonFile(handle: FileSystemFileHandle, data: unknown) {
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
  }

  // Seleciona o diretório
  async function selectDirectory() {
    try {
      const handle = await (window as any).showDirectoryPicker({ mode: "readwrite" });
      await loadFileHandles(handle);
      await saveDirectoryHandle(handle);
      setDirectory(handle);
    } catch (error) {
      console.error("Pasta inválida!", error);
      alert("Pasta Inválida!");
    }
  }

  // carrega os arquivos a partir da pasta selecionada
  async function loadFileHandles(handle: FileSystemDirectoryHandle) {
    const categoriesFile = await handle.getFileHandle("categories.json");
    const postsFile = await handle.getFileHandle("posts.json");
    setCategoriesHandle(categoriesFile);
    setPostsHandle(postsFile);
    return { categoriesFile, postsFile };
  }

  // Salva documentos das publicações
  async function saveDocument(file: File, fileName: string) {
    try {
      if (!directory) throw new Error("Diretório não selecionado.");
      const documentsDirectory = await directory.getDirectoryHandle("documents", { create: true });
      const fileHandle = await documentsDirectory.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(file);
      await writable.close();
      return `/documents/${fileName}`;
    } catch (error) {
      console.error(error);
    }
  }

  // Cria uma nova categoria
  async function createCategory(category: Category) {
    if (!categoriesHandle) return;
    const newCategories = [...categories, category];
    await writeJsonFile(categoriesHandle, newCategories);
    setCategories(newCategories);
  }

  // Edita uma categoria
  async function editCategory(category: Category) {
    if (!categoriesHandle) return;
    const newCategories = categories.map((item) => (item.id === category.id ? category : item));
    await writeJsonFile(categoriesHandle, newCategories);
    setCategories(newCategories);
  }

  // Deleta uma categoria
  async function deleteCategory(categoryId: string) {
    if (!categoriesHandle) return;
    const newCategories = categories.filter((item) => item.id !== categoryId);
    await writeJsonFile(categoriesHandle, newCategories);
    setCategories(newCategories);
  }

  // Cria um novo post
  async function createPost(props: CreatePostProps) {
    if (!postsHandle) return;
    const newPost = props.post;
    if (props.file) {
      const documentLink = await saveDocument(props.file, createSlug(props.post.title));
      newPost.documentLink = documentLink;
    }
    const newPosts = [...posts, newPost];
    await writeJsonFile(postsHandle, newPosts);
    setPosts(newPosts);
  }

  // Edita um post
  async function editPost(props: EditPostProps) {
    if (!postsHandle) return;
    const newPost = props.post;
    console.log({ newPost, file: props.file });
    if (props.file) {
      const documentLink = await saveDocument(props.file, newPost.id);
      newPost.documentLink = documentLink;
    }
    console.log({ newPost });
    const newPosts = posts.map((item) => (item.id === props.post.id ? newPost : item));
    await writeJsonFile(postsHandle, newPosts);
    setPosts(newPosts);
  }

  // Deleta um post
  async function deletePost(postId: string) {
    if (!postsHandle) return;
    const newPosts = posts.filter((item) => item.id !== postId);
    await writeJsonFile(postsHandle, newPosts);
    setPosts(newPosts);
  }

  // Restaura a pasta selecionada do IndexedDB ao carregar a aplicação
  useEffect(() => {
    async function restoreDirectory() {
      const handle = await getDirectoryHandle();
      if (handle) {
        const permission = await (handle as any).queryPermission({ mode: "readwrite" });
        if (permission === "granted") {
          setDirectory(handle);
          await loadFileHandles(handle);
          return;
        }
        const newPermission = await (handle as any).requestPermission({ mode: "readwrite" });
        if (newPermission === "granted") {
          setDirectory(handle);
          await loadFileHandles(handle);
        }
      }
    }
    restoreDirectory();
  }, []);

  // Carrega os posts e categorias da página Public ao abrir a página
  useEffect(() => {
    async function loadData() {
      const categoriesResponse = await fetch("/centralnet/v2-beta/categories.json");
      const categoriesData: Category[] = await categoriesResponse.json();
      setCategories(categoriesData);
      const postsResponse = await fetch("/centralnet/v2-beta/posts.json");
      const postsData: Post[] = await postsResponse.json();
      const formattedData: Post[] = postsData.map((post: Post) => ({ ...post, date: new Date(post.date) })); // Formata a data para o tipo Date
      const orderedData = formattedData.sort((a, b) => b.date.getTime() - a.date.getTime()); // Ordena para mostrar os últimos primeiro
      setPosts(orderedData);
    }
    loadData();
  }, []);

  return (
    <databaseContext.Provider
      value={{
        posts,
        categories,
        directory,
        selectDirectory,
        createCategory,
        editCategory,
        deleteCategory,
        createPost,
        editPost,
        deletePost,
      }}
    >
      <>{props.children}</>
    </databaseContext.Provider>
  );
}
