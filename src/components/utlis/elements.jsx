import TOOL_ITEMS from "../../constants";
import rough from 'roughjs/bin/rough';

const gen = rough.generator();

export const createRoughElement = (id, x1, y1, x2, y2, {type}) => {
    const element = {
        id,
        x1,
        y1,
        x2,
        y2,
    }
    let options = {
        seed: id + 1,
    };

    switch(type) {
        case TOOL_ITEMS.Line:
            element.roughElement = gen.line(x1, y1, x2, y2, options);
            break;
        case TOOL_ITEMS.Box:
            element.roughElement = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
            break;
        default:
            throw new Error('Type not recognized: ');
    }
    return element;
}