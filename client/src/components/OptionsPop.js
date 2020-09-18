import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Link } from "react-router-dom";
import { Button, Popover, OverlayTrigger, Modal, Form } from "react-bootstrap";
import { renameNotebook, deleteNotebook } from "../actions/notes";
import { ThreeDots } from "react-bootstrap-icons";

const OptionsPop = (props) => {
  const dispatch = useDispatch();
  const handleCloseRename = () => setShowRename(false);
  const handleShowRename = () => setShowRename(true);
  const [showRename, setShowRename] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [showDelete, setShowDelete] = useState(false);
  const [notebookName, setNotebookName] = useState("");

  const updateNotebookName = (e) => setNotebookName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(renameNotebook(notebookName, props.notebookId));
    await props.setUpdateCount(props.updateCount + 1);
    await handleCloseRename();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteNotebook(props.notebookId));
    await props.setUpdateCount(props.updateCount + 1);
    await handleCloseDelete();
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Options</Popover.Title>
      <Popover.Content>
        <Button variant="primary" onClick={handleShowRename}>
          Rename Notebook
        </Button>
        <Button variant="danger" onClick={handleShowDelete}>
          Delete notebook
        </Button>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger
        rootClose
        trigger="click"
        placement="right"
        overlay={popover}
      >
        <ThreeDots />
      </OverlayTrigger>

      <Modal show={showRename} centered onHide={handleCloseRename}>
        <Modal.Header closeButton>
          <Modal.Title>Rename Notebook</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Enter a new name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a name"
              onChange={updateNotebookName}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRename}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} centered onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Notebook</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this notebook? This cannot be
            undone, and all associated notes will be deleted as well.
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

export default OptionsPop;
