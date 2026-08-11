import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { Post } from "../types/post";

type Props = {
  post: Post;
  initialOpen?: boolean;
};

export function CardContent(props: Props) {
  const [open, setOpen] = useState(props.initialOpen || false);

  const formattedDate = new Date(props.post.date).toLocaleDateString("pt-br");
  // const useDatabase = useContext(databaseContext);
  // const category = useDatabase.categories.find((item) => item.id === props.post.categoryId);

  function handleOpen() {
    setOpen((prev) => !prev);
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
      <div className="py-6">
        <p className="whitespace-pre-wrap leading-5.5">{props.post.content}</p>
      </div>
    </div>
  );
}
