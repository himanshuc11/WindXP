import React from 'react';
import "./FrameContainer.css"

import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";

function FrameContainer({explorer, setter}) {
  
  const handleClose = (e) => {
    setter(false)
  }

  return (
      <div className='frame-container' id='internet-explorer'>
          <div className='button-container'>
            <button className='close' onClick={handleClose}><VscChromeClose></VscChromeClose></button>
            <button className='maximize'><VscChromeMaximize></VscChromeMaximize></button>
            <button className='minimize'><VscChromeMinimize></VscChromeMinimize></button>
          </div>
      </div>
  )
}

export default FrameContainer;
