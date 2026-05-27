import React, {useState, useContext} from 'react'
import classes from './index.module.css'

import cx from 'classnames'
import TOOL_ITEMS from '../../constants'
import { TOOL_TYPES } from '../../constants'
import BoardContext from '../store/board-context';

const Toolbar = () => {
    const { activeTool, handleToolItemClick } = useContext(BoardContext);
    return (
        <>
            <div className={classes.container}>
                <div className ={cx(classes.toolItem, {
                     [classes.active]: activeTool === TOOL_TYPES.BRUSH
                         })} onClick={() => handleToolItemClick(TOOL_TYPES.BRUSH)}>

                    <TOOL_ITEMS.BRUSH size={24} />
               </div>
               
               <div className ={cx(classes.toolItem, {
                                [classes.active]: activeTool === TOOL_TYPES.LINE
                                    })} onClick={() => handleToolItemClick(TOOL_TYPES.LINE)}>

                    <TOOL_ITEMS.Line size={24} />
               </div>

               <div className ={cx(classes.toolItem, {
                     [classes.active]: activeTool === TOOL_TYPES.BOX
                         })} onClick={() => handleToolItemClick(TOOL_TYPES.BOX)}>

                    <TOOL_ITEMS.Box size={24} />
               </div>

               <div className ={cx(classes.toolItem, {
                     [classes.active]: activeTool === TOOL_TYPES.CIRCLE
                         })} onClick={() => handleToolItemClick(TOOL_TYPES.CIRCLE)}>

                    <TOOL_ITEMS.Circle size={24} />
               </div>

               <div className ={cx(classes.toolItem, {
                     [classes.active]: activeTool === TOOL_TYPES.ARROW
                         })} onClick={() => handleToolItemClick(TOOL_TYPES.ARROW)}>

                    <TOOL_ITEMS.ARROW size={24} />
               </div>

               <div className ={cx(classes.toolItem, {
                     [classes.active]: activeTool === TOOL_TYPES.ERASER
                         })} onClick={() => handleToolItemClick(TOOL_TYPES.ERASER)}>

                    <TOOL_ITEMS.ERASER size={24} />
               </div>

               <div className ={cx(classes.toolItem, {
                     [classes.active]: activeTool === TOOL_TYPES.TEXT
                         })} onClick={() => handleToolItemClick(TOOL_TYPES.TEXT)}>

                    <TOOL_ITEMS.TEXT size={24} />
               </div>

            </div>
        </>
    )
}

export default Toolbar;