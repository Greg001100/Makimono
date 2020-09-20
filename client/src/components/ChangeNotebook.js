import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { changeBook, getNotebooks } from "../actions/notes";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const ChangeNotebook = (props) => {
  const [show, setShow] = useState(false);
  const [newBook, setNewBook] = useState(null);
  const [notebookArray, setArray] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const { noteId } = useParams();
  const { notebookId } = useParams();
  const userId = useSelector((state) => state.authentication.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const awaitList = async () => {
      const list = await dispatch(getNotebooks(userId));
      await setArray(list.data);
      const cbookArray = list.data.filter((book) => {
        if (book.id == notebookId) {
          return book;
        }
      });
      await setCurrentBook(cbookArray[0]);
    };
    awaitList();
  }, [props.updateCount, notebookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const changedNote = await dispatch(changeBook(noteId, newBook));
    if (changedNote) {
      handleClose();
      props.setUpdateCount(props.updateCount + 1);
      history.push(`/dashboard/${changedNote.notebook}/${noteId}`);
    }
  };

  if (!notebookArray || !currentBook) {
    return (
      <>
        <Button variant="secondary" onClick={handleShow}>
          Change Notebook
        </Button>

        <Modal show={show} centered onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Choose a new notebook!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This is the last note in this notebook and cannot be moved. Add a
            new note to this notebook in order to move this one.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  if (notebookArray && currentBook) {
    return (
      <>
        <button className="sp-text" onClick={handleShow}>
          Change Notebook
        </button>

        <Modal show={show} centered onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Choose a new notebook!</Modal.Title>
          </Modal.Header>
          {currentBook["notes"].length > 1 ? (
            <>
              <Modal.Body>
                {
                  <Form onSubmit={handleSubmit}>
                    {notebookArray.map((notebook) => {
                      return (
                        <Form.Check
                          key={notebook.id}
                          type="radio"
                          label={notebook.title}
                          onClick={() => setNewBook(notebook.id)}
                        />
                      );
                    })}
                  </Form>
                }
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Body>
                This is the last note in this notebook and cannot be moved. Add
                a new note to this notebook in order to move this one.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </>
    );
  }
};

export default ChangeNotebook;
