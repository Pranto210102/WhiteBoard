import {useReducer} from 'react';
import ToolboxContext from './toolbox-context';
import React from 'react'
import TOOL_ITEMS, {COLORS} from '../../constants';

function toolboxReducer(state, action) {
    switch(action.type) {
        case 'CHANGE_STROKE': {
            const newState = { ...state };
            newState[action.payload.tool].stroke = action.payload.stroke;
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
            type: 'CHANGE_STROKE',
            payload: {
                tool,
                stroke,
            },
        });
    };

    return  <ToolboxContext.Provider value={{ toolboxState, changeStroke: changeStrokeHandler }}> {children} </ToolboxContext.Provider>
}

export default ToolboxProvider