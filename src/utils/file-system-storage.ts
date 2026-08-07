import { get, set } from "idb-keyval";

const KEY = "database-directory";

export async function saveDirectoryHandle(handle: FileSystemDirectoryHandle) {
  await set(KEY, handle);
}

export async function getDirectoryHandle() {
  return await get<FileSystemDirectoryHandle>(KEY);
}
