export type Post = {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  date: Date;
  documentLink?: string;
  imageLink?: string;
};
