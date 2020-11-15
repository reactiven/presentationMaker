import React, {useRef, useState} from "react"
import {Popup} from "../common/Popup"
import {Button} from "../common/Button";
import {dispatch} from "../../state/state-manager";
import {setEditSlideBackgroundPopupOpened} from "../../Entity/Presentation";
import {SlideType} from "../../Entity/types";
import './EditSlideBackgroundPopup.css';
import {AddImage, setSlideBackground} from "../../Entity/Slide";

type ContentProps = {
    currentSlideInfo: SlideType,
}

function Content(props: ContentProps) {
    const [color, setColor] = useState<string>(props.currentSlideInfo.background)
    const inputColorRef = useRef<HTMLInputElement | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    function onImageChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            dispatch(setSlideBackground, {newBackground: URL.createObjectURL(img)})
        }
    }

    function onInputColor() {
        if (inputColorRef.current) {
            setColor(inputColorRef.current.value)
            dispatch(setSlideBackground, {
                newBackground: inputColorRef.current.value,
            })
        }
    }

    function insertImageButton() {
        if (inputFileRef.current) {
            inputFileRef.current.click()
        }
    }

    function onInputClick(event: any) {
        event.stopPropagation()
    }

    return (
        <div className='slide-background-content-container'>
            <div className='slide-background-content-row'>
                <div className='slide-background-content-row-title'>Цвет</div>
                <div onClick={onInputClick}>
                    <input
                        type='color'
                        ref={inputColorRef}
                        onInput={onInputColor}
                        value={color}
                    />
                </div>
            </div>
            <div className='slide-background-content-row'>
                <div className='slide-background-content-row-title'>Изображение</div>
                <div onClick={onInputClick}>
                    <Button
                        type={'normal'}
                        onClick={insertImageButton}
                        label={'Вставить картинку'}
                    />
                    <input
                        type='file'
                        accept=".png, .jpg"
                        ref={inputFileRef}
                        onInput={onImageChange}
                        className='slide-background-content-file-input'
                    />
                </div>
            </div>
        </div>
    )
}

type PropsType = {
    currentSlideInfo: SlideType,
}

function EditSlideBackgroundPopup(props: PropsType) {
    function closePopup() {
        dispatch(setEditSlideBackgroundPopupOpened, {
            opened: false,
        })
    }

    function acceptChange() {
        dispatch(setEditSlideBackgroundPopupOpened, {
            opened: false,
        })
    }

    return (
        <Popup
            headerText={'Фон слайда'}
            content={<Content
                currentSlideInfo={props.currentSlideInfo}
            />}
            acceptButton={<Button
                type={'normal'}
                onClick={acceptChange}
                label={'Применить'}
            />}
            closePopup={closePopup}
        />
    )
}

export {
    EditSlideBackgroundPopup,
}