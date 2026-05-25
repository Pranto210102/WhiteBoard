import {Slash, Square, Circle, MoveRight} from 'lucide-react';

const TOOL_ITEMS = {
    Line: Slash,
    Box: Square,
    Circle: Circle,
    ARROW: MoveRight,
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

export const COLORS = {
    BLACK: '#000000',
    RED: '#FF0000',
    GREEN: '#00FF00',
    BLUE: '#0000FF',
    ORANGE: '#FFA500',
    YELLOW: '#FFFF00',
    WHITE: '#FFFFFF',
}

export const ARROW_HEAD_LENGTH = 20;

export default TOOL_ITEMS;