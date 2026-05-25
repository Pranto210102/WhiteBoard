import TOOL_ITEMS, {ARROW_HEAD_LENGTH} from "../../constants";
import rough from 'roughjs/bin/rough';
import { arrowHeadCoordinates } from "./math";
import {getStroke} from 'perfect-freehand';

const gen = rough.generator();

export const createRoughElement = (id, x1, y1, x2, y2, {type, stroke, fill, size}) => {
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
        case TOOL_ITEMS.BRUSH: {
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
        
        case TOOL_ITEMS.Line:
            element.roughElement = gen.line(x1, y1, x2, y2, options);
            break;
        case TOOL_ITEMS.Box:
            element.roughElement = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
            break;
        case TOOL_ITEMS.Circle: {
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            const width = x2 - x1;
            const height = y2 - y1;
            element.roughElement = gen.ellipse(cx, cy, width, height, options);
            break;
        }
        case TOOL_ITEMS.ARROW: {
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
        default:
            throw new Error('Type not recognized: ');
    }
    return element;
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