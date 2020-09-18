import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Link } from "react-router-dom";
import { Button, Collapse } from "react-bootstrap";
import { getShortcuts } from "../actions/notes";

const Shortcuts = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.user.id);
  const [notebookArray, setBookArray] = useState([]);
  const [noteArray, setNoteArray] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const awaitList = async () => {
      const list = await dispatch(getShortcuts(userId));
      await setBookArray(list.notebooks);
      await setNoteArray(list.notes);
    };
    awaitList();
  }, [props.updateCount]);

  const handleClick = () => {
    setTimeout(() => props.setAllNotes(false), 1000);
  };

  if (notebookArray || noteArray) {
    return (
      <>
        <button
          onClick={() => setOpen(!open)}
          aria-controls="shortcut-list"
          aria-expanded={open}
          className="sp-text"
        >
          Shortcuts
        </button>
        <Collapse in={open}>
          <div className="sp-text" id="shortcut-list">
            {notebookArray.map((notebook) => {
              return (
                <p key={notebook.id}>
                  <Link
                    onClick={handleClick}
                    className="sp-text"
                    to={`/dashboard/${notebook.id}/${notebook.latest_note}`}
                  >
                    {notebook.title}
                  </Link>
                </p>
              );
            })}
            {noteArray.map((note) => {
              return (
                <p key={note.id}>
                  <Link
                    className="sp-text"
                    to={`/dashboard/${note.notebook}/${note.id}`}
                  >
                    {note.title ? note.title : "Untitled"}
                  </Link>
                </p>
              );
            })}
          </div>
        </Collapse>
      </>
    );
  }

  return <p className="sp-text">Shortcuts</p>;
};

export default Shortcuts;
