import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import SunEditor from 'suneditor-react';
import '../../node_modules/suneditor/dist/css/suneditor.min.css';

const NoteEditor = props => {

    return (
        <SunEditor setContents="My Contents" />
    )
}

export default NoteEditor
