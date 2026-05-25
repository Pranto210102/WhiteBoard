import React, {useRef, useEffect, useLayoutEffect} from 'react'
import rough from 'roughjs';
import { useContext } from 'react';
import BoardContext from '../store/board-context';

const Board = () => {
    const canvasRef = useRef(null);
    const {elements, 
        boardMouseDownEventHandler, 
        boardMouseMoveEventHandler, 
        boardMouseUpEventHandler,
        toolActionsTypes} = useContext(BoardContext);

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
                roughCanvas.draw(element.roughElement);
            })

        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

    }, [elements])

    const handleMouseDownEvent = (event) => {
        const {clientX, clientY} = event;
        console.log(clientX, clientY);

        boardMouseDownEventHandler(clientX, clientY);
    }

    const handleMouseMoveEvent = (event) => {
        if(toolActionsTypes !== "DRAWING") return;

        const {clientX, clientY} = event;
        console.log(clientX, clientY);

        boardMouseMoveEventHandler(clientX, clientY);
    }

    const handleMouseUpEvent = () => {
        boardMouseUpEventHandler();
    }

  return (
    <>
        <div className='w-screen h-screen bg-gray-100'>
            <canvas
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
