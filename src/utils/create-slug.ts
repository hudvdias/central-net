export function createSlug(text: string): string {
  return text
    .normalize("NFD") // separa acentos das letras
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove caracteres especiais
    .replace(/\s+/g, "-") // troca espaços por hífen
    .replace(/-+/g, "-"); // remove hífens duplicados
}
