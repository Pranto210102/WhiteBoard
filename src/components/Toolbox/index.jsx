import React, { useContext } from 'react'
import classes from './index.module.css';
import { COLORS } from '../../constants';
import cx from 'classnames'
import toolboxContext from '../store/toolbox-context';
import boardContext from '../store/board-context';

function Toolbox() {
    const { activeTool } = useContext(boardContext);
    const {toolboxState, changeStroke} = useContext(toolboxContext);
    const strokeColor = toolboxState[activeTool]?.stroke;

  return (
    <>
        <div className={classes.container}>
            <div className={classes.selectOptionContainer}>
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
            </div>
        </div>
    </>
  )
}

export default Toolbox