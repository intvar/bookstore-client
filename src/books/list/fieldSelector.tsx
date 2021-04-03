import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

export type EditableField = {
  book: string[];
  publisher: string[];
  author: string[];
};

type FieldGroup = "book" | "publisher" | "author";

type Props = {
  value: EditableField;
  onChange: (value: EditableField) => void;
};

export const FieldSelector: React.FC<Props> = ({ value, onChange }) => {
  const { book, publisher, author } = value;
  const handleChange = (fieldGroup: FieldGroup, field: string) => {
    if (value[fieldGroup].includes(field)) {
      onChange({
        ...value,
        [fieldGroup]: value[fieldGroup].filter((f) => f !== field),
      });
    } else {
      onChange({
        ...value,
        [fieldGroup]: [...value[fieldGroup], field],
      });
    }
  };

  return (
    <div>
      <FormControl>
        <FormLabel>Books</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={book.includes("name")}
                onChange={() => handleChange("book", "name")}
                name="Name"
                color="primary"
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={book.includes("price")}
                onChange={() => handleChange("book", "price")}
                name="Price"
                color="primary"
              />
            }
            label="Price"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={book.includes("quantity")}
                onChange={() => handleChange("book", "quantity")}
                name="Quantity"
                color="primary"
              />
            }
            label="Quantity"
          />
        </FormGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Author</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={author.includes("fullName")}
                onChange={() => handleChange("author", "fullName")}
                name="FullName"
                color="primary"
              />
            }
            label="FullName"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={author.includes("birthdate")}
                onChange={() => handleChange("author", "birthdate")}
                name="Birthdate"
                color="primary"
              />
            }
            label="Birthdate"
          />
        </FormGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Publisher</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={publisher.includes("publisherName")}
                onChange={() => handleChange("publisher", "publisherName")}
                name="Name"
                color="primary"
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={publisher.includes("foundationYear")}
                onChange={() => handleChange("publisher", "foundationYear")}
                name="FoundationYear"
                color="primary"
              />
            }
            label="Foundation year"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={publisher.includes("site")}
                onChange={() => handleChange("publisher", "site")}
                name="Site"
                color="primary"
              />
            }
            label="Site"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};
