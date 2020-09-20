import React, { useState, useEffect } from "react";
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
import { Card } from "react-bootstrap";

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
    // allNotesArray.sort(function(a,b){
    //   return b.updatedAt-a.updatedAt;
    // });
    console.log(allNotesArray)
    return (
      <div className='overflow-auto'>
        <h3 className="d-flex py-2 my-2 justify-content-center">All Notes</h3>
        {allNotesArray.map((note) => {
          return (
            <Link
              className="special_a"
              to={`/dashboard/${notebookId}/${note.id}`}
            >
              <Card className="content_card overflow-hidden bg-light">
                <Card.Body className="overflow-hidden ">
                  <div className="d-flex justify-content-between">
                    <Card.Title className="xs-4">
                      {note.title ? note.title : "Untitled"}
                    </Card.Title>
                    <div className="xs">
                      <button
                        onClick={() => {
                          toggleShortCut(note.id, note.shortcut, "note");
                        }}
                      >
                        {note.shortcut ? (
                          <StarFill size=".75em" color="gold" />
                        ) : (
                          <Star size=".75em" className="star" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Card.Text className="text-muted">
                    <span
                      className="overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: note.content }}
                    ></span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted border-0 bg-light small_text">
                  <div>Edited: {note.updatedAt.slice(0, 16)}</div>
                </Card.Footer>
              </Card>
            </Link>
          );
        })}
      </div>
    );
  } else if (noteBookArray) {
    // noteBookArray.sort(function(a,b){
    //   return b.updatedAt-a.updatedAt;
    // });
    console.log(noteBookArray)
    return (
      <>
        <h3 className="d-flex py-2 my-2 justify-content-center">{bookName}</h3>
        {noteBookArray.map((note) => {
          return (
            <Link
              className="special_a"
              to={`/dashboard/${notebookId}/${note.id}`}
            >
              <Card className="content_card overflow-hidden bg-light">
                <Card.Body className="overflow-hidden ">
                  <div className="d-flex justify-content-between">
                    <Card.Title className="">
                      {note.title ? note.title : "Untitled"}
                    </Card.Title>
                    <div className="d-flex align-self-start">
                      <button
                        onClick={() => {
                          toggleShortCut(note.id, note.shortcut, "note");
                        }}
                      >
                        {note.shortcut ? (
                          <StarFill size=".75em" color="gold" />
                        ) : (
                          <Star size=".75em" className="star" />
                        )}
                      </button>
                      {noteBookArray.length > 1 ? (
                        <DeleteNote
                          noteId={note.id}
                          setUpdateCount={(count) =>
                            props.setUpdateCount(count)
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                  <Card.Text className="text-muted">
                    <span
                      className="overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: note.content }}
                    ></span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted border-0 bg-light small_text">
                  <div>Edited: {note.updatedAt.slice(0, 16)}</div>
                </Card.Footer>
              </Card>
            </Link>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <h1 className="d-flex py-2 my-2 justify-content-center"></h1>
      </>
    );
  }
};

export default NoteList;
