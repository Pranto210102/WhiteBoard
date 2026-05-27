import React, {useRef, useEffect, useLayoutEffect } from 'react'
import rough from 'roughjs';
import { useContext } from 'react';
import BoardContext from '../store/board-context';
import toolboxContext from '../store/toolbox-context';
import TOOL_ITEMS, { TOOL_ACTIONS_TYPES, TOOL_TYPES } from '../../constants';
import classes from './index.module.css';

const Board = () => {
    const canvasRef = useRef(null);
    const textAreaRef = useRef(null);
    const {elements, 
        boardMouseDownEventHandler, 
        boardMouseMoveEventHandler, 
        toolActionsTypes,
        textAreaBlurHandler,
        textAreaChangeHandler,
        undo,
        redo,
        boardMouseUpEventHandler } = useContext(BoardContext);
    const { toolboxState } = useContext(toolboxContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(canvas){
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    },[])

   
    

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const roughCanvas = rough.canvas(canvas);
        const generator = rough.generator();

        const context = canvas.getContext('2d');
        context.save();

            elements.forEach(element => {
                switch(element.type) {
                    case TOOL_TYPES.LINE:
                    case TOOL_TYPES.ARROW:
                    case TOOL_TYPES.BOX:
                    case TOOL_TYPES.CIRCLE:
                        roughCanvas.draw(element.roughElement);
                        break;
                    case TOOL_TYPES.BRUSH:
                        context.fillStyle = element.stroke;
                        context.fill(element.path);
                        context.restore();
                        break;
                    case TOOL_TYPES.TEXT:
                        if (toolActionsTypes === TOOL_ACTIONS_TYPES.WRITING && element.id === elements.length - 1) {
                            break;
                        }
                        context.textBaseline = "top";
                        context.font = `${element.size}px 'Caveat', cursive`;
                        context.fillStyle = element.stroke;
                        context.fillText(element.text, element.x1, element.y1);
                        context.restore();
                        break;
                    default:
                        throw new Error("Unknown element type: " + element.type);    
                }
            })

        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

    }, [elements])
    useEffect(() => {
        if(toolActionsTypes === TOOL_ACTIONS_TYPES.WRITING) {
            setTimeout(() => {
                textAreaRef.current.focus();
            }, 0); 
        }
    }, [toolActionsTypes])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'z') {   
                undo();
            }
            if (event.ctrlKey && event.key === 'y') {
                redo();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [undo, redo])

    const handleMouseDownEvent = (event) => {
        const {clientX, clientY} = event;
        // console.log(clientX, clientY);

        boardMouseDownEventHandler(clientX, clientY, toolboxState);
    }

    const handleMouseMoveEvent = (event, ) => {
        // if(toolActionsTypes !== "DRAWING") return;

        const {clientX, clientY} = event;
        // console.log(clientX, clientY);

        boardMouseMoveEventHandler(clientX, clientY, toolboxState);
    }

    const handleMouseUpEvent = () => {
        boardMouseUpEventHandler();
    }

  return (
    <>
        <div className='w-screen h-screen bg-gray-100'>
            {
                toolActionsTypes === TOOL_ACTIONS_TYPES.WRITING && <textarea
                    type="text"
                    ref={textAreaRef}
                    className = {classes.textElementBox}
                    style = {{
                        top: elements[elements.length - 1].y1,
                        left: elements[elements.length - 1].x1,
                        fontSize: `${toolboxState[TOOL_TYPES.TEXT]?.size}px`,
                        color: toolboxState[TOOL_TYPES.TEXT]?.stroke,
                        fontFamily: 'Caveat',
                    }}
                    onBlur={(event) => textAreaBlurHandler(event.target.value, toolboxState)}
                    onChange={(event) => textAreaChangeHandler(event.target.value)}
                />
            }
            <canvas id='canvas'
                ref={canvasRef}
                className='border-4 border-gray-300 w-full h-full bg-white rounded-lg shadow-md'
             onMouseDown={handleMouseDownEvent} 
             onMouseMove={handleMouseMoveEvent}
             onMouseUp={handleMouseUpEvent}
             />

        </div>
    </>
  )
}

export default Board
