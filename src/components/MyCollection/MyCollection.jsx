import React, { useEffect, useState } from "react";
import api from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import "../MyCollection/MyCollection.css";
import { ReactComponent as Folder } from "../../assets/folder.svg";
import { PencilSquare, Trash3, XSquareFill } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyCollection() {
  const [collections, setCollections] = useState("");
  const [display, setDisplay] = useState("none");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [colname, setColname] = useState();
  const [colId, setColId] = useState();
  const [actionId, setActionId] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    api
      .get("/my-collections/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCollections(response.data.collections);
      })
      .catch((error) => {
        setError(error);
      });
  }, [actionId]);

  const handleCollectionAdd = async (e) => {
    navigate(`/collection/create/`);
  };

  function handleRename(collection) {
    setDisplay("block");
    const objectWithId = collections.find(
      (obj) => obj.id === parseFloat(collection)
    );
    setColname(objectWithId.collection_name);
    setColId(objectWithId.id);
  }

  async function handleRenameSubmit() {
    await api
      .patch(
        "/update-collection/",
        {
          col: "collection_name",
          collection_name: colname,
          collection_id: colId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setActionId(res.data.id);
        setDisplay("none");
      });
  }

  function handleDelete(collection_id) {
    setColId(collection_id);
    setShow(true);
  }

  async function handleDeleteSubmit() {
    await api
      .post(
        "/delete-collections/",
        { collection_id: colId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setActionId(res.data.id);
        setShow(false);
      });
  }

  return (
    <div className={"container"}>
      {error ? <div className={"alert alert-danger"}>{error}</div> : null}
      <section>
        <button
          onClick={handleCollectionAdd}
          className={"btn btn-success mx-0 mt-2 mb-3 d-inline"}
        >
          Create New Collection
        </button>
      </section>
      <div className="row">
        {collections
          ? collections.map((collection) => (
              <div className={"bg-light row"}>
                <div className="col-10 bg-light me-auto">
                  <label>
                    <Folder />
                    <span className={"d-inline"}>
                      <Link
                        className={"mx-2 plain-text fw-bold"}
                        to={`/collection/${collection.id}`}
                      >
                        {collection.collection_name}
                      </Link>
                    </span>
                  </label>
                </div>
                <div
                  id={collection.id}
                  onClick={() => handleRename(collection.id)}
                  className={"col-1 rename"}
                >
                  <div className={"text-secondary"}>
                    <PencilSquare color={"orange"} /> Rename
                  </div>
                </div>

                <div
                  id={collection.id}
                  onClick={() => handleDelete(collection.id)}
                  className={"col-1"}
                >
                  <Trash3 color={"red"} />
                </div>
              </div>
            ))
          : null}
        <div
          className={"rename-form w-75 h-50 container position-fixed bg-light"}
          style={{ display: display }}
        >
          <div className="text-end">
            <XSquareFill
              onClick={() => setDisplay("none")}
              color={"red"}
              size={30}
            />
          </div>
          <h5 className={"mt-2"}>Collection Rename</h5>
          <label className={"form-label"}>Collection name</label>
          <input
            value={colname}
            onChange={(e) => setColname(e.target.value)}
            className={"form-control"}
          />
          <button
            onClick={handleRenameSubmit}
            className={"btn btn-warning mt-3"}
          >
            Rename
          </button>
        </div>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure ?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteSubmit}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default MyCollection;
