import { useQuery } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@material-ui/data-grid";
import React, { useMemo, useState } from "react";
import { Book } from "../../types";
import { EditableField, FieldSelector } from "../list/fieldSelector";
import { getRows, getColumns, getQuery } from "./utils";

export const Books = () => {
  const [editableField, setEditableField] = useState<EditableField>({
    book: ["name"],
    publisher: ["publisherName"],
    author: ["fullName"],
  });
  const columns = useMemo(() => getColumns(editableField), [editableField]);
  const query = getQuery(editableField);
  const { loading, data } = useQuery<{ books: Book[] }>(query, {
    fetchPolicy: "no-cache",
  });

  const books = data?.books || [];
  const rows = getRows(books);

  return (
    <div>
      <FieldSelector value={editableField} onChange={setEditableField} />
      <div style={{ height: "1000px", width: "100%" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid rows={rows} columns={columns} pageSize={10} />
        )}
      </div>
    </div>
  );
};
