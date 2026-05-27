import BoardContext from "./board-context";
import React from 'react'
import { useState, useReducer, useContext, useCallback } from "react";
import TOOL_ITEMS, { BOARD_ACTIONS, TOOL_ACTIONS_TYPES, TOOL_TYPES} from "../../constants";
import { getStroke } from 'perfect-freehand';

import { createElement, getSvgPathFromStroke, isPointInElement } from "../utlis/elements.jsx";


const boardReducer = (state, action) => {
    switch(action.type) {
        case BOARD_ACTIONS.SET_ACTIVE_TOOL: {
            return { ...state, 
                activeTool: action.payload.tool,
                toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
             };
        }
        case BOARD_ACTIONS.DRAW_DONE: {
            const { clientX, clientY, stroke, fill, size } = action.payload;
            const newElement = createElement(
                state.elements.length,
                clientX,
                clientY,
                clientX,
                clientY,
                { type: state.activeTool, stroke, fill, size }
            );

            const previousElement = state.elements;
            
            return {
                ...state,
                toolActionsTypes:
                state.activeTool === TOOL_TYPES.TEXT 
                ? TOOL_ACTIONS_TYPES.WRITING
                : TOOL_ACTIONS_TYPES.DRAWING,

                elements: [...previousElement, newElement],
                lastCoordinates: { clientX, clientY },
            };
        }

            case BOARD_ACTIONS.DRAW_MOVE: { 
                    const { clientX, clientY } = action.payload;
                    const newElements = [...state.elements];
                    const index = state.elements.length - 1;

                    const {x1, y1, stroke, fill, size, type} = newElements[index];

                   switch(type) {
                      case TOOL_TYPES.LINE:
                      case TOOL_TYPES.BOX:
                      case TOOL_TYPES.CIRCLE:
                      case TOOL_TYPES.ARROW:
                        const newElement = createElement(
                            index,
                            x1,
                            y1,
                            clientX,
                            clientY,
                            { type: state.activeTool, stroke, fill, size }
                        );

                        newElements[index] = newElement;
                        return {
                            ...state,
                            elements: newElements,
                            lastCoordinates: { clientX, clientY },
                            toolActionsTypes: TOOL_ACTIONS_TYPES.DRAWING,
                        };

                                            case TOOL_TYPES.BRUSH:
                        newElements[index].points.push([clientX, clientY]);
                        newElements[index].path = new Path2D(getSvgPathFromStroke(getStroke(newElements[index].points)));
                        return {
                            ...state,
                            elements: newElements,
                            lastCoordinates: { clientX, clientY },
                            toolActionsTypes: TOOL_ACTIONS_TYPES.DRAWING,
                        };  
                   } 
            }

            case BOARD_ACTIONS.ERASING: {
                const { clientX, clientY } = action.payload;
                const newElements = state.elements.filter(element => {
                    return !isPointInElement(element, clientX, clientY);
                });
                return {
                    ...state,
                    elements: newElements,
                    toolActionsTypes: TOOL_ACTIONS_TYPES.ERASING,
                    lastCoordinates: { clientX, clientY },
                };
            }
            case BOARD_ACTIONS.UPDATE_TEXT: {
                const index = state.elements.length - 1;
                const newElements = [...state.elements];
                if (newElements[index]) newElements[index].text = action.payload.text;
                return {
                    ...state,
                    elements: newElements,
                }
            }

            case BOARD_ACTIONS.CHANGE_TEXT: {
                const index = state.elements.length - 1;
                const newElements = [...state.elements];
                if (newElements[index]) newElements[index].text = action.payload.text;

                const newHistory = state.history.slice(0, state.index + 1);
                newHistory.push(newElements);
                return {
                    ...state,
                    elements: newElements,
                    toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
                    history: newHistory,
                    index: state.index + 1,
                }
            }
            case BOARD_ACTIONS.DRAW_UP: {
                const newElements = [...state.elements];
                const newHistory = state.history.slice(0, state.index + 1);
                newHistory.push(newElements);
                return {
                    ...state,
                    toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
                    lastCoordinates: null,
                    history: newHistory,
                    index: state.index + 1,
                }
            }
            case BOARD_ACTIONS.UNDO: {
                if(state.index <= 0) return state;
                return {
                    ...state,
                    elements: state.history[state.index - 1],
                    toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
                    index: state.index - 1,
                }
            }
            case BOARD_ACTIONS.REDO: {
                if(state.index >= state.history.length - 1) return state;
                return {
                    ...state,
                    elements: state.history[state.index + 1],
                    toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
                    index: state.index + 1,
                }
            }

        default:
            return state;
    }
};


const initialBoardState = {
    activeTool: TOOL_TYPES.BRUSH,
    toolActionsTypes: TOOL_ACTIONS_TYPES.NONE,
    elements: [],
    history: [[]],
    index: 0,
    lastCoordinates: null,
}

function BoardProvider({ children }) {
    const [boardState, dispatchBoardAction] = useReducer(boardReducer, initialBoardState);

    const boardMouseDownEventHandler = (clientX, clientY, toolboxState) => {
        if(boardState.toolActionsTypes === TOOL_ACTIONS_TYPES.WRITING) return;
        if(boardState.activeTool === TOOL_TYPES.ERASER) {
            dispatchBoardAction({ 
                type: BOARD_ACTIONS.ERASING,
                payload: {
                    clientX,
                    clientY,
                },
            });
            return;
        }
        dispatchBoardAction({ 
            type: BOARD_ACTIONS.DRAW_DONE, 
            payload: {
                    clientX,
                    clientY,
                    stroke: toolboxState[boardState.activeTool]?.stroke,
                    fill: toolboxState[boardState.activeTool]?.fill,
                    size: toolboxState[boardState.activeTool]?.size,
                },
            });
    }

    const boardMouseMoveEventHandler = (clientX, clientY, toolboxState) => {
        if(boardState.toolActionsTypes === TOOL_ACTIONS_TYPES.WRITING) return;
        if(boardState.toolActionsTypes === TOOL_ACTIONS_TYPES.DRAWING) {
                dispatchBoardAction({ 
                type: BOARD_ACTIONS.DRAW_MOVE,
                payload: {
                    clientX,
                    clientY,
                    stroke: toolboxState[boardState.activeTool]?.stroke,
                    fill: toolboxState[boardState.activeTool]?.fill,
                    size: toolboxState[boardState.activeTool]?.size,
                },
            });
        }
        else if(boardState.toolActionsTypes === TOOL_ACTIONS_TYPES.ERASING) {
            dispatchBoardAction({ 
                type: BOARD_ACTIONS.ERASING,
                payload: {
                    clientX,
                    clientY,
                },
            });
        }
        
    }

    const boardMouseUpEventHandler = () => {
        if(boardState.toolActionsTypes === TOOL_ACTIONS_TYPES.WRITING) return;
        if(boardState.toolActionsTypes === TOOL_ACTIONS_TYPES.DRAWING || boardState.toolActionsTypes === TOOL_ACTIONS_TYPES.ERASING) {
            dispatchBoardAction({ 
                type: BOARD_ACTIONS.DRAW_UP,
            });
        }
    }

    const handleToolItemClick = (tool) => {
        dispatchBoardAction({ type: BOARD_ACTIONS.SET_ACTIVE_TOOL, payload: { tool } });
    }

    const textAreaBlurHandler = (text, toolboxState) => {
        const { stroke, size } = toolboxState[TOOL_TYPES.TEXT];
        dispatchBoardAction({
            type: BOARD_ACTIONS.CHANGE_TEXT,
            payload: {
                text,
                stroke,
                size,
            }
        });
    }

    const textAreaChangeHandler = (text) => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.UPDATE_TEXT,
            payload: { text },
        });
    }

    const boardUndoHandler = useCallback(() => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.UNDO,
        });
    }, []);

    const boardRedoHandler = useCallback(() => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.REDO,
        });
    }, []);

    const BoardContextValue = {
        activeTool: boardState.activeTool,
        toolActionsTypes: boardState.toolActionsTypes,
        handleToolItemClick,
        boardMouseDownEventHandler,
        boardMouseMoveEventHandler,
        boardMouseUpEventHandler,
        textAreaBlurHandler,
        textAreaChangeHandler,
        elements: boardState.elements,
        lastCoordinates: boardState.lastCoordinates,
        undo: boardUndoHandler,
        redo: boardRedoHandler,
    }
    
  return (
    <BoardContext.Provider value={BoardContextValue}>
      {children}
    </BoardContext.Provider>
  )
}

export default BoardProvider