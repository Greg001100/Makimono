import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Link } from "react-router-dom";
import {
  Button,
  Collapse,
  Popover,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  createNote,
  getNotebooks,
  removeShortcut,
  addShortcut,
} from "../actions/notes";
import { Journals, Star, StarFill, ThreeDots, CaretDownFill, CaretRightFill, } from "react-bootstrap-icons";
import OptionsPop from "./OptionsPop";

const Notebooks = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.user.id);
  const [notebookArray, setArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);

  useEffect(() => {
    const awaitList = async () => {
      const list = await dispatch(getNotebooks(userId));
      await setArray(list.data);
    };
    awaitList();
  }, [props.updateCount]);

  const handleClick = () => {
    setTimeout(() => props.setAllNotes(false), 1000);
  };

  const toggleShortCut = async (id, shortcut, type) => {
    if (shortcut) {
      await dispatch(removeShortcut(id, type));
      props.setUpdateCount(props.updateCount + 1);
    } else {
      await dispatch(addShortcut(id, type));
      props.setUpdateCount(props.updateCount + 1);
    }
  };

  const handleOpen = () => {
    setArrowDown(!arrowDown);
    setOpen(!open);
  };

  if (notebookArray) {
    return (
      <div className='my-2'>
        <button
          onClick={handleOpen}
          aria-controls="notebook-list"
          aria-expanded={open}
          className="sp-text"
        >
          {arrowDown ? <CaretDownFill /> : <CaretRightFill />}
          <Journals className="mx-1" />
          Notebooks
        </button>
        <Collapse in={open}>
          <div className="sp-text" id="notebook-list">
            {notebookArray.map((notebook) => {
              return (
                <p clasName='my-0 py-0' key={notebook.id}>
                  <button
                    onClick={() => {
                      toggleShortCut(
                        notebook.id,
                        notebook.shortcut,
                        "notebook"
                      );
                    }}
                  >
                    {notebook.shortcut ? (
                      <StarFill className='mx-2' color="gold" />
                    ) : (
                      <Star className=" mx-2 star" />
                    )}
                  </button>
                  <Link
                    onClick={handleClick}
                    className="sp-text"
                    to={`/dashboard/${notebook.id}/${notebook.latest_note}`}
                  >
                    {notebook.title}
                  </Link>
                  <OptionsPop
                    notebookId={notebook.id}
                    setUpdateCount={(count) => props.setUpdateCount(count)}
                  />
                </p>
              );
            })}
          </div>
        </Collapse>
      </div>
    );
  }

  return <p>Notebooks</p>;
};

export default Notebooks;
