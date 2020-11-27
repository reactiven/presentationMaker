import React, {useRef} from 'react';
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
    const slideRef = useRef<HTMLDivElement|null>(null)

    function onClick(event: any) {
        if (props.state.insertionMode.on && slideRef.current) {
            const [cursorX, cursorY] = getParentRelativeCoordinates(event.clientX, event.clientY, slideRef.current)
            switch (props.state.insertionMode.elementType) {
                case 'shape':
                    dispatch(AddShape, {
                        type: props.state.insertionMode.shapeType,
                        position: {
                            x: cursorX,
                            y: cursorY,
                        }
                    })
                    break
                case "image":
                    dispatch(AddImage, {
                        filepath: props.state.insertionMode.filepath,
                        position: {
                            x: cursorX,
                            y: cursorY,
                        }
                    })
                    break
                case "textBox":
                    dispatch(AddTextBox, {
                        position: {
                            x: cursorX,
                            y: cursorY,
                        }
                    })
                    break
            }
            dispatch(setInsertionMode, {
                on: false,
                elementType: null,
            })
        }
        else if (!event.defaultPrevented)
        {
            dispatch(deleteElementSelection)
        }
    }
    return(
        <div
            className={`workspace ${props.state.insertionMode.on && 'workspace_insertion'}`}
            onClick={onClick}
            onMouseDown={() => dispatch(deleteSlideSelection)}
        >
            <div className='slide-container' ref={slideRef}>
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