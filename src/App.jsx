import React from 'react'
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import BoardProvider from './components/store/BoardProvider'

function App() {
  return (
    <>
     <BoardProvider>
        <Toolbar />
        <Board />
     </BoardProvider>
    </>
  )
}

export default App
