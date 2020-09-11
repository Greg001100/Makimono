import React, { useState } from "react";
import Logout from "./Logout";
import { Button } from "react-bootstrap";
import NoteEditor from "./NoteEditor";




export default function Dashboard() {
    const [value, setValue] = useState('')
    return (
        <>
            <h1>Dashboard Content</h1>
            <NoteEditor value= 'test' currentState='test'/>
            <Logout />
        </>
    )
}
