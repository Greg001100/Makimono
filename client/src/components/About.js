import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import {
  CaretDownFill,
  CaretRightFill,
} from "react-bootstrap-icons";

const About = (props) => {
  const [open, setOpen] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);

  const handleOpen = () => {
    setArrowDown(!arrowDown);
    setOpen(!open);
  };


    return (
      <div className="my-2">
        <button
          onClick={handleOpen}
          aria-controls="notebook-list"
          aria-expanded={open}
          className="sp-text"
        >
          {arrowDown ? <CaretDownFill /> : <CaretRightFill />}
           <span className="sp-text"> About the Developer</span>
        </button>
        <Collapse in={open}>
          <div className="sp-text mx-4" id="notebook-list">
            <a className='sp-text' href="https://greg001100.github.io/" target='_blank' rel="noopener noreferrer">Portfolio/Resume</a>
            <br/>
            <a className='sp-text' href="https://www.linkedin.com/in/greglloyd1/" target='_blank' rel="noopener noreferrer">Linkedin</a>
            <br/>
            <a className='sp-text' href="https://github.com/Greg001100" target='_blank' rel="noopener noreferrer">Github</a>
          </div>
        </Collapse>
      </div>
    );
};

export default About;
