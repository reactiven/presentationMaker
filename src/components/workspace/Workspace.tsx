import React, {useContext, useRef, useState} from 'react';
import { Slide } from './Slide';
import styles from './WorkSpace.module.css';
import {getParentRelativeCoordinates} from "../../common/getParentRelativeCoordinates";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {insertionReducerActions} from "../../state/insertionModeReducer";
import {dispatchDecorator} from "../../state/dispatchDecarator";

function Workspace() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
        insertionMode,
    } = store.getState()

    const slideInfo = presentationInfo.currentSlide !== null
        ? presentationInfo.presentation.slides[presentationInfo.currentSlide]
        : null
    const workspaceRef = useRef<HTMLDivElement|null>(null)
    const slideRef = useRef<HTMLDivElement|null>(null)
    const [insertionAreaX, setInsertionAreaX] = useState<number|null>(null)
    const [insertionAreaY, setInsertionAreaY] = useState<number|null>(null)
    const [insertionAreaW, setInsertionAreaW] = useState<number|null>(null)
    const [insertionAreaH, setInsertionAreaH] = useState<number|null>(null)

    let insX: number
    let insY: number

    function mouseUp(event: any) {
        if (insertionMode.on && slideRef.current && slideInfo) {
            document.removeEventListener('mousedown', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
            const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slideRef.current)
            const position = {
                x: Number(insX > cursorX ? cursorX : insX),
                y: Number(insY > cursorY ? cursorY : insY),
            }
            const bounds = {
                w: Math.abs(cursorX - insX),
                h: Math.abs(cursorY - insY),
            }
            switch (insertionMode.elementType) {
                case 'shape':
                    if (insertionMode.shapeType)
                    {
                        const shapeType = insertionMode.shapeType
                        dispatchDecorator(store, () => presentationInfoActions.addShape(
                            shapeType,
                            position,
                            bounds,
                        ))
                    }
                    break
                case "image":
                    if (insertionMode.filepath)
                    {
                        const filepath = insertionMode.filepath
                        dispatchDecorator(store, () => presentationInfoActions.addImage(
                            filepath,
                            position,
                            bounds,
                        ))
                    }
                    break
                case "textBox":
                    dispatchDecorator(store, () => presentationInfoActions.addTextBox(
                        position,
                        bounds,
                    ))
                    break
            }
            setInsertionAreaY(null)
            setInsertionAreaX(null)
            setInsertionAreaW(null)
            setInsertionAreaH(null)
            store.dispatch(insertionReducerActions.setInsertionMode({
                on: false,
                elementType: null,
            }))
        }
    }

    function mouseMove(event: any) {
        const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slideRef.current)
        setInsertionAreaW(cursorX)
        setInsertionAreaH(cursorY)
    }

    function mouseDown(event: any) {
        if (presentationInfo.selectedSlides.length)
        {
            store.dispatch(presentationInfoActions.deleteSlideSelection())
        }
        if (insertionMode.on && slideRef.current) {
            const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slideRef.current)
            setInsertionAreaX(cursorX)
            setInsertionAreaY(cursorY)
            setInsertionAreaW(cursorX)
            setInsertionAreaH(cursorY)
            insX = cursorX
            insY = cursorY
            document.addEventListener('mousemove', mouseMove)
            document.addEventListener('mouseup', mouseUp)
        }
    }

    function onClick(event: any) {
        if (!event.defaultPrevented && presentationInfo.selectedSlideElements.length)
        {
            dispatchDecorator(store, () => presentationInfoActions.deleteElementSelection())
        }
    }

    const insertionStyle = {
        top: Number(Number(insertionAreaY) > Number(insertionAreaH)
            ? insertionAreaH
            : insertionAreaY),
        left: Number(Number(insertionAreaX) > Number(insertionAreaW)
            ? insertionAreaW
            : insertionAreaX),
        width: Math.abs(Number(insertionAreaW) - Number(insertionAreaX)),
        height: Math.abs(Number(insertionAreaH) - Number(insertionAreaY)),
    }

    return(
        <div
            ref={workspaceRef}
            onMouseDown={mouseDown}
            onClick={onClick}
            className={`${styles.workspace} ${insertionMode.on && styles.workspaceInsertion}`}
        >
            <div className={styles.slideContainer} ref={slideRef}>
                {insertionMode.on
                && insertionAreaX
                && insertionAreaH
                && insertionAreaY
                && insertionAreaW
                && <div className={styles.insertionArea} style={insertionStyle}></div>}
                {!!slideInfo && <Slide />}
            </div>
        </div>
    )
}

export {
    Workspace
}