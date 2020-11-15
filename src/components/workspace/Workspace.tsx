import React  from 'react';
import {deleteSlideSelection, getCurrentSlideInfo} from '../../Entity/Presentation';
import { deleteElementSelection } from '../../Entity/SlideElement';
import { State } from '../../Entity/types';
import { dispatch } from '../../state/state-manager';
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
        dispatch(deleteSlideSelection)
    }

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