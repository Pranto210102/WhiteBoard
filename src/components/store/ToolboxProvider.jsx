import {useReducer} from 'react';
import ToolboxContext from './toolbox-context';
import React from 'react'
import TOOL_ITEMS, {COLORS, TOOLBOX_ACTIONS} from '../../constants';

function toolboxReducer(state, action) {
    switch(action.type) {
        case TOOLBOX_ACTIONS.CHANGE_STROKE: {
            const newState = { ...state };
            newState[action.payload.tool].stroke = action.payload.stroke;
            return newState;
        }

        case TOOLBOX_ACTIONS.CHANGE_FILL: {
            const newState = { ...state };
            newState[action.payload.tool].fill = action.payload.fillColor;
            return newState;
        }

        case TOOLBOX_ACTIONS.CHANGE_SIZE: {
            const newState = { ...state };
            newState[action.payload.tool].size = action.payload.size;
            return newState;
        }

        default:
            return state;
    }
}

function initialState() {
    return {
        [TOOL_ITEMS.Line]: {
            stroke: COLORS.BLACK,
            size: 1,
        },

        [TOOL_ITEMS.Box]: {
            stroke: COLORS.BLACK,
            fill: null,
            size: 1,
        },

        [TOOL_ITEMS.Circle]: {
            stroke: COLORS.BLACK,
            fill: null,
            size: 1,
        },
        [TOOL_ITEMS.ARROW]: {
            stroke: COLORS.BLACK,
            size: 1,
        }
    };
}

    

function ToolboxProvider({ children }) {
    const [toolboxState, dispatchToolboxAction] = useReducer(toolboxReducer, initialState());

    const changeStrokeHandler = (tool, stroke) => {
        dispatchToolboxAction({
            type: TOOLBOX_ACTIONS.CHANGE_STROKE,
            payload: {
                tool,
                stroke,
            },
        });
    };

    const changeFillColorHandler = (tool, fillColor) => {
        dispatchToolboxAction({
            type: TOOLBOX_ACTIONS.CHANGE_FILL,
            payload: {
                tool,
                fillColor,
            },
        });
    };

     const changeSizeHandler = (tool, size) => {
        dispatchToolboxAction({
            type: TOOLBOX_ACTIONS.CHANGE_SIZE,
            payload: {
                tool,
                size,
            },
        });
    };

    return  <ToolboxContext.Provider value={{ 
        toolboxState,
         changeStroke: changeStrokeHandler, 
         changeFillColor: changeFillColorHandler,
         changeSize: changeSizeHandler,
     }}> {children} </ToolboxContext.Provider>
}

export default ToolboxProvider