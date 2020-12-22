import {getParentRelativeCoordinates} from "./getParentRelativeCoordinates";
import {RefObject, useContext, useEffect, useState} from "react";
import {SlideElementType} from "../Entity/types";
import {StoreType} from "../state/store";
import {StoreContext} from "../state/storeContext";
import {presentationInfoActions} from "../state/presentationInfoReducer";


function useElementsDragNDrop(element: SlideElementType,elementRef: RefObject<HTMLDivElement>) {
    const store: Readonly<StoreType> = useContext(StoreContext)
    const [left, setLeft] = useState<number | null>(null)
    const [top, setTop] = useState<number | null>(null)
    const [offsetTop, setOffsetTop] = useState(0)
    const [offsetLeft, setOffsetLeft] = useState(0)

    let slide: HTMLElement|null

    function mouseUp(event: MouseEvent) {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
        if (elementRef.current) {
            const elementBounds = elementRef.current.getBoundingClientRect()
            const [cursorX, cursorY] = getParentRelativeCoordinates(elementBounds.left, elementBounds.top, slide)
            store.dispatch(presentationInfoActions.moveElement(
                element.elementId,
                cursorX,
                cursorY
            ))
            setLeft(null)
            setTop(null)
        }
    }

    function mouseMove(event: MouseEvent) {
        event.preventDefault()
        const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slide)
        setLeft(cursorX)
        setTop(cursorY)
    }

    function mouseDown(event: MouseEvent) {
        if (event.ctrlKey)
        {
            store.dispatch(presentationInfoActions.addElementToSelected(element.elementId))
        }
        else
        {
            store.dispatch(presentationInfoActions.selectElement(element.elementId))
            store.dispatch(presentationInfoActions.replaceElementToFront(element.elementId))
            if (!event.defaultPrevented) {
                const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, elementRef.current)
                setOffsetLeft(cursorX)
                setOffsetTop(cursorY)
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('mouseup', mouseUp);
            }
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

    function calcLeft() {
        return left !== null
            ? left - offsetLeft
            : element.xPos
                ? element.xPos
                : null
    }

    function calcTop() {
        return top !== null
            ? top - offsetTop
            : element.yPos !== null
                ? element.yPos
                : null
    }
    return [calcLeft(), calcTop()]
}

export {
    useElementsDragNDrop,
}