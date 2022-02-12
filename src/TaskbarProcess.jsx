import React from 'react'
import "./TaskbarProcess.css"
import { processStates } from './App'

function TaskbarProcess({process, processDispatch}) {

  const handleClick = () => {
    console.log(processDispatch)
    if(process.type === processStates.MINIMIZE) {
      // Now we Want to Maximize
      processDispatch({...process, type: processStates.MAXIMIZE})
      return
    }
    // We want to minimize
    processDispatch({...process, type: processStates.MINIMIZE})
  }

  return (
    <div className='taskbar-process' onClick={handleClick}>
        <p>{process.name}</p>
    </div>
  )
}

export default TaskbarProcess