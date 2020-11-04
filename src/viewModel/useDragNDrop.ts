import {getParentRelativePointerСoordinates} from "./getRelativePointerCoordinates";
import {dispatch} from "../state/state-manager";
import {addElementToSelected, moveElement, selectElement} from "../Entity/SlideElement";
import {RefObject, useEffect, useState} from "react";
import {SlideElementType} from "../Entity/types";


function useElementsDragNDrop(element: SlideElementType,elementRef: RefObject<HTMLDivElement>) {
    const [left, setLeft] = useState(element.xPos)
    const [top, setTop] = useState(element.yPos)

    let slide: HTMLElement|null

    function mouseUp(event: MouseEvent) {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
        const [cursorX, cursorY] = getParentRelativePointerСoordinates(event, slide)
        dispatch(moveElement, {
            elementId: element.elementId,
            newX: cursorX - element.width / 2,
            newY: cursorY - element.height / 2,
        })
        setLeft(null)
        setTop(null)
    }

    function mouseMove(event: MouseEvent) {
        const [cursorX, cursorY] = getParentRelativePointerСoordinates(event, slide);
        setLeft(cursorX - element.width / 2)
        setTop(cursorY - element.height / 2)
    }

    function mouseDown(event: MouseEvent) {
        if (event.ctrlKey)
        {
            dispatch(addElementToSelected, {
                elementId: element.elementId
            })
        }
        else
        {
            dispatch(selectElement, {
                elementId: element.elementId
            })
            const [cursorX, cursorY] = getParentRelativePointerСoordinates(event, elementRef.current);
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        }

    }

    useEffect(() => {
        const element = elementRef.current
        slide = elementRef && elementRef.current && elementRef.current.parentElement
        element && element.addEventListener('mousedown', mouseDown)
        return () => {
            element && element.removeEventListener('mousedown', mouseDown)
        }
    }, [elementRef])
    return [left, top]
}

export {
    useElementsDragNDrop,
}