import React from 'react';
import { getCurrentSlideInfo } from '../Entity/Presentation';
import { State } from '../Entity/types';
import { Slide } from './Slide';
import './WorkSpace.css';

type PropsType = {
    state: State,
}

function Workspace(props: PropsType) {
    const slideInfo = getCurrentSlideInfo(props.state)
    return(
        <div className="workspace">
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