import {Slash, Square, Circle} from 'lucide-react';

const TOOL_ITEMS = {
    Line: Slash,
    Box: Square,
    Circle: Circle,
};

export const TOOL_ACTIONS_TYPES = {
   NONE: 'NONE',
   DRAWING: 'DRAWING',
}

export const BOARD_ACTIONS = {
    SET_ACTIVE_TOOL: 'SET_ACTIVE_TOOL',
    DRAW_DONE: 'DRAW_DONE',
    DRAW_MOVE: 'DRAW_MOVE',
    DRAW_UP: 'DRAW_UP',
}

export default TOOL_ITEMS;