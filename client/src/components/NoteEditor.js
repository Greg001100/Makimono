import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import SunEditor, {buttonList} from 'suneditor-react';
import '../../node_modules/suneditor/dist/css/suneditor.min.css';
import { useDispatch } from "react-redux";
import { createNote } from "../actions/notes";

const NoteEditor = props => {
    const dispatch = useDispatch()
    const [note, setNote] = useState('My Contents')

    const handleChange = (changes) => {
        setNote(changes)
    }

    const handleClick = async () => {
        const newNote = await dispatch(createNote(4, 1, "demo note", note))
        await console.log(newNote)
    }

    return (
        <>
            <SunEditor setContents={note} onChange={handleChange} save={handleClick} setOptions={{buttonList:[
                    ['undo', 'redo'],
                    ['font', 'fontSize', 'formatBlock'],
                    ['paragraphStyle', 'blockquote'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor', 'hiliteColor', 'textStyle'],
                    ['removeFormat'],
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list'],
                    ['table', 'link', 'image', 'video'],
                    ['fullScreen'],
                  ]}}  />
            <Button onClick={handleClick}>Save</Button>
        </>
    )
}

export default NoteEditor
