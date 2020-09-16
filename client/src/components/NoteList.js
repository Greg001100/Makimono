import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNote, updateNote, getNote, getList } from "../actions/notes";
import { useParams, Link } from "react-router-dom";

const NoteList = (props) => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const { notebookId } = useParams();
  const [noteArray, setArray] = useState([]);

  useEffect(() => {
    const awaitList = async () => {
      const list = await dispatch(getList(notebookId));
      await setArray(list.data);
    };
    awaitList();
  }, [notebookId, noteId]);

  if (noteArray) {
      return (
          <>
            {noteArray.map((note) => {
                return (
                    <p key={note.id}>
                        <Link to={`/dashboard/${notebookId}/${note.id}`}>{note.title}</Link>
                    </p>
                )
            })}
          </>
      )
  }
  return (
    <>
      <h1>note list</h1>
    </>
  );
};

export default NoteList;
