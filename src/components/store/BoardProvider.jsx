import BoardContext from "./board-context";
import React from 'react'
import { useState, useReducer, useContext } from "react";
import TOOL_ITEMS, { BOARD_ACTIONS, TOOL_ACTIONS_TYPES} from "../../constants";

import { createRoughElement } from "../utlis/elements.jsx";


const boardReducer = (state, action) => {
    switch(action.type) {
        case BOARD_ACTIONS.SET_ACTIVE_TOOL: {
            return { ...state, 
                activeTool: action.payload.tool,
                toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
             };
        }
        case BOARD_ACTIONS.DRAW_DONE: {
            const { clientX, clientY, stroke, fill } = action.payload;
            const newElement = createRoughElement(
                state.elements.length,
                clientX,
                clientY,
                clientX,
                clientY,
                { type: state.activeTool, stroke, fill }
            );

            const previousElement = state.elements;
            
            return {
                ...state,
                elements: [...previousElement, newElement],
                lastCoordinates: { clientX, clientY },
                toolActionsTypes: TOOL_ACTIONS_TYPES.DRAWING,
            };
        }

            case BOARD_ACTIONS.DRAW_MOVE: { 
                const { clientX, clientY, stroke: payloadStroke, fill: payloadFill } = action.payload;
                    const newElements = [...state.elements];

                    const index = state.elements.length - 1;
                    const {x1, y1, stroke: prevStroke, fill: prevFill} = newElements[index] || {};

                    const stroke = payloadStroke ?? prevStroke;
                    const fill = payloadFill ?? prevFill;

                const newElement = createRoughElement(
                    index,
                    x1,
                    y1,
                    clientX,
                    clientY,
                    { type: state.activeTool, stroke, fill }
                );

                newElements[index] = newElement;



                return {
                    ...state,
                    elements: newElements,
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

    const boardMouseDownEventHandler = (clientX, clientY, toolboxState) => {
        dispatchBoardAction({ 
            type: BOARD_ACTIONS.DRAW_DONE, 
            payload: {
                    clientX,
                    clientY,
                    stroke: toolboxState[boardState.activeTool]?.stroke,
                    fill: toolboxState[boardState.activeTool]?.fill,
                },
            });
    }

    const boardMouseMoveEventHandler = (clientX, clientY, toolboxState) => {
        dispatchBoardAction({ 
            type: BOARD_ACTIONS.DRAW_MOVE,
            payload: {
                clientX,
                clientY,
                stroke: toolboxState[boardState.activeTool]?.stroke,
                fill: toolboxState[boardState.activeTool]?.fill,
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