import React, { useState } from "react";
import Logout from "./Logout";
import { Button, Container, Col } from "react-bootstrap";
import NoteEditor from "./NoteEditor";
import NoteList from "./NoteList"
import SidePanel from "./SidePanel";




export default function Dashboard() {
    const [note, setNote] = useState('')
    const [noteBook, setNoteBook] = useState('')

    return (
        <>
            <Container fluid className="d-flex vh-100 vw-100 px-0">
                <Col xs='auto' className="bg-darker">
                    <SidePanel />
                    <Logout />
                </Col>
                <Col xs='auto' className="bg-lightgray">
                    <NoteList />
                </Col>
                <Col>
                    <NoteEditor note={note} />
                </Col>

            </Container>
        </>
    )
}
