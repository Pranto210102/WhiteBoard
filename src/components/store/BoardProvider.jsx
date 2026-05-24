import BoardContext from "./board-context";
import React from 'react'
import { useState, useReducer, useContext } from "react";
import TOOL_ITEMS, { BOARD_ACTIONS, TOOL_ACTIONS_TYPES} from "../../constants";

import rough from 'roughjs/bin/rough';

const gen = rough.generator();


const boardReducer = (state, action) => {
    switch(action.type) {
        case BOARD_ACTIONS.SET_ACTIVE_TOOL: {
            return { ...state, 
                activeTool: action.payload.tool,
                toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
             };
        }
        case BOARD_ACTIONS.DRAW_DONE: {
            const { clientX, clientY } = action.payload;
            const newElement = {
                id:state.elements.length,
                x1: clientX,
                y1: clientY,
                x2: clientX,
                y2: clientY,
                roughElement: gen.line(clientX, clientY, clientX, clientY)
            }
            return {
                ...state,
                elements: [...state.elements, newElement],
                lastCoordinates: { clientX, clientY },
                toolActionsTypes: TOOL_ACTIONS_TYPES.DRAWING,
            };
        }

            case BOARD_ACTIONS.DRAW_MOVE: { 
                const { clientX, clientY } = action.payload;
                const lastElement = state.elements[state.elements.length - 1];
                if(!lastElement) return state;
                lastElement.roughElement = gen.line(lastElement.x1, lastElement.y1, clientX, clientY);
                return {
                    ...state,
                    elements: [...state.elements],
                    lastCoordinates: { clientX, clientY },
                    toolActionsTypes: TOOL_ACTIONS_TYPES.DRAWING,
                };
            }

            case BOARD_ACTIONS.DRAW_UP: {
                return {
                    ...state,   
                    toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
                    lastCoordinates: null,
                }
            }

            case BOARD_ACTIONS.DRAW_UP: {
                return {
                    ...state,
                    toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
                }
            }
            
        default:
            return state;
    }
};


const initialBoardState = {
    activeTool: TOOL_ITEMS.Line,
    toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
    elements: [],
    lastCoordinates: null,
}

function BoardProvider({ children }) {
    const [boardState, dispatchBoardAction] = useReducer(boardReducer, initialBoardState);

    const boardMouseDownEventHandler = (clientX, clientY) => {
        dispatchBoardAction({ 
            type: BOARD_ACTIONS.DRAW_DONE, 
            payload: {
                    clientX,
                    clientY
                },
            });
    }

    const boardMouseMoveEventHandler = (clientX, clientY) => {
        dispatchBoardAction({ 
            type: BOARD_ACTIONS.DRAW_MOVE,
            payload: {
                clientX,
                clientY
            },
        });
    }

    const boardMouseUpEventHandler = () => {
        dispatchBoardAction({ 
            type: BOARD_ACTIONS.DRAW_UP,
        });
    }

    const handleToolItemClick = (tool) => {
        dispatchBoardAction({ type: BOARD_ACTIONS.SET_ACTIVE_TOOL, payload: { tool } });
    }

    const BoardContextValue = {
        activeTool: boardState.activeTool,
        toolActionsTypes: boardState.toolActionsTypes,
        handleToolItemClick,
        boardMouseDownEventHandler,
        boardMouseMoveEventHandler,
        boardMouseUpEventHandler,
        elements: boardState.elements,
        lastCoordinates: boardState.lastCoordinates,
    }
    
  return (
    <BoardContext.Provider value={BoardContextValue}>
      {children}
    </BoardContext.Provider>
  )
}

export default BoardProvider