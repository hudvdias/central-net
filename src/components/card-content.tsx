import { ClipboardDocumentIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { databaseContext } from "../context/database-context";
import type { Post } from "../types/post";

type Props = {
  post: Post;
  initialOpen?: boolean;
};

export function CardContent(props: Props) {
  const [open, setOpen] = useState(props.initialOpen || false);
  const useDatabase = useContext(databaseContext);
  const category = useDatabase.categories.find((item) => item.id === props.post.categoryId);

  const formattedDate = new Date(props.post.date).toLocaleDateString("pt-br");
  // const useDatabase = useContext(databaseContext);
  // const category = useDatabase.categories.find((item) => item.id === props.post.categoryId);

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  function onCopyLink() {
    if (!category) return;
    const url = `${window.location.origin}/${category.slug}/${props.post.id}`;
    navigator.clipboard.writeText(url);
  }

  // Renderiza estado fechado
  if (!open) {
    return (
      <div className="flex p-6 rounded-lg shadow-lg border bg-white items-center">
        <div className="flex flex-col gap-1">
          <p className="text-sm">{formattedDate}</p>
          <h2 className="text-lg">{props.post.title}</h2>
        </div>
        <button className="ml-auto cursor-pointer border rounded p-1 hover:bg-emerald-600 hover:text-white" onClick={handleOpen}>
          <PlusIcon className="size-5" />
        </button>
      </div>
    );
  }

  // Renderiza estado aberto
  return (
    <div className="flex flex-col p-6 rounded-lg shadow-lg border bg-white">
      <div className="flex items-center">
        <div className="flex flex-col gap-1">
          <p className="text-sm">{formattedDate}</p>
          <h2 className="text-lg font-medium">{props.post.title}</h2>
        </div>
        <button className="ml-auto cursor-pointer border rounded p-1 hover:bg-emerald-600 hover:text-white" onClick={handleOpen}>
          <MinusIcon className="size-5" />
        </button>
      </div>
      <div className="py-4 border-t border-emerald-600 mt-4">
        <p className="whitespace-pre-wrap leading-5">{props.post.content}</p>
      </div>
      {props.post.documentLink && (
        <div className="flex mb-4">
          <a href={props.post.documentLink} target="__blank" className="px-4 py-2 rounded bg-emerald-600 text-white cursor-pointer hover:brightness-120">
            Baixar documento
          </a>
        </div>
      )}
      <div className="pt-4 border-t border-emerald-600">
        <button onClick={onCopyLink} className="flex items-center border py-1 px-3 rounded text-sm gap-1 cursor-pointer hover:bg-emerald-600 hover:text-white">
          <ClipboardDocumentIcon className="size-4" /> Copiar Link
        </button>
      </div>
    </div>
  );
}
