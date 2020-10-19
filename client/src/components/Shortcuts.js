import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { getShortcuts } from "../actions/notes";
import { CaretDownFill, CaretRightFill, StarFill, Journals, JournalText } from "react-bootstrap-icons";

const Shortcuts = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.user.id);
  const [notebookArray, setBookArray] = useState([]);
  const [noteArray, setNoteArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrowDown, setArrowDown] = useState(false)

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

  const handleOpen =() => {
    setArrowDown(!arrowDown);
    setOpen(!open)
  }

  if (notebookArray || noteArray) {
    return (
      <div className='my-2'>
        <button
          onClick={handleOpen}
          aria-controls="shortcut-list"
          aria-expanded={open}
          className="sp-text"
        >
          {arrowDown? <CaretDownFill /> : <CaretRightFill />}
          <StarFill className='mx-1'/>
          Shortcuts
        </button>
        <Collapse in={open}>
          <div className="sp-text" id="shortcut-list">
            {notebookArray.map((notebook) => {
              return (
                <p className='my-0 py-0' key={notebook.id}>
                  <Journals className='mx-2'/>
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
                <p className='my-0 py-0' key={note.id}>
                  <JournalText className='mx-2'/>
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
      </div>
    );
  }

  return <p className="sp-text">Shortcuts</p>;
};

export default Shortcuts;
