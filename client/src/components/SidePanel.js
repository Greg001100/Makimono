import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams} from "react-router-dom";
import { Button } from "react-bootstrap";
import { createNote, } from "../actions/notes";
import Notebooks from "./Notebooks";
import NewNotebook from "./NewNotebook";
import Shortcuts from "./Shortcuts";

const SidePanel = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.authentication.user.id);
  const fullName = useSelector((state) => state.authentication.user.full_name);
  const {notebookId} = useParams();

  const handleCreateNote = async () => {
    const createdNote = await dispatch(createNote(userId, notebookId, "", ""));
    if (createdNote) {
      history.push(`/dashboard/${createdNote.notebook}/${createdNote.id}`);
    }
  };

  return (
    <>
      <p className="sp-text">{fullName}</p>
      <Shortcuts setAllNotes={(boolean)=> props.setAllNotes(boolean)} updateCount={props.updateCount} />
      <br/>
      <button onClick={() => props.setAllNotes(true)} className="sp-text">
        All Notes
      </button>
      <br/>
      <Notebooks setAllNotes={(boolean)=> props.setAllNotes(boolean)} updateCount={props.updateCount} setUpdateCount={count=> props.setUpdateCount(count)} />
      <br />
      <Button onClick={handleCreateNote}>Create Note</Button>
      <br />
      <NewNotebook updateCount={props.updateCount} setUpdateCount={count=> props.setUpdateCount(count)} />
      <br />
    </>
  );
};

export default SidePanel;
