import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { createNote } from "../actions/notes";
import Notebooks from "./Notebooks";
import NewNotebook from "./NewNotebook";
import Shortcuts from "./Shortcuts";
import { JournalText } from "react-bootstrap-icons";

const SidePanel = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.authentication.user.id);
  const fullName = useSelector((state) => state.authentication.user.full_name);
  const { notebookId } = useParams();

  const handleCreateNote = async () => {
    const createdNote = await dispatch(createNote(userId, notebookId, "", ""));
    if (createdNote) {
      history.push(`/dashboard/${createdNote.notebook}/${createdNote.id}`);
    }
  };

  return (
    <>
      <p className="sp-text large-text">{fullName}</p>
      <br />
      <Button className='my-3' block size='sm' onClick={handleCreateNote}>+ New Note</Button>
      <NewNotebook
        updateCount={props.updateCount}
        setUpdateCount={(count) => props.setUpdateCount(count)}
      />
      <br />

      <button onClick={() => props.setAllNotes(true)} className="sp-text text-left my-2">
        <JournalText className="mx-2" />
        All Notes
      </button>

      <Notebooks
        notebookArray={props.notebookArray}
        setAllNotes={(boolean) => props.setAllNotes(boolean)}
        updateCount={props.updateCount}
        setUpdateCount={(count) => props.setUpdateCount(count)}
      />

      <Shortcuts
        setAllNotes={(boolean) => props.setAllNotes(boolean)}
        updateCount={props.updateCount}
      />

    </>
  );
};

export default SidePanel;
