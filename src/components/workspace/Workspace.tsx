import React, {useRef, useState} from 'react';
import {deleteSlideSelection, getCurrentSlideInfo, setInsertionMode} from '../../Entity/Presentation';
import { deleteElementSelection } from '../../Entity/SlideElement';
import { State } from '../../Entity/types';
import { dispatch } from '../../state/state-manager';
import { Slide } from './Slide';
import './WorkSpace.css';
import {AddImage, AddShape, AddTextBox} from "../../Entity/Slide";
import {getParentRelativeCoordinates} from "../../common/getParentRelativeCoordinates";

type PropsType = {
    state: State,
}

function Workspace(props: PropsType) {
    const slideInfo = props.state.currentSlide !== null
        ? getCurrentSlideInfo(props.state)
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
        if (props.state.insertionMode.on && slideRef.current) {
            document.removeEventListener('mousedown', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
            const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slideRef.current)
            switch (props.state.insertionMode.elementType) {
                case 'shape':
                    dispatch(AddShape, {
                        type: props.state.insertionMode.shapeType,
                        position: {
                            x: Number(insX > cursorX ? cursorX : insX),
                            y: Number(insY > cursorY ? cursorY : insY),
                        },
                        size: {
                            w: Math.abs(cursorX - insX),
                            h: Math.abs(cursorY - insY),
                        }
                    })
                    break
                case "image":
                    dispatch(AddImage, {
                        filepath: props.state.insertionMode.filepath,
                        position: {
                            x: Number(insX > cursorX ? cursorX : insX),
                            y: Number(insY > cursorY ? cursorY : insY),
                        },
                        size: {
                            w: Math.abs(cursorX - insX),
                            h: Math.abs(cursorY - insY),
                        }
                    })
                    break
                case "textBox":
                    dispatch(AddTextBox, {
                        position: {
                            x: Number(insX > cursorX ? cursorX : insX),
                            y: Number(insY > cursorY ? cursorY : insY),
                        },
                        size: {
                            w: Math.abs(cursorX - insX),
                            h: Math.abs(cursorY - insY),
                        }
                    })
                    break
            }
            setInsertionAreaY(null)
            setInsertionAreaX(null)
            setInsertionAreaW(null)
            setInsertionAreaH(null)
            dispatch(setInsertionMode, {
                on: false,
                elementType: null,
            })
        }
    }

    function mouseMove(event: any) {
        const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slideRef.current)
        setInsertionAreaW(cursorX)
        setInsertionAreaH(cursorY)
    }

    function mouseDown(event: any) {
        dispatch(deleteSlideSelection)
        if (props.state.insertionMode.on && slideRef.current) {
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
        if (!event.defaultPrevented)
        {
            dispatch(deleteElementSelection)
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
            className={`workspace ${props.state.insertionMode.on && 'workspace_insertion'}`}
        >
            <div className='slide-container' ref={slideRef}>
                {props.state.insertionMode.on
                && insertionAreaX
                && insertionAreaH
                && insertionAreaY
                && insertionAreaW
                && <div className={'insertion-area'} style={insertionStyle}></div>}
                {props.state.currentSlide && !!slideInfo && <Slide
                    slideInfo={slideInfo}
                    selectedElements={props.state.selectedSlideElements}
                />}
            </div>
        </div>
    )
}

export {
    Workspace
}