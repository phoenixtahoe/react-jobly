import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

function SearchForm({ search }) {
  const [term, setTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    search(term);
  }

  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  return (
    <div className="m-4">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            placeholder="Enter a search term!"
            onChange={handleChange}
            name="term"
            value={term}
          />
        </FormGroup>
        <Button className="m-4" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SearchForm;
