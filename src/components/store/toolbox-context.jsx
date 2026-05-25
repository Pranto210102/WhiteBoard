import {createContext} from 'react';

const toolboxContext = createContext({
    toolboxState:{},
    changeStroke: () => {},
    changeFillColor: () => {},
});

export default toolboxContext;