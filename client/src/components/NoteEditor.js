import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import SunEditor, { buttonList } from "suneditor-react";
import "../../node_modules/suneditor/dist/css/suneditor.min.css";
import { useDispatch } from "react-redux";
import {
  createNote,
  updateNote,
  getNote,
  getBookName,
  newNotebook,
} from "../actions/notes";
import { useParams } from "react-router-dom";
import { ArrowRightCircleFill, Check2, Journals } from "react-bootstrap-icons";
import ChangeNotebook from "./ChangeNotebook";

function getWindowDimensions() {
  const { innerHeight: height } = window;
  return {
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const NoteEditor = (props) => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const { notebookId } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [bookName, setBookName] = useState("");
  const [saving, setSaving] = useState(false);
  const isFirstRun = useRef(true);
  const { height } = useWindowDimensions();

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
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setSaving(true);
    const timer = setTimeout(async () => {
      const savedNote = await dispatch(
        updateNote(noteId, title, notebookId, content)
      );
      await props.setSaveCount(props.saveCount + 1);
      await console.log("saved");
      await setSaving(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [content, title]);

  const handleChange = (changes) => {
    setContent(changes);
  };

  const changeTitle = (e) => setTitle(e.target.value);

  return (
    <div className="h-100 w-100 d-inline-block mx-0 px-0">
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
          <div className="d-flex py-0 my-0">
            <div
              className="spinner-border py-0 my-0 spinner-border-sm text-primary"
              role="status"
            >
              <span className="sr-only py-0 my-0">Loading...</span>
            </div>
            <p className="mx-2 py-0 my-0">saving</p>
          </div>
        ) : (
          <p className="my-0 mx-2">
            <Check2 size="1.5em" className="text-primary" /> saved
          </p>
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
        height={height - 234}
        className="border-0"
        setOptions={{
          className: "border-0",
          showPathLabel: false,
          resizingBar: false,
          katex: 'katex',
          buttonList: [
            //default
            ["fullScreen"],
            ["undo", "redo"],
            ["removeFormat"],
            "/",
            ["font", "fontSize", "formatBlock"],
            ["fontColor", "hiliteColor", "textStyle"],
            ["bold", "underline", "italic"],
            ["paragraphStyle", "blockquote"],
            ["align", "horizontalRule", "list", "outdent", "indent"],
            ["strike", "subscript", "superscript"],
            ["table", "link", "image", "video"],
            //(min-width: 1600)
            [
              "%1600",
              [
                ["fullScreen"],
                ["undo", "redo"],
                ["removeFormat"],
                "/",
                ["font", "fontSize", "formatBlock"],
                ["fontColor", "hiliteColor", "textStyle"],
                ["bold", "underline", "italic"],
                ["paragraphStyle", "blockquote"],
                ["align", "horizontalRule", "list", "outdent", "indent"],
                [":i-More Options-default.more_vertical", "strike", "subscript", "superscript", "table", "link", "image", "video" ]
              ],
            ],
            //min width 1355
            [
              "%1355",
              [
                ["fullScreen"],
                ["undo", "redo"],
                ["removeFormat"],
                "/",
                ["font", "fontSize", "formatBlock"],
                ["fontColor", "hiliteColor", "textStyle"],
                ["bold", "underline", "italic"],
                [":i-More Options-default.more_vertical", "align", "horizontalRule", "list", "outdent", "indent", "paragraphStyle", "blockquote", "strike", "subscript", "superscript", "table", "link", "image", "video" ]
              ],
            ],
            //min width 1065
            [
              "%1065",
              [
                ["fullScreen"],
                ["font", "fontSize", "formatBlock"],
                ["removeFormat"],
                "/",
                ["undo", "redo"],
                ["fontColor", "hiliteColor", "textStyle"],
                ["bold", "underline", "italic"],
                [":i-More Options-default.more_vertical", "align", "horizontalRule", "list", "outdent", "indent", "paragraphStyle", "blockquote", "strike", "subscript", "superscript", "table", "link", "image", "video" ]
              ],
            ],
          ],
        }}
      />
    </div>
  );
};

export default NoteEditor;
