import React, {useContext, useRef, useState} from "react"
import {Popup} from "../common/Popup"
import {Button} from "../common/Button";
import {SlideType} from "../../Entity/types";
import './EditSlideBackgroundPopup.css';
import { toDataURL } from "../../common/toDataURL";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {popupOpenedReducerActions} from "../../state/popupsOpenedReducers";

type ContentProps = {
    currentSlideInfo: SlideType,
}

function Content(props: ContentProps) {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
    } = store.getState()
    const [color, setColor] = useState<string>(props.currentSlideInfo.background)
    const inputColorRef = useRef<HTMLInputElement | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const inputUrlRef = useRef<HTMLInputElement | null>(null)

    function onImageChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            toDataURL(URL.createObjectURL(img), function(dataUrl: any) {
                presentationInfo.currentSlide && store.dispatch(presentationInfoActions.setSlideBackground(dataUrl))
            })
        }
    }

    function onInputColor() {
        if (inputColorRef.current) {
            setColor(inputColorRef.current.value)
            presentationInfo.currentSlide && store.dispatch(presentationInfoActions.setSlideBackground(inputColorRef.current.value))
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

    function findImageUrl(event: any) {
        if (inputUrlRef.current) {
            setColor(inputUrlRef.current.value)
            presentationInfo.currentSlide && store.dispatch(presentationInfoActions.setSlideBackground(inputUrlRef.current.value))
        }
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
                        defaultValue={color}
                    />
                </div>
            </div>
            <div className='slide-background-content-row'>
                <div className='slide-background-content-row-title'>Изображение с компьютера</div>
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
            <div className='slide-background-content-row'>
                <div className='slide-background-content-row-title'>Изображение из интернета</div>
                <div onClick={onInputClick}>
                    <input
                        type='text'
                        ref={inputUrlRef}
                        onBlur={findImageUrl}
                        className='slide-background-content-url-input'
                        placeholder={'Введите ссылку на изображение'}
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
    const store: Readonly<StoreType> = useContext(StoreContext);
    function closePopup() {
        store.dispatch(popupOpenedReducerActions.setEditSlideBackgroundPopupOpened(false))
    }

    function acceptChange() {
        store.dispatch(popupOpenedReducerActions.setEditSlideBackgroundPopupOpened(false))
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