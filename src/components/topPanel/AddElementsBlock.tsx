import {dispatch} from "../../state/state-manager";
import {Button} from "../common/Button";
import textbox from  '../../images/textbox.png';
import shape from '../../images/shape.png';
import image from '../../images/image-logo.png'
import React from "react";
import {AddShape, AddTextBox} from "../../Entity/Slide";
import {Button_WithPopover} from "../common/Button_WithPopover";
import {ActionList} from "../common/ActionList";
import circle from '../../images/circle.png';
import rect from '../../images/rect.png';
import triangle from '../../images/triangle.png';
import './AddElementsBlock.css';


function AddElementsBlock() {

    function getShapePopoverItems() {
        return [
            {
                id: 'rect',
                text: 'rectangle',
                img: rect,
            },
            {
                id: 'circle',
                text: 'circle',
                img: circle,
            },
            {
                id: 'triangle',
                text: 'triangle',
                img: triangle,
            },
        ]
    }

    function getImagePopoverItems() {
        return [
            {
                id: 'file',
                text: 'Загрузить с компьютера'
            },
            {
                id: 'ref',
                text: 'Вставить из интернета',
            }
        ]
    }

    function handleAddShape(id: string) {
        dispatch(AddShape, {
            type: id,
        })
    }

    function handleAddImage(id: string) {
        console.log('add image')
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
            <Button_WithPopover
                img={image}
                popover={<ActionList
                    items={getImagePopoverItems()}
                    onChange={handleAddImage}
                />}
            />
        </div>
    )
}

export {
    AddElementsBlock,
}