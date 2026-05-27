import TOOL_ITEMS, {ARROW_HEAD_LENGTH} from "../../constants";
import { TOOL_TYPES } from "../../constants";
import rough from 'roughjs/bin/rough';
import { arrowHeadCoordinates } from "./math";
import {getStroke} from 'perfect-freehand';

const gen = rough.generator();

export const createElement = (id, x1, y1, x2, y2, {type, stroke, fill, size}) => {
    const element = {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        stroke,
        fill,
        size,
    }
    let options = {
        seed: id + 1,
        fillStyle: 'solid',
    
    };
    if(stroke) {
        options.stroke = stroke;
    }
    if(fill) {
        options.fill = fill;
    }
    if(size) {
        options.strokeWidth = size;
    }

    switch(type) {
        case TOOL_TYPES.BRUSH: {
            const points = [[x1, y1]];
            const brushElement = {
                id,
                points,
                path: new Path2D(getSvgPathFromStroke(getStroke(points))),
                type,
                stroke,
        }
            return brushElement;
        }
        
        case TOOL_TYPES.LINE:
            element.roughElement = gen.line(x1, y1, x2, y2, options);
            break;
        case TOOL_TYPES.BOX:
            element.roughElement = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
            break;
        case TOOL_TYPES.CIRCLE: {
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            const width = x2 - x1;
            const height = y2 - y1;
            element.roughElement = gen.ellipse(cx, cy, width, height, options);
            break;
        }
        case TOOL_TYPES.ARROW: {
            const arrowLineLength = Math.hypot(x2 - x1, y2 - y1);
            if(arrowLineLength <= 2) {
                element.roughElement = gen.line(x1, y1, x2, y2, options);
                break;
            }
            const {x3, y3, x4, y4} = arrowHeadCoordinates(x1, y1, x2, y2, ARROW_HEAD_LENGTH);
            const points = [
                [x1, y1],
                [x2, y2],
                [x3, y3],
                [x2, y2],
                [x4, y4],
            ]
            element.roughElement = gen.linearPath(points, options);
            break;
        }
        case TOOL_TYPES.TEXT: 
             element.text = "";
             return element;
        default:
            throw new Error('Type not recognized: ');
    }
    return element;
}

export const isPointInElement = (element, pointX, pointY) => {
    const context = document.getElementById('canvas').getContext('2d');
    switch(element.type) {
        case TOOL_TYPES.LINE:
        case TOOL_TYPES.ARROW:
            return isPointCloseToLine(element.x1, element.y1, element.x2, element.y2, pointX, pointY);
        case TOOL_TYPES.BOX:
        case TOOL_TYPES.CIRCLE: 
            return isPointCloseToLine(element.x1, element.y1, element.x2, element.y1, pointX, pointY) ||
                   isPointCloseToLine(element.x2, element.y1, element.x2, element.y2, pointX, pointY) ||
                   isPointCloseToLine(element.x2, element.y2, element.x1, element.y2, pointX, pointY) ||
                   isPointCloseToLine(element.x1, element.y2, element.x1, element.y1, pointX, pointY);

        case TOOL_TYPES.BRUSH:
            return context.isPointInPath(element.path, pointX, pointY); 
        case TOOL_TYPES.TEXT: {
            if (!element.text) return false;
            context.font = `${element.size}px Caveat`;
            const metrics = context.measureText(element.text || '');
            const textWidth = metrics.width;
            const textHeight = element.size;
            return (
                pointX >= element.x1 &&
                pointX <= element.x1 + textWidth &&
                pointY >= element.y1 &&
                pointY <= element.y1 + textHeight
            );
        }
        default:
            throw new Error('Type not recognized: ' + element.type);
    }
}

const isPointCloseToLine = (x1, y1, x2, y2, pointX, pointY, size = 1) => {
    const distance = Math.abs((y2 - y1) * pointX - (x2 - x1) * pointY + x2 * y1 - y2 * x1) / Math.hypot(y2 - y1, x2 - x1);
    return distance <= Math.max(thresholdValue.LINE, size * 2.5);
}

export const thresholdValue = {
    LINE: 6,
    ARROW: 6,
}

export const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};