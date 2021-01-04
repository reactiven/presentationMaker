import {Button} from "../common/Button";
import textbox from  '../../images/textbox.png';
import shape from '../../images/shape.png';
import image from '../../images/image-logo.png'
import React, {useContext, useRef} from "react";
import {Button_WithPopover} from "../common/Button_WithPopover";
import {ActionList} from "../common/ActionList";
import circle from '../../images/circle.png';
import rect from '../../images/rect.png';
import triangle from '../../images/triangle.png';
import styles from './AddElementsBlock.module.css';
import {ToolSeparator} from "./ToolPanel";
import {toDataURL} from "../../common/toDataURL";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {insertionReducerActions} from "../../state/insertionModeReducer";
import {popupOpenedReducerActions} from "../../state/popupsOpenedReducers";


function AddElementsBlock() {
    const store: Readonly<StoreType> = useContext(StoreContext);

    const inputFileRef = useRef<HTMLInputElement|null>(null)

    function onImageChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            toDataURL(URL.createObjectURL(img), function(dataUrl: any) {
                store.dispatch(insertionReducerActions.setInsertionMode({
                    on: true,
                    elementType: 'image',
                    filepath: dataUrl,
                }))
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
        store.dispatch(insertionReducerActions.setInsertionMode({
            on: true,
            elementType: 'shape',
            // @ts-ignore
            shapeType: id,
        }))
    }

    function handleTextBox() {
        store.dispatch(insertionReducerActions.setInsertionMode({
            on: true,
            elementType: 'textBox',
        }))
    }

    function handleAddImage(id: string) {
        if (id === 'file') {
            inputFileRef.current && inputFileRef.current.click()
        }
        if (id === 'ref') {
            store.dispatch(popupOpenedReducerActions.setAddImageLinkPopupOpened(true))
        }
    }

    return(
        <div className={styles.addElementsBlock}>
            <Button
                type={'border-none'}
                img={textbox}
                onClick={handleTextBox}
            />
            <Button_WithPopover
                img={shape}
                popoverContent={<ActionList
                    items={getShapePopoverItems()}
                    onChange={handleAddShape}
                />}
            />
            <div>
                <Button_WithPopover
                    img={image}
                    popoverContent={<ActionList
                        items={getImagePopoverItems()}
                        onChange={handleAddImage}
                    />}
                />
                <input
                    type='file'
                    accept=".png, .jpg"
                    ref={inputFileRef}
                    onInput={onImageChange}
                    className={styles.addImageInput}
                />
            </div>
            <ToolSeparator/>
        </div>
    )
}

export {
    AddElementsBlock,
}