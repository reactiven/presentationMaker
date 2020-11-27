import './AddImageLinkPopup.css';
import {Popup} from "../common/Popup";
import {Button} from "../common/Button";
import React, {useRef} from "react";
import {dispatch} from "../../state/state-manager";
import {setAddImageLinkPopopOpened, setInsertionMode} from "../../Entity/Presentation";

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
    const inputInfo = useRef<any>({
        value: ''
    })

    function acceptChange() {
        dispatch(setInsertionMode, {
            on: true,
            elementType: 'image',
            filepath: inputInfo.current.value
        })
        dispatch(setAddImageLinkPopopOpened, {
            opened: false,
        })
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
            closePopup={() => dispatch(setAddImageLinkPopopOpened, {
                opened: false,
            })}
        />
    )
}

export {
    AddImageLinkPopup,
}