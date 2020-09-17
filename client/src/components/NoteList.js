import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  updateNote,
  getNote,
  getList,
  getBookName,
  getAllNotes,
} from "../actions/notes";
import { useParams, Link } from "react-router-dom";

const NoteList = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.user.id);
  const { noteId } = useParams();
  const { notebookId } = useParams();
  const [noteBookArray, setBookArray] = useState([]);
  const [bookName, setBookName] = useState("");
  const [allNotesArray, setAllNotesArray] = useState([]);

  useEffect(() => {
    const awaitList = async () => {
      const bookList = await dispatch(getList(notebookId));
      const name = await dispatch(getBookName(notebookId));
      const allNotesList = await dispatch(getAllNotes(userId));
      await setBookArray(bookList.data);
      await setBookName(name.data);
      await setAllNotesArray(allNotesList.data);
    };
    awaitList();
  }, [notebookId, noteId, props.saveCount]);

  if (props.allNotes) {
    return (
      <>
        <h3>All Notes</h3>
        {allNotesArray.map((note) => {
          return (
            <p key={note.id}>
              <Link to={`/dashboard/${notebookId}/${note.id}`}>
                {note.title ? note.title : "Untitled"}
              </Link>
            </p>
          );
        })}
      </>
    );
  } else if (noteBookArray) {
    return (
      <>
        <h3>{bookName}</h3>
        {noteBookArray.map((note) => {
          return (
            <p key={note.id}>
              <Link to={`/dashboard/${notebookId}/${note.id}`}>
                {note.title ? note.title : "Untitled"}
              </Link>
            </p>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <h1>Note List</h1>
      </>
    );
  }
};

export default NoteList;
