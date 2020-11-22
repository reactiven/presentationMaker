import {dispatch} from "../../state/state-manager";
import {Button} from "../common/Button";
import textbox from  '../../images/textbox.png';
import shape from '../../images/shape.png';
import image from '../../images/image-logo.png'
import React, { useRef } from "react";
import {AddImage, AddShape, AddTextBox} from "../../Entity/Slide";
import {Button_WithPopover} from "../common/Button_WithPopover";
import {ActionList} from "../common/ActionList";
import circle from '../../images/circle.png';
import rect from '../../images/rect.png';
import triangle from '../../images/triangle.png';
import './AddElementsBlock.css';
import {setAddImageLinkPopopOpened, setInsertionMode} from "../../Entity/Presentation";
import {ToolSeparator} from "./ToolPanel";


function AddElementsBlock() {
    const inputFileRef = useRef<HTMLInputElement|null>(null)

    function onImageChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            dispatch(setInsertionMode, {
                on: true,
                elementType: 'image',
                filepath: URL.createObjectURL(img),
            })
        }
        event.currentTarget.value = ''
    }

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
        dispatch(setInsertionMode, {
            on: true,
            elementType: 'shape',
            shapeType: id,
        })
    }

    function handleAddImage(id: string) {
        if (id === 'file') {
            inputFileRef.current && inputFileRef.current.click()
        }
        if (id == 'ref') {
            dispatch(setAddImageLinkPopopOpened, {
                opened: true,
            })
        }
    }

    return(
        <div className='add-elements-block'>
            <Button
                type={'border-none'}
                img={textbox}
                onClick={() => dispatch(setInsertionMode, {
                    on: true,
                    elementType: 'textBox',
                })}
            />
            <Button_WithPopover
                img={shape}
                popover={<ActionList
                    items={getShapePopoverItems()}
                    onChange={handleAddShape}
                />}
            />
            <div>
                <Button_WithPopover
                    img={image}
                    popover={<ActionList
                        items={getImagePopoverItems()}
                        onChange={handleAddImage}
                    />}
                />
                <input
                    type='file'
                    accept=".png, .jpg"
                    ref={inputFileRef}
                    onInput={onImageChange}
                    className='slide-background-content-file-input'
                />
            </div>
            <ToolSeparator/>
        </div>
    )
}

export {
    AddElementsBlock,
}