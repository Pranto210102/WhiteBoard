import React, {useRef, useEffect, useLayoutEffect} from 'react'
import rough from 'roughjs';
import { useContext } from 'react';
import BoardContext from '../store/board-context';
import toolboxContext from '../store/toolbox-context';
import TOOL_ITEMS from '../../constants';

const Board = () => {
    const canvasRef = useRef(null);
    const {elements, 
        boardMouseDownEventHandler, 
        boardMouseMoveEventHandler, 
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
                    case TOOL_ITEMS.Line:
                    case TOOL_ITEMS.ARROW:
                    case TOOL_ITEMS.Box:
                    case TOOL_ITEMS.Circle:
                        roughCanvas.draw(element.roughElement);
                        break;
                    case TOOL_ITEMS.BRUSH:
                        context.fillStyle = element.stroke;
                        context.fill(element.path);
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
