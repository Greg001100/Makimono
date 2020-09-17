import React, { useState } from "react";
import Logout from "./Logout";
import { Button, Container, Col } from "react-bootstrap";
import NoteEditor from "./NoteEditor";
import NoteList from "./NoteList"
import SidePanel from "./SidePanel";




export default function Dashboard() {
    const [saveCount, setSaveCount] = useState(0)
    const [allNotes, setAllNotes] = useState(true)


    return (
        <>
            <Container fluid className="d-flex vh-100 vw-100 px-0">
                <Col xs='auto' className="bg-darker">
                    <SidePanel setAllNotes={(boolean)=> setAllNotes(boolean)}/>
                    <Button onClick={() => console.log(allNotes)}>all?</Button>
                    <Logout />
                </Col>
                <Col xs='auto' className="bg-lightgray">
                    <NoteList saveCount={saveCount} allNotes={allNotes} />
                </Col>
                <Col>
                    <NoteEditor setSaveCount={count => setSaveCount(count)} saveCount={saveCount} />
                </Col>

            </Container>
        </>
    )
}
