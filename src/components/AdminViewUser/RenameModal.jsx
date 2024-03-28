import React from "react";
import { apiAdmin } from "../../utils/utils";

function RenameModal({
  display,
  name,
  setColName,
  setDisplay,
  col_id,
  setActionDone,
}) {
  async function handleRenameSubmit() {
    await apiAdmin
      .patch(
        "/update-collection/",
        {
          col: "collection_name",
          collection_name: name,
          collection_id: col_id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => setActionDone(res.data.id));
    setDisplay("none");
  }

  return (
    <div
      style={{ display: display }}
      className={"bg-light h-25 w-50 position-absolute form-control z-n1"}
    >
      <h4>Please enter new value</h4>
      <input
        value={name}
        onChange={(e) => setColName(e.target.value)}
        className={"form-control"}
      />
      <button onClick={handleRenameSubmit} className={"btn btn-primary"}>
        Rename
      </button>
      <button onClick={() => setDisplay("none")} className={"btn btn-danger"}>
        Cancel
      </button>
    </div>
  );
}

export default RenameModal;
