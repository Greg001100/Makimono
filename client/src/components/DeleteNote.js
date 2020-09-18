import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { deleteNote } from "../actions/notes";
import { XCircle } from "react-bootstrap-icons";

const DeleteNote = (props) => {
  const dispatch = useDispatch();
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteNote(props.noteId));
    await props.setUpdateCount(props.updateCount + 1);
    await handleCloseDelete();
  };

  return (
    <>
      <button onClick={() => handleShowDelete()}>
        <XCircle />
      </button>

      <Modal show={showDelete} centered onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this note? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteNote;
