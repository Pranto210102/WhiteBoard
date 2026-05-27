import {createContext} from 'react';

export const BoardContext = createContext({
    activeTool: '',
    elements: [],
    history: [[]],
    index: 0,
    TOOL_ACTIONS_TYPES: '',
    handleToolItemClick: () => {},
    boardMouseDownEventHandler: () => {},
    boardMouseMoveEventHandler: () => {},
    boardMouseUpEventHandler: () => {},
    boardMouseUpEventHandler: () => {},
})

export default BoardContext;