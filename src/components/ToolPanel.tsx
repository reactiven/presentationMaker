import React from 'react';
import { Button } from './Button';
import './ToolPanel.css';
import plusIcon from '../images/add_new.png';
import arrowLeft from '../images/undo.png';
import arrowRight from '../images/redo.png';
import { dispatch } from '../state/state-manager';
import { addSlide } from '../Entity/Presentation';
import { redo, undo } from '../Entity/State';

function ToolPanel() {

    return(
        <div className='toolpanel'>
            <Button 
                img={plusIcon}
                onClick={() => dispatch(addSlide)}
            />
            <Button 
                img={arrowLeft}
                onClick={() => dispatch(undo)}
            />
            <Button 
                img={arrowRight}
                onClick={() => dispatch(redo)}
            />
        </div>
    )
}

export {
    ToolPanel,
}