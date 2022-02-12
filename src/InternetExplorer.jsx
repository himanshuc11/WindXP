import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import FrameContainer from './FrameContainer';

const permissions = ["allow-same-origin", "allow-scripts" ,"allow-popups" ,"allow-forms"]

function createIframe() {

    const iframe = document.createElement('iframe')
    iframe.src = "https://www.google.com/webhp?igu=1"
    iframe.style.zIndex = 10
    iframe.style.width = "50vw"
    iframe.style.height = "50vh"
    
    
    for(let i = 0; i < permissions.length; i++) {
        iframe.sandbox.add(permissions[i])
    }

    return iframe
}

function InternetExplorer() {
    const internetExplorerIframeRef = useRef()

    const [showIframe, setShowIframe] = useState(false)

    useEffect(() => {
        if(!showIframe) return

        let container = document.querySelector('.frame-container')
        let copy = internetExplorerIframeRef.current
        container.appendChild(copy)

        return () => {
            copy.remove()
        } 
    }, [showIframe])
    
    const handleDoubleClick = () => {
        internetExplorerIframeRef.current = createIframe()
        setShowIframe(true)
    }

    const url = "data:image/png;base64,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";
    return (
    <Draggable>
        <div className='app-container' onDoubleClick={handleDoubleClick}>
            <img src={url} alt="Internet Explorer" draggable={false} />
            <span>Internet Explorer</span>
            {showIframe ? <FrameContainer explorer={internetExplorerIframeRef} setter={setShowIframe}></FrameContainer>: <></>}
        </div>
    </Draggable>
    )
}

export default InternetExplorer;
