import { gql } from "@apollo/client";
import { ColDef } from "@material-ui/data-grid";
import { Book } from "../../types";
import { EditableField } from "./fieldSelector";

const columnsDictionary: Record<string, ColDef> = {
  id: { field: "id", headerName: "Id", width: 50 },
  name: { field: "name", headerName: "Name", width: 300 },
  quantity: { field: "quantity", headerName: "Quantity", width: 100 },
  price: { field: "price", headerName: "Price", width: 100 },
  publisherName: {
    field: "publisherName",
    headerName: "Publisher name",
    width: 200,
  },
  foundationYear: {
    field: "foundationYear",
    headerName: "Foundation year",
    width: 140,
  },
  site: { field: "site", headerName: "Site", width: 200 },
  birthdate: { field: "birthdate", headerName: "Birthdate", width: 120 },
  fullName: { field: "fullName", headerName: "Author name", width: 200 },
};

export function getRows(books: Book[]) {
  return books.map((book) => ({
    id: book.id,
    name: book.name,
    quantity: book.quantity,
    price: book.price,
    publisherName: book.publisher?.name,
    foundationYear: book.publisher?.foundationYear,
    site: book.publisher?.site,
    birthdate: book.author?.birthdate,
    fullName: book.author?.fullName,
  }));
}
export function getColumns(editableField: EditableField): ColDef[] {
  const getColumn = (field: string) => columnsDictionary[field];
  const bookColumns = editableField.book.map(getColumn);
  const publisherColumns = editableField.publisher.map(getColumn);
  const authorColumns = editableField.author.map(getColumn);

  return [...bookColumns, ...publisherColumns, ...authorColumns];
}

export function getQuery(editableField: EditableField) {
  const { book, author, publisher } = editableField;
  const bookFields = `id ${book.join(" ")}`;
  const authorFields = author.length ? `author { ${author.join(" ")} }` : "";
  const publisherFields = publisher.length
    ? `publisher { ${publisher
        .map((field) => {
          return field === "publisherName" ? "name" : field;
        })
        .join(" ")} }`
    : "";

  return gql`query { books { ${bookFields} ${authorFields} ${publisherFields} } }`;
}
