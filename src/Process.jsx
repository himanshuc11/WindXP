import React from 'react'
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";
import "./FrameContainer.css"
import {processStates} from './App'
import Draggable from 'react-draggable'
import Portfolio from './Portfolio';


function Process({id, name, type, dispatch}) {

    const processMapper = {
        'Internet Explorer': <iframe draggable={false} src="https://www.google.com/webhp?igu=1" width={"100%"} height={"100%"}></iframe>,
        'Paint': <iframe draggable={false} src='https://jspaint.app' width={"100%"} height={"100%"}></iframe>,
        'Notepad': <textarea style={{boxSizing: "border-box", width: "100%", height: "100%"}}></textarea>,
        'My Computer': <Portfolio></Portfolio>
    }

    const handleClose = () => {
        dispatch({id: id, name: name, type: processStates.CLOSE})
    }

    const handleMaximize = () => {
        if(type === processStates.MIDDLE) {
            dispatch({id: id, name: name, type: processStates.MAXIMIZE})
            return
        }
        dispatch({id: id, name: name, type: processStates.MIDDLE})
    }

    const handleMinimize = () => {
        dispatch({id: id, name: name, type: processStates.MINIMIZE})
    }

    let styling = {}
    if(type === processStates.MAXIMIZE) {
        styling = {'display': 'block','width': '100%', 'height': "calc(100vh - 30px)", 'top': '0px', 'right': '0px'}
    }
    if(type === processStates.MIDDLE) {
        styling = {'display': 'block','width': '50%', 'height': '50vh', top: '0px', left: '0px'}
    }
    if(type === processStates.MINIMIZE) {
        styling = {'display': 'none'}
    }

    const data = (
        <div className='frame-container' id={id} style={styling}>
            {name}
            <div className='button-container'>
                <button className='close' onClick={handleClose}><VscChromeClose></VscChromeClose></button>
                <button className='maximize' onClick={handleMaximize}><VscChromeMaximize></VscChromeMaximize></button>
                <button className='minimize' onClick={handleMinimize}><VscChromeMinimize></VscChromeMinimize></button>
            </div>
            {processMapper[name]}
        </div>
    )

  
    let positonValue;
    if(type === processStates.MAXIMIZE) {
        positonValue = {x: 0, y: 0}
    }
    else {
        positonValue = null
    }

  return (
    <Draggable onStart={() => type !== processStates.MAXIMIZE} position={positonValue}>
        {data}
    </Draggable>
  )
}

export default Process