import React from 'react';
import { getCurrentSlideInfo } from '../Entity/Presentation';
import { DeleteElements } from '../Entity/Slide';
import { deleteElementSelection } from '../Entity/SlideElement';
import { undo } from '../Entity/State';
import { State } from '../Entity/types';
import { dispatch } from '../state/state-manager';
import { Slide } from './Slide';
import './WorkSpace.css';

type PropsType = {
    state: State,
}

function Workspace(props: PropsType) {
    const slideInfo = getCurrentSlideInfo(props.state)

    function onClick(event: any) {
        if (!event.defaultPrevented)
        {
            dispatch(deleteElementSelection)
        }
    }

    const keydownHandler = (e: KeyboardEvent): void => {
        if (e.keyCode === 46) {
            dispatch(DeleteElements)
        }
        if (e.keyCode == 90 && e.ctrlKey) {
            dispatch(undo)
        }
    }

    document.addEventListener('keydown', keydownHandler)

    return(
        <div className="workspace" onClick={onClick}>
            {slideInfo && <Slide 
                slideInfo={slideInfo}
                selectedElements={props.state.selectedSlideElements}
            />}
        </div>
    )
}

export {
    Workspace
}