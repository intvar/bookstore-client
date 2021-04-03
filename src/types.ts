export type Book = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  publisher: Publisher;
  author: Author;
};
export type Publisher = {
  name: string;
  foundationYear: number;
  site: string;
};
export type Author = {
  birthdate: string;
  fullName: string;
};
