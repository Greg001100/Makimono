import React, { useState } from "react";
import Logout from "./Logout";
import { Container, Col, Row } from "react-bootstrap";

import NoteEditor from "./NoteEditor";
import NoteList from "./NoteList";
import SidePanel from "./SidePanel";
import ChangeNotebook from "./ChangeNotebook";

export default function Dashboard() {
  const [saveCount, setSaveCount] = useState(0);
  const [allNotes, setAllNotes] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  return (
    <>
      <Container fluid className="d-flex vh-100 vw-100 fullscreen">
        <Row className='flex-grow-1'>
          <Col xs={3} className="bg-darker d-flex flex-column justify-content-between px250">
            <div>
              <SidePanel
                setAllNotes={(boolean) => setAllNotes(boolean)}
                updateCount={updateCount}
                setUpdateCount={(count) => setUpdateCount(count)}
              />
            </div>
            <Logout />
          </Col>
          <Col xs={3} className="bg-lightgray h-100 px300 border d-flex flex-column mx-0 px-0 overflow-auto">
            <NoteList
              saveCount={saveCount}
              allNotes={allNotes}
              updateCount={updateCount}
              setUpdateCount={(count) => setUpdateCount(count)}
            />
          </Col>
          <Col className='p-0 overflow-hidden'>
            <NoteEditor
              setSaveCount={(count) => setSaveCount(count)}
              saveCount={saveCount}
              updateCount={updateCount}
              setUpdateCount={(count) => setUpdateCount(count)}
              className='mx-0 px-0 overflow-hidden'
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
