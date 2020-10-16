import React from 'react';
import { state } from '../Entity/State';
import { State } from '../Entity/types';
import './TopPanel.css';

type PropsType = {
    state: State,
}

function TopPanel(props: PropsType) {
    return(
        <div className="top-panel">
            {state.presentationInfo.name}
        </div>
    )
}

export {
    TopPanel,
}