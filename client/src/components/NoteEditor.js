import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import SunEditor, { buttonList } from "suneditor-react";
import "../../node_modules/suneditor/dist/css/suneditor.min.css";
import { useDispatch } from "react-redux";
import { createNote, updateNote, getNote } from "../actions/notes";
import { useParams } from "react-router-dom";

const NoteEditor = (props) => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const { notebookId } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const awaitNote = async () => {
      const note = await dispatch(getNote(noteId));
      await setContent(note.content);
      await setTitle(note.title);
    };
    awaitNote();
  }, [noteId]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const savedNote = await dispatch(
        updateNote(noteId, title, notebookId, content)
      );
      await props.setSaveCount(props.saveCount + 1);
      await console.log("saved");
    }, 3000);
    return () => clearTimeout(timer)
  }, [content, title]);

  const handleChange = (changes) => {
    setContent(changes);
  };

  const changeTitle = (e) => setTitle(e.target.value);

  return (
    <>
      <Form.Control
        as="textarea"
        placeholder="Title"
        value={title}
        onChange={changeTitle}
      />
      <SunEditor
        setContents={content}
        onChange={handleChange}
        setOptions={{
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list"],
            ["table", "link", "image", "video"],
            ["fullScreen"],
          ],
        }}
      />
    </>
  );
};

export default NoteEditor;
