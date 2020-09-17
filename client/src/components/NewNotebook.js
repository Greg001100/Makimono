import React, {useState} from "react";
import {Button, Modal, Form} from "react-bootstrap"
import { newNotebook } from "../actions/notes";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

const NewNotebook = (props) => {
  const [show, setShow] = useState(false);
  const [notebookName, setNotebookName] = useState("")
  const userId = useSelector((state) => state.authentication.user.id);
  const dispatch= useDispatch()
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = await dispatch(newNotebook(userId, notebookName))
    if (newBook){
        handleClose();
        props.setUpdateCount(props.updateCount +1)
        history.push(`/dashboard/${newBook.id}/${newBook.latest_note}`);
    }
  };

  const updateNotebookName= (e) => setNotebookName(e.target.value)

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        New Notebook
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Notebook!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter a name for your notebook" onChange={updateNotebookName} />
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewNotebook;
