import {Slash, Square, Circle, MoveRight, Brush, Eraser, TypeOutline } from 'lucide-react';

export const TOOL_TYPES = {
    LINE: 'LINE',
    BOX: 'BOX',
    CIRCLE: 'CIRCLE',
    ARROW: 'ARROW',
    BRUSH: 'BRUSH',
    ERASER: 'ERASER',
    TEXT: 'TEXT',
};

const TOOL_ITEMS = {
    Line: Slash,
    Box: Square,
    Circle: Circle,
    ARROW: MoveRight,
    BRUSH: Brush,
    ERASER: Eraser,
    TEXT: TypeOutline,
};

export const TOOL_ACTIONS_TYPES = {
   NONE: 'NONE',
   DRAWING: 'DRAWING',
   ERASING: 'ERASING',
   WRITING: 'WRITING',
}

export const BOARD_ACTIONS = {
    SET_ACTIVE_TOOL: 'SET_ACTIVE_TOOL',
    DRAW_DONE: 'DRAW_DONE',
    DRAW_MOVE: 'DRAW_MOVE',
    DRAW_UP: 'DRAW_UP',
    ERASING: 'ERASING',
    WRITING: 'WRITING',
    CHANGE_TEXT: 'CHANGE_TEXT',
    UPDATE_TEXT: 'UPDATE_TEXT',
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

export const TOOLBOX_ACTIONS = {
    CHANGE_STROKE: 'CHANGE_STROKE',
    CHANGE_FILL: 'CHANGE_FILL',
    CHANGE_SIZE: 'CHANGE_SIZE',
}

export const FILL_TOOL_TYPES = [TOOL_TYPES.BOX, TOOL_TYPES.CIRCLE];
export const STROKE_TOOL_TYPES = [
    TOOL_TYPES.LINE,
    TOOL_TYPES.ARROW,
    TOOL_TYPES.BOX,
    TOOL_TYPES.CIRCLE,
    TOOL_TYPES.BRUSH,
    TOOL_TYPES.TEXT,
];

export const STROKE_TOOL_SIZE = [
    TOOL_TYPES.LINE,
    TOOL_TYPES.ARROW,
    TOOL_TYPES.BOX,
    TOOL_TYPES.CIRCLE,
    TOOL_TYPES.TEXT,
];

export const ARROW_HEAD_LENGTH = 20;

export default TOOL_ITEMS;