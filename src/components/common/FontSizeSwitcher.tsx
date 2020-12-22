import React, {useContext, useEffect, useRef} from "react";
import minus from '../../images/minus.png';
import plus from '../../images/add_new.png';
import './FontSizeSwitcher.css'
import {isTextBox} from "../../Entity/TextBox";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";

function FontSizeSwitcher() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
    } = store.getState()
    const inputRef = useRef<HTMLInputElement>(null)

    const element = presentationInfo.presentation.slides[Number(presentationInfo.currentSlide)].elements[presentationInfo.selectedSlideElements[0]]

    function sizeInc() {
        if (presentationInfo.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                {
                    ...element.dataElement.font,
                    fontSize: Number(element.dataElement.font.fontSize) + 1,
                },
            ))
        }
    }

    function sizeDec() {
        if (presentationInfo.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                {
                    ...element.dataElement.font,
                    fontSize: Number(element.dataElement.font.fontSize) - 1,
                },
            ))
        }
    }

    function onInput() {
        if (inputRef.current && presentationInfo.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                {
                    ...element.dataElement.font,
                    fontSize: Number(inputRef.current.value),
                },
            ))
        }
    }

    useEffect(() => {
        if (element && isTextBox(element.dataElement) && inputRef.current) {
            inputRef.current.value = String(element.dataElement.font.fontSize)
        }
    }, [inputRef, element.dataElement])

    return(
        <div className='switcher-container'>
            <button className='switch-button' onClick={sizeDec}>
                <img src={minus} alt='logo' className='switch-image-button'/>
            </button>
            <input
                defaultValue={isTextBox(element.dataElement) ? String(element.dataElement.font.fontSize) : 0}
                className='input-size'
                ref={inputRef}
                onInput={onInput}
            />
            <button className='switch-button' onClick={sizeInc}>
                <img src={plus} alt='logo' className='switch-image-button'/>
            </button>
        </div>
    )
}

export {
    FontSizeSwitcher,
}