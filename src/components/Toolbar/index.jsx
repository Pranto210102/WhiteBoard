import React, {useState, useContext} from 'react'
import classes from './index.module.css'

import cx from 'classnames'
import TOOL_ITEMS from '../../constants'
import BoardContext from '../store/board-context';

const Toolbar = () => {
    const { activeTool, handleToolItemClick } = useContext(BoardContext);
    return (
        <>
            <div className={classes.container}>
               <div className ={cx(classes.toolItem, {
                [classes.active]: activeTool === TOOL_ITEMS.Line
                  })} onClick={() => handleToolItemClick(TOOL_ITEMS.Line)}>

                    <TOOL_ITEMS.Line size={24} />
               </div>

               <div className ={cx(classes.toolItem, {
                [classes.active]: activeTool === TOOL_ITEMS.Box
                   })} onClick={() => handleToolItemClick(TOOL_ITEMS.Box)}>

                    <TOOL_ITEMS.Box size={24} />
               </div>

            </div>
        </>
    )
}

export default Toolbar;