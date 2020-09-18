import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Link } from "react-router-dom";
import { Button, Collapse } from "react-bootstrap";
import { createNote, getNotebooks, removeShortcut, addShortcut} from "../actions/notes";
import { Star, StarFill } from "react-bootstrap-icons";

const Notebooks = (props) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.authentication.user.id);
    const [notebookArray, setArray] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const awaitList = async () => {
          const list = await dispatch(getNotebooks(userId));
          await setArray(list.data);
        };
        awaitList();
      }, [props.updateCount]);

    const handleClick = () => {
        setTimeout(()=> props.setAllNotes(false), 1000)
    }

    const toggleShortCut = async (id, shortcut, type) => {
        if (shortcut) {
          await dispatch(removeShortcut(id, type))
          props.setUpdateCount(props.updateCount +1)
        } else {
          await dispatch(addShortcut(id, type))
          props.setUpdateCount(props.updateCount +1)
        }
      }

    if (notebookArray) {
        return (
            <>
                <button onClick={() => setOpen(!open)}
                aria-controls="notebook-list"
                aria-expanded={open}
                className="sp-text">
                    Notebooks
                </button>
                <Collapse in={open}>
                    <div className="sp-text" id='notebook-list'>
                        {notebookArray.map((notebook) => {
                            return (
                                <p key={notebook.id}>
                                    <Link onClick={handleClick} className="sp-text" to={`/dashboard/${notebook.id}/${notebook.latest_note}`}>{notebook.title}</Link>
                                    <button onClick={() => {toggleShortCut(notebook.id, notebook.shortcut, "notebook")}} >{notebook.shortcut? <StarFill color="gold"/> : <Star className="star"/>}</button>
                                </p>
                            )
                        })}
                    </div>
                </Collapse>
            </>
        )
    }

    return (
        <p>Notebooks</p>
    )
}

export default Notebooks
