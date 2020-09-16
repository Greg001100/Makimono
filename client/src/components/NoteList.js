import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNote, updateNote, getNote } from "../actions/notes";
import { useParams } from "react-router-dom";

const NoteList = (props) => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const { notebookId } = useParams();
  const [noteArray, setArray] = useState("")

  useEffect(() => {
    const awaitList = async () => {
      const list = await dispatch(getList(notebookId));
      await setArray(list);
    };
    awaitList();
  }, [notebookId]);
}

return (
    <>
        {noteArray}
    </>
)
