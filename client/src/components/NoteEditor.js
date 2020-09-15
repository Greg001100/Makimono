import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
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

  useEffect(() => {
    const awaitNote = async () => {
      const note = await dispatch(getNote(noteId));
      await setContent(note.content);
    };
    awaitNote();
  }, [noteId]);

  const handleChange = (changes) => {
    setContent(changes);
  };

  const handleCreate = async () => {
    const createdNote = await dispatch(createNote(4, 1, "demo note", content));
    await console.log(createdNote);
  };

  const handleSave = async () => {
    const savedNote = await dispatch(
      updateNote(2, "updated", 1, content, false)
    );
  };

  return (
    <>
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
      <Button onClick={handleCreate}>create</Button>
      <Button onClick={handleSave}>save</Button>
    </>
  );
};

export default NoteEditor;
