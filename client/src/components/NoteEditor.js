import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import SunEditor, { buttonList } from "suneditor-react";
import "../../node_modules/suneditor/dist/css/suneditor.min.css";
import { useDispatch } from "react-redux";
import { createNote, updateNote, getNote, getBookName } from "../actions/notes";
import { useParams } from "react-router-dom";
import { ArrowRightCircleFill, Check2, Journals } from "react-bootstrap-icons";
import ChangeNotebook from "./ChangeNotebook";

const NoteEditor = (props) => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const { notebookId } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [bookName, setBookName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const awaitNote = async () => {
      const note = await dispatch(getNote(noteId));
      const name = await dispatch(getBookName(notebookId));
      await setContent(note.content);
      await setTitle(note.title);
      await setBookName(name.data);
    };
    awaitNote();
  }, [noteId]);

  useEffect(() => {
    setSaving(true);
    const timer = setTimeout(async () => {
      const savedNote = await dispatch(
        updateNote(noteId, title, notebookId, content)
      );
      await props.setSaveCount(props.saveCount + 1);
      await console.log("saved");
      await setSaving(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [content, title]);

  const handleChange = (changes) => {
    setContent(changes);
  };

  const changeTitle = (e) => setTitle(e.target.value);

  return (
    <>
      <div className="sp-text d-flex align-items-center mt-2 mb-0 pb-0 justify-content-between">
        <div className="d-flex align-items-center mt-2 mb-0 pb-0">
          <Journals />
          <p className="my-0 py-0 px-1 journal">{bookName}</p>
          <div className="sp-text align-items-center hide_journal px-1">
            <ArrowRightCircleFill />{" "}
            <ChangeNotebook
              updateCount={props.updateCount}
              setUpdateCount={(count) => props.setUpdateCount(count)}
            />
          </div>
        </div>
        {saving ? (
          <div class="spinner-border spinner-border-sm text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <p className='my-0'><Check2 size='1.5em' color="blue"/> saved</p>
        )}
      </div>
      <Form.Control
        as="input"
        placeholder="Title"
        value={title}
        className="font-weight-bold title border-0 mh-auto mt-0 pt-0"
        onChange={changeTitle}
        maxLength={50}
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
