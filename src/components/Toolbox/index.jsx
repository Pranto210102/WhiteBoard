import React, { useContext } from 'react'
import classes from './index.module.css';
import { COLORS, STROKE_TOOL_TYPES, FILL_TOOL_TYPES, STROKE_TOOL_SIZE } from '../../constants';
import cx from 'classnames'
import toolboxContext from '../store/toolbox-context';
import boardContext from '../store/board-context';

function Toolbox() {
    const { activeTool } = useContext(boardContext);
    const {toolboxState, changeStroke, changeFillColor, changeSize} = useContext(toolboxContext);

    const strokeColor = toolboxState[activeTool]?.stroke;
    const fillColor = toolboxState[activeTool]?.fill;
    const size = toolboxState[activeTool]?.size;

  return (
    <>
        <div className={classes.container}>
            {STROKE_TOOL_TYPES.includes(activeTool) &&<div className={classes.selectOptionContainer}>
                <div className={classes.toolBoxLabel}>Stroke</div>
                <div className={classes.colorsContainer}>
                   {Object.keys(COLORS).map((k) => {
                         return (
                            <div 
                            key={k} 
                                className={cx(classes.colorBox, {
                                    [classes.activeColorBox]: strokeColor === COLORS[k]
                                })}

                            style={{ backgroundColor: COLORS[k] }}
                            onClick={() => changeStroke(activeTool, COLORS[k])}
                            />
                        );
                    })}
                </div>
            </div>}

            {FILL_TOOL_TYPES.includes(activeTool) && <div className={classes.selectOptionContainer}>
                <div className={classes.toolBoxLabel}>Fill Color</div>
                <div className={classes.colorsContainer}>
                   {Object.keys(COLORS).map((k) => {
                        return (
                            <div 
                            key={k} 
                                className={cx(classes.colorBox, {
                                    [classes.activeColorBox]: fillColor === COLORS[k]
                                })}

                            style={{ backgroundColor: COLORS[k] }}
                            onClick={() => changeFillColor(activeTool, COLORS[k])}
                            />
                        );
                    })}
                </div>
            </div>}

            {STROKE_TOOL_SIZE.includes(activeTool) && <div className={classes.selectOptionContainer}>
                <div className={classes.toolBoxLabel}>Brush Size</div>

                   <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={toolboxState[activeTool]?.size}
                    onChange={(event) => changeSize(activeTool, Number(event.target.value))}
                   />
                
            </div>}

        </div>
    </>
  )
}

export default Toolbox