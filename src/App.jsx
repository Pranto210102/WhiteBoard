import React from 'react'
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import BoardProvider from './components/store/BoardProvider'
import ToolboxProvider from './components/store/ToolboxProvider'
import Toolbox from './components/Toolbox'

function App() {
  return (
    <>
     <BoardProvider>
      <ToolboxProvider>
          <Toolbox />
          <Toolbar />
          <Board />
      </ToolboxProvider>
     </BoardProvider>
    </>
  )
}

export default App
