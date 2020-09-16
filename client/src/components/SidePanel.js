import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams} from "react-router-dom";
import { Button } from "react-bootstrap";
import { createNote, getNotebooks } from "../actions/notes";
import Notebooks from "./Notebooks";

const SidePanel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.authentication.user.id);
  const fullName = useSelector((state) => state.authentication.user.full_name);
  const {notebookId} = useParams();

  const handleCreate = async () => {
    const createdNote = await dispatch(createNote(userId, notebookId, "placeholder", ""));
    await console.log(createdNote);
    if (createdNote) {
      history.push(`/dashboard/${createdNote.notebook}/${createdNote.id}`);
    }
  };

  return (
    <>
      <p className="sp-text">{fullName}</p>
      <Notebooks />
      <Button onClick={handleCreate}>create</Button>
    </>
  );
};

export default SidePanel;
