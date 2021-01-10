import {getParentRelativeCoordinates} from "../getParentRelativeCoordinates";
import {RefObject, useCallback, useContext, useEffect, useState} from "react";
import {SlideElementType} from "../../Entity/types";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {dispatchDecorator} from "../../state/dispatchDecarator";
import {isTextBox} from "../../Entity/TextBox";
import {slideHTML} from "../../components/editor/workspace/Slide";


function useElementsDragNDrop(element: SlideElementType,elementRef: RefObject<HTMLDivElement>) {
    const store: Readonly<StoreType> = useContext(StoreContext)
    const {insertionMode} = store.getState()
    const [left, setLeft] = useState<number | null>(null)
    const [top, setTop] = useState<number | null>(null)
    const [offsetTop, setOffsetTop] = useState(0)
    const [offsetLeft, setOffsetLeft] = useState(0)

    const mouseMove = useCallback((event) => {
        event.preventDefault()
        const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slideHTML)
        setLeft(cursorX)
        setTop(cursorY)
    }, [])

    const mouseUp = useCallback(() => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
        if (elementRef.current) {
            const elementBounds = elementRef.current.getBoundingClientRect()
            const [cursorX, cursorY] = getParentRelativeCoordinates(elementBounds.left, elementBounds.top, slideHTML)
            dispatchDecorator(store, () => presentationInfoActions.moveElement(
                element.elementId,
                cursorX,
                cursorY
            ))
            setLeft(null)
            setTop(null)
        }
    }, [element, store, elementRef, mouseMove])

    const mouseDown = useCallback((event) => {
        if (event.ctrlKey)
        {
            store.dispatch(presentationInfoActions.addElementToSelected(element.elementId))
        }
        else
        {
            store.dispatch(presentationInfoActions.selectElement(element.elementId))
            store.dispatch(presentationInfoActions.replaceElementToFront(element.elementId))
            if (element.type !== 'textBox' || (isTextBox(element.dataElement) && !element.dataElement.canEdit))
            {
                if (!event.defaultPrevented) {
                    const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, elementRef.current)
                    setOffsetLeft(cursorX)
                    setOffsetTop(cursorY)
                    document.addEventListener('mousemove', mouseMove);
                    document.addEventListener('mouseup', mouseUp);
                }
            }
        }
    }, [element, store, elementRef, mouseUp, mouseMove])

    useEffect(() => {
        const elementHTML = elementRef.current
        elementHTML && !insertionMode.on && elementHTML.addEventListener('mousedown', mouseDown)
        return () => {
            elementHTML && !insertionMode.on && elementHTML.removeEventListener('mousedown', mouseDown)
        }
    }, [elementRef, insertionMode.on, element, mouseDown])

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