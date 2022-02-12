import { useReducer, createContext, useEffect } from 'react'
import './App.css'
import Taskbar from './Taskbar'
import StartBar from './StartBar'
import InternetExplorer from './InternetExplorer'
import { v4 as uuidv4 } from 'uuid';
import Process from './Process'
import Draggable from 'react-draggable'


function startReducer(state, action) {
  let newState;
  switch(action.type) {
    case 'start': 
      newState = !state
      break
    case 'else':
      newState = false
      break
    default:
      throw new Error('Cannot Handle Start Menu popup')
  }
  return newState
}


// CREATE is for Spawn
// MIDDLE is for Middle View
// MAXIMIZE is for maximizing
// MINIMIZE is for minimizing
// On closing process, removed from processList

const processStates = {
  CREATE: "create",
  MAXIMIZE: "maximize",
  MINIMIZE: "minimize",
  MIDDLE: "middle",
  CLOSE: "close"
}
export {processStates}

function processReducer(state, action) {
  let newProcess
  switch(action.type) {
    case processStates.CREATE:
      newProcess = [...state]
      newProcess.push({...action, type: processStates.MIDDLE})
      break
    case processStates.MAXIMIZE:
      let toMaximize = state.find(process => process.id === action.id)
      let copy = {...toMaximize, type: processStates.MAXIMIZE}
      newProcess = state.filter((process) => process.id !== action.id)
      newProcess.push(copy)
      break
    case processStates.MIDDLE:
      let toMiddle = state.find(process => process.id === action.id)
      let ncopy = {...toMiddle, type: processStates.MIDDLE}
      newProcess = state.filter(process => process.id !== action.id)
      newProcess.push(ncopy)
      break
    case processStates.MINIMIZE:
      newProcess = state.map((process) => {
        if(process.id === action.id) {
          let copy =  {...process, type: processStates.MINIMIZE}
          return copy
        }
        return process
      })
      break
    case processStates.CLOSE:
      newProcess = state.filter((process) => process.id !== action.id)
      break
    default:
      throw new Error('Wrong State of process')
  }
  return newProcess
}

function App() {
  const [state, dispatch] = useReducer(startReducer, false)
  const [processes, processDispatch] = useReducer(processReducer, [])

  const showRunningProcesses = () => {
    const runningProcess = processes.filter((process) => process.type !== processStates.MINIMIZE).map((process) => {
      return <Process key={process.id} {...process} dispatch={processDispatch}></Process>
    })
    return runningProcess
  }

  return (
    <ShowbarContext.Provider value={dispatch}>
      <div className='App' onClick={() => dispatch({type: "else"})}>

        <div className='icon-container'>

          <Draggable>
            <div className='icon' onDoubleClick={() => processDispatch({id: uuidv4(), name: "Internet Explorer", type: processStates.CREATE})}>
              <img name="ie" draggable={false} src="data:image/png;base64,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" alt="Internet Explorer"></img>
              <div>Internet Explorer</div>
            </div>
          </Draggable>

          <Draggable>
            <div className='icon' onDoubleClick={() => processDispatch({id: uuidv4(), name: "Notepad", type: processStates.CREATE})}>
              <img name="notepad" draggable={false} src="data:image/png;base64,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"></img>
              <div>Notepad</div>
            </div>
          </Draggable>

          <Draggable>
            <div className='icon' onDoubleClick={() => processDispatch({id: uuidv4(), name: "Paint", type: processStates.CREATE})}>
              <img name="paint" draggable={false} src="data:image/png;base64,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"></img>
              <div>Paint</div>
            </div>
          </Draggable>

          <Draggable>
            <div className='icon' onDoubleClick={() => processDispatch({id: uuidv4(), name: "My Computer", type: processStates.CREATE})}>
              <img name="My Computer" draggable={false} src="data:image/png;base64,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" ></img>
              <div>Portfolio</div>
            </div>
          </Draggable>
        </div>
        

        {showRunningProcesses()}

        {state === true ? <StartBar processDispatch={processDispatch}></StartBar> : <></>}
        <div className='taskbar-container'>
          <Taskbar processes={processes} processDispatch={processDispatch}></Taskbar>
        </div>
      </div>
    </ShowbarContext.Provider>
  );
}

export default App;
export const ShowbarContext = createContext()
