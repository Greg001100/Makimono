import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getList,
  getBookName,
  getAllNotes,
  removeShortcut,
  addShortcut,
} from "../actions/notes";
import { useParams, Link } from "react-router-dom";
import { Star, StarFill } from "react-bootstrap-icons";
import DeleteNote from "./DeleteNote";

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
  }, [notebookId, noteId, props.saveCount, props.updateCount]);

  const toggleShortCut = async (id, shortcut, type) => {
    if (shortcut) {
      await dispatch(removeShortcut(id, type));
      props.setUpdateCount(props.updateCount + 1);
    } else {
      await dispatch(addShortcut(id, type));
      props.setUpdateCount(props.updateCount + 1);
    }
  };

  if (props.allNotes) {
    return (
      <>
        <h3>All Notes</h3>
        {allNotesArray.map((note) => {
          return (
            <p key={note.id}>
              <Link to={`/dashboard/${note.notebook}/${note.id}`}>
                {note.title ? note.title : "Untitled"}
              </Link>
              <button
                onClick={() => {
                  toggleShortCut(note.id, note.shortcut, "note");
                }}
              >
                {note.shortcut ? (
                  <StarFill color="gold" />
                ) : (
                  <Star size=".75em" className="star" />
                )}
              </button>
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
              <button
                onClick={() => {
                  toggleShortCut(note.id, note.shortcut, "note");
                }}
              >
                {note.shortcut ? (
                  <StarFill color="gold" />
                ) : (
                  <Star size=".75em" className="star" />
                )}
              </button>
              {noteBookArray.length > 1 ? (
                <DeleteNote
                  noteId={note.id}
                  setUpdateCount={(count) => props.setUpdateCount(count)}
                />
              ) : null}
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
