import React, { useContext } from 'react'
import classes from './index.module.css';
import TOOL_ITEMS, { COLORS, STROKE_TOOL_TYPES, FILL_TOOL_TYPES, STROKE_TOOL_SIZE, TOOL_TYPES } from '../../constants';
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
                    <div >
                    <input
                        className={classes.colorPicker}
                        type="color"
                        value={strokeColor}
                        onChange={(event) => changeStroke(activeTool, event.target.value)}
                    />
                    </div>
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
                    {
                        fillColor === null ? <div
                        className={cx(classes.colorPicker, classes.noFillColorBox)}
                        onClick={() => changeFillColor(activeTool, COLORS.BLACK)}
                        /> :
                        <div >
                        <input
                                className={classes.colorPicker}
                                type="color"
                                value={fillColor}
                                onChange={(event) => changeFillColor(activeTool, event.target.value)}
                            />
                            </div>
                    }

                    <div
                        className={cx(classes.colorBox, {
                            [classes.activeColorBox]: fillColor === null
                        }, classes.noFillColorBox)}
                        onClick={() => changeFillColor(activeTool, null)}
                    />

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
                <div className={classes.toolBoxLabel}>{activeTool == TOOL_TYPES.TEXT ? 'Font Size' : 'Brush Size'}</div>
                   <input
                    type="range"
                    min={activeTool === TOOL_TYPES.TEXT ? 16 : 1}
                    max={activeTool === TOOL_TYPES.TEXT ? 72 : 10}
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