import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function CustomFields({ customFields, setCustomFields }) {
  const handleAddField = (type) => {
    setCustomFields((prevFields) => [
      ...prevFields,
      {
        type: type,
        label: "",
      },
    ]);
  };

  const handleLabelChange = (e, index) => {
    const updatedFields = [...customFields];
    updatedFields[index].label = e.target.value;
    setCustomFields(updatedFields);
  };

  return (
    <div>
      <div className={"alert alert-light"}>
        <p className={"fw-bold"}>Add more custom fields if needed</p>
        <Button
          onClick={() => handleAddField("text")}
          className={"mb-2"}
          variant={"primary"}
        >
          Add text field
        </Button>
        <Button
          onClick={() => handleAddField("integer")}
          className={"mx-2 mb-2"}
          variant={"primary"}
        >
          Add integer field
        </Button>
        <Button
          onClick={() => handleAddField("check")}
          className={"mx-2 mb-2"}
          variant={"primary"}
        >
          Add check field
        </Button>
        {customFields.map((field, index) => (
          <form key={index}>
            <input
              name={"label"}
              value={field.label}
              onChange={(e) => handleLabelChange(e, index)}
              placeholder="Label"
            />
            <input
              className={"form-control"}
              name={field.type}
              placeholder={field.type}
            />
          </form>
        ))}
      </div>
    </div>
  );
}

export default CustomFields;
