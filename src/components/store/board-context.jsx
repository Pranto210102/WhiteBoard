import {createContext} from 'react';

export const BoardContext = createContext({
    activeTool: '',
    elements: [],
    TOOL_ACTIONS_TYPES: '',
    handleToolItemClick: () => {},
    boardMouseDownEventHandler: () => {},
    boardMouseMoveEventHandler: () => {},
    boardMouseUpEventHandler: () => {},
    boardMouseUpEventHandler: () => {},
})

export default BoardContext;