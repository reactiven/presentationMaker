import {dispatch} from "../../state/state-manager";
import {Button} from "../common/Button";
import textbox from  '../../images/textbox.png';
import shape from '../../images/shape.png';
import React from "react";
import {AddShape, AddTextBox} from "../../Entity/Slide";
import {Button_WithPopover} from "../common/Button_WithPopover";
import {ActionList} from "../common/ActionList";
import './AddElementsBlock.css';


function AddElementsBlock() {

    function getShapePopoverItems() {
        return [
            {
                id: 'rect',
                text: 'rectangle',
            },
            {
                id: 'circle',
                text: 'circle',
            },
            {
                id: 'triangle',
                text: 'triangle',
            },
        ]
    }

    function handleAddShape(id: string) {
        dispatch(AddShape, {
            type: id,
        })
    }

    return(
        <div className='add-elements-block'>
            <Button
                type={'border-none'}
                img={textbox}
                onClick={() => dispatch(AddTextBox)}
            />
            <Button_WithPopover
                img={shape}
                popover={<ActionList
                    items={getShapePopoverItems()}
                    onChange={handleAddShape}
                />}
            />
        </div>
    )
}

export {
    AddElementsBlock,
}