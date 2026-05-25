import {createContext} from 'react';

const toolboxContext = createContext({
    toolboxState:{},
    changeStroke: () => {},
    changeFillColor: () => {},
    changeSize: () => {},
});

export default toolboxContext;