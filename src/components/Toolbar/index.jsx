import React, {useState, useContext} from 'react'
import classes from './index.module.css'

import cx from 'classnames'
import TOOL_ITEMS from '../../constants'
import { TOOL_TYPES } from '../../constants'
import BoardContext from '../store/board-context';

import { Undo2, Redo2, Download } from 'lucide-react';

const Toolbar = () => {
    const { activeTool, handleToolItemClick, undo, redo } = useContext(BoardContext);

    const handleDownloadClick = () => {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        const imageURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'whiteboard.png';
        link.click();
    }
    
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

               <div className={classes.toolItem} onClick={undo}>
                   <Undo2 size={24} />
               </div>
               <div className={classes.toolItem} onClick={redo}>
                   <Redo2 size={24} />
               </div>

                <div className={classes.toolItem} onClick={handleDownloadClick}>
                   <Download size={24} />
               </div>

            </div>
            
        </>
    )
}

export default Toolbar;