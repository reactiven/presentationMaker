import React, {RefObject, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import { ElementStyleType, SlideElementType } from '../../Entity/types';
import { ImageBlock } from './Image';
import {ColorStyleType, Shape} from './Shape';
import { Textbox } from './Textbox';
import styles from'./Element.module.css';
import { isImage } from '../../Entity/Image';
import { isShape } from '../../Entity/Shape';
import { isTextBox } from '../../Entity/TextBox';
import {useElementsDragNDrop} from "../../common/useDragNDrop";
import { getParentRelativeCoordinates } from '../../common/getParentRelativeCoordinates';
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {dispatchDecorator} from "../../state/dispatchDecarator";

type ElementPropsType = {
    element: SlideElementType,
    isSelected: boolean,
}

function SlideElement(props: ElementPropsType) {
    const [height, setHeight] = useState<number|null>(null)
    const [width, setWidth] = useState<number|null>(null)
    const [left, setLeft] = useState<number|null>(null)
    const [top, setTop] = useState<number|null>(null)
    const element = {...props.element}

    const elementRef = useRef<HTMLDivElement>(null)

    const [dndlLeft, dndTop] = useElementsDragNDrop(element, elementRef)

    useEffect(() => {
        setLeft(dndlLeft)
        setTop(dndTop)
    }, [dndlLeft, dndTop])

    useLayoutEffect(() => {
        setLeft(props.element.xPos)
        setTop(props.element.yPos)
    }, [props.element])

    const style = {
        top: top !== null
            ? top
            : element.yPos,
        left: left !== null
            ? left
            : element.xPos,
        height: height !== null
            ? height
            : element.height,
        width: width !== null
            ? width
            : element.width,
    }
    const className = `${styles.element} ${props.isSelected ? styles.elementSelected : ''}`

    function onClick(event: any) {
        event.preventDefault()
    }

    return(
        <div style={style} className={className} onClick={onClick} ref={elementRef}>
            {props.isSelected && <ResizeHandlers
                element={element}
                elementRef={elementRef}
                setHeight={setHeight}
                setWidth={setWidth}
                setTop={setTop}
                setLeft={setLeft}
            />}
            {renderElement(element, style)}
        </div>
    )
}

type ResizeHandlersType = {
    element: SlideElementType,
    elementRef: RefObject<HTMLDivElement>,
    setHeight: (height: number|null) => void,
    setWidth: (width: number|null) => void,
    setTop: (top: number|null) => void,
    setLeft: (left: number|null) => void,
}

function ResizeHandlers({
    element,
    elementRef,
    setHeight,
    setWidth,
    setTop,
    setLeft,
}: ResizeHandlersType) {
    const store: Readonly<StoreType> = useContext(StoreContext)
    const tsRef = useRef<HTMLDivElement|null>(null)
    const bsRef = useRef<HTMLDivElement|null>(null)
    const rsRef = useRef<HTMLDivElement|null>(null)
    const lsRef = useRef<HTMLDivElement|null>(null)
    const tlRef = useRef<HTMLDivElement|null>(null)
    const trRef = useRef<HTMLDivElement|null>(null)
    const blRef = useRef<HTMLDivElement|null>(null)
    const brRef = useRef<HTMLDivElement|null>(null)


    let slide: HTMLElement|null

    function tsMouseUp(event: any) {
        document.removeEventListener('mousemove', tsMouseMove)
        document.removeEventListener('mouseup', tsMouseUp)
        const currElement = elementRef.current && elementRef.current.getBoundingClientRect()
        if (!!currElement) {
            const [cursorX, cursorY] = getParentRelativeCoordinates(currElement.left, currElement.top, slide)
            store.dispatch(presentationInfoActions.moveElement(
                element.elementId,
                cursorX,
                cursorY,
            ))
            dispatchDecorator(store, () => presentationInfoActions.resizeElement(
                element.elementId,
                currElement.width,
                currElement.height,
            ))
            setWidth(null)
            setHeight(null)
            setLeft(null)
            setTop(null)
        }

    }

    function bsMouseUp(event: any) {
        document.removeEventListener('mousemove', bsMouseMove)
        document.removeEventListener('mouseup', bsMouseUp)
        const currElement = elementRef.current && elementRef.current.getBoundingClientRect()
        if (!!currElement) {
            dispatchDecorator(store, () => presentationInfoActions.resizeElement(
                element.elementId,
                currElement.width,
                currElement.height,
            ))
            setWidth(null)
            setHeight(null)
        }
    }

    function rsMouseUp(event: any) {
        document.removeEventListener('mousemove', rsMouseMove)
        document.removeEventListener('mouseup', rsMouseUp)
        const currElement = elementRef.current && elementRef.current.getBoundingClientRect()
        if (!!currElement) {
            dispatchDecorator(store, () => presentationInfoActions.resizeElement(
                element.elementId,
                currElement.width,
                currElement.height,
            ))
            setWidth(null)
            setHeight(null)
        }
    }

    function lsMouseUp(event: any) {
        document.removeEventListener('mousemove', lsMouseMove)
        document.removeEventListener('mouseup', lsMouseUp)
        const currElement = elementRef.current && elementRef.current.getBoundingClientRect()
        if (!!currElement) {
            const [cursorX, cursorY] = getParentRelativeCoordinates(currElement.left, currElement.top, slide)
            store.dispatch(presentationInfoActions.moveElement(
                element.elementId,
                cursorX,
                cursorY,
            ))
            dispatchDecorator(store, () => presentationInfoActions.resizeElement(
                element.elementId,
                currElement.width,
                currElement.height,
            ))
            setWidth(null)
            setHeight(null)
            setLeft(null)
            setTop(null)
        }
    }

    function tsMouseMove(event: any) {
        const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slide)
        const elementBounds = elementRef.current && elementRef.current.getBoundingClientRect()
        const [elementLeft, elementTop] = getParentRelativeCoordinates(elementBounds!.left, elementBounds!.top, slide)
        const elementBottom = elementTop + elementBounds!.height
        setHeight(elementBottom - cursorY)
        setTop(cursorY)
    }

    function bsMouseMove(event: any) {
        const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slide)
        const elementBounds = elementRef.current && elementRef.current.getBoundingClientRect()
        const [elementLeft, elementTop] = getParentRelativeCoordinates(elementBounds!.left, elementBounds!.top, slide)
        setHeight(cursorY - elementTop)
    }

    function rsMouseMove(event: any) {
        const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slide)
        const elementBounds = elementRef.current && elementRef.current.getBoundingClientRect()
        const [elementLeft, elementTop] = getParentRelativeCoordinates(elementBounds!.left, elementBounds!.top, slide)
        setWidth(cursorX - elementLeft)
    }

    function lsMouseMove(event: any) {
        const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slide)
        const elementBounds = elementRef.current && elementRef.current.getBoundingClientRect()
        const [elementRight, elementTop] = getParentRelativeCoordinates(elementBounds!.right, elementBounds!.top, slide)
        setWidth(elementRight - cursorX)
        setLeft(cursorX)
    }

    function tsMouseDown(event: any) {
        event.preventDefault()
        document.addEventListener('mousemove', tsMouseMove);
        document.addEventListener('mouseup', tsMouseUp);
    }

    function bsMouseDown(event: any) {
        event.preventDefault()
        document.addEventListener('mousemove', bsMouseMove);
        document.addEventListener('mouseup', bsMouseUp);
    }

    function rsMouseDown(event: any) {
        event.preventDefault()
        document.addEventListener('mousemove', rsMouseMove);
        document.addEventListener('mouseup', rsMouseUp);
    }

    function lsMouseDown(event: any) {
        event.preventDefault()
        document.addEventListener('mousemove', lsMouseMove);
        document.addEventListener('mouseup', lsMouseUp);
    }


    useEffect(() => {
        const ts = tsRef.current
        const bs = bsRef.current
        const rs = rsRef.current
        const ls = lsRef.current
        const tl = tlRef.current
        const tr = trRef.current
        const bl = blRef.current
        const br = brRef.current
        slide = elementRef.current && elementRef.current.parentElement
        ts && ts.addEventListener('mousedown', tsMouseDown)
        bs && bs.addEventListener('mousedown', bsMouseDown)
        rs && rs.addEventListener('mousedown', rsMouseDown)
        ls && ls.addEventListener('mousedown', lsMouseDown)
        tl && tl.addEventListener('mousedown', lsMouseDown)
        tl && tl.addEventListener('mousedown', tsMouseDown)
        tr && tr.addEventListener('mousedown', tsMouseDown)
        tr && tr.addEventListener('mousedown', rsMouseDown)
        bl && bl.addEventListener('mousedown', lsMouseDown)
        bl && bl.addEventListener('mousedown', bsMouseDown)
        br && br.addEventListener('mousedown', bsMouseDown)
        br && br.addEventListener('mousedown', rsMouseDown)
        return () => {
            ts && ts.removeEventListener('mousedown', tsMouseDown)
            bs && bs.removeEventListener('mousedown', bsMouseDown)
            rs && rs.removeEventListener('mousedown', rsMouseDown)
            ls && ls.removeEventListener('mousedown', lsMouseDown)
            tl && tl.removeEventListener('mousedown', lsMouseDown)
            tl && tl.removeEventListener('mousedown', tsMouseDown)
            tr && tr.removeEventListener('mousedown', tsMouseDown)
            tr && tr.removeEventListener('mousedown', rsMouseDown)
            bl && bl.removeEventListener('mousedown', lsMouseDown)
            bl && bl.removeEventListener('mousedown', bsMouseDown)
            br && br.removeEventListener('mousedown', bsMouseDown)
            br && br.removeEventListener('mousedown', rsMouseDown)
        }
    }, [tsRef, elementRef])

    return(
        <div>
            <div className={`${styles.resizeHandle} ${styles.resizeHandleTl}`} ref={tlRef}></div>
            <div className={`${styles.resizeHandle} ${styles.resizeHandleTr}`} ref={trRef}></div>
            <div className={`${styles.resizeHandle} ${styles.resizeHandleBl}`} ref={blRef}></div>
            <div className={`${styles.resizeHandle} ${styles.resizeHandleBr}`} ref={brRef}></div>
            <div className={`${styles.resizeHandle} ${styles.resizeHandleTs}`} ref={tsRef}></div>
            <div className={`${styles.resizeHandle} ${styles.resizeHandleRs}`} ref={rsRef}></div>
            <div className={`${styles.resizeHandle} ${styles.resizeHandleBs}`} ref={bsRef}></div>
            <div className={`${styles.resizeHandle} ${styles.resizeHandleLs}`} ref={lsRef}></div>
        </div>
    )
}

function renderElement(element: SlideElementType, style: ElementStyleType) {
    const colorStyle: ColorStyleType = {
        fill: element.background,
        strokeWidth: element.borderWidth,
        strokeColor: element.borderColor,
    }
    switch (element.type) {
        case 'shape':
            if (isShape(element.dataElement))
            {
                return <Shape
                    type={element.dataElement.shapeType}
                    colorStyle={colorStyle}
                    width={style.width}
                    height={style.height}    
                />
            }
            return null
        case 'image':
            if (isImage(element.dataElement))
            {
                return <ImageBlock
                    data={element.dataElement}
                    borderWidth={element.borderWidth}
                    borderColor={element.borderColor}
                />
            }
            return null
        case 'textBox':
            if (isTextBox(element.dataElement))
            {
                return <Textbox
                    textboxId={element.elementId}
                    data={element.dataElement}
                    background={element.background}
                    borderWidth={element.borderWidth}
                    borderColor={element.borderColor}
                />
            }
            return null
        default:
            return null
    }
}

export {
    SlideElement,
}