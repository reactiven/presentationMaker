import './AddImageLinkPopup.css';
import {Popup} from "../common/Popup";
import {Button} from "../common/Button";
import React, {useContext, useRef} from "react";
import {dispatch} from "../../state/state-manager";
import {setAddImageLinkPopopOpened, setInsertionMode} from "../../Entity/Presentation";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {insertionReducerActions} from "../../state/insertionModeReducer";
import {popupOpenedReducerActions} from "../../state/popupsOpenedReducers";

type ContentProps = {
    inputInfo: any,
}

function Content(props: ContentProps) {

    const inputUrlRef = useRef<HTMLInputElement | null>(null)

    function onInputChange(event: any) {
        props.inputInfo.current.value = inputUrlRef.current!.value
    }

    return (
        <div className='add-image-content-container'>
            <div className='add-image-content-row'>
                <div className='add-image-content-row-title'>Ссылка на изображение</div>
                <div>
                    <input
                        type='text'
                        ref={inputUrlRef}
                        onChange={onInputChange}
                        defaultValue={props.inputInfo.current.value}
                    />
                </div>
            </div>
        </div>
    )
}


function AddImageLinkPopup() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const inputInfo = useRef<any>({
        value: ''
    })
    function closePopup() {
        store.dispatch(popupOpenedReducerActions.setAddImageLinkPopupOpened(false))
    }

    function acceptChange() {
        store.dispatch(insertionReducerActions.setInsertionMode({
            on: true,
            elementType: 'image',
            filepath: inputInfo.current.value
        }))
        store.dispatch(popupOpenedReducerActions.setAddImageLinkPopupOpened(false))
    }

    return (
        <Popup
            headerText={'Изображение из интернета'}
            content={<Content
                inputInfo={inputInfo}
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
    AddImageLinkPopup,
}