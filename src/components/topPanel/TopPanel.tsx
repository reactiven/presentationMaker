import React, {useContext, useEffect, useRef} from 'react';
import './TopPanel.css';
import logo from '../../images/logo_tcaer.png';
import { dispatch } from '../../state/state-manager';
import {changeName} from '../../Entity/Presentation';
import { ToolPanel } from './ToolPanel';
import {exportPresentation, goToPreview, savePresentation, uploadPresentation} from '../../Entity/State';
import {Button_WithPopover} from "../common/Button_WithPopover";
import {ActionList} from "../common/ActionList";
import {Button} from "../common/Button";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {previewReducerActions} from "../../state/previewReducer";


function TopPanel() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
    } = store.getState()

    const saveRef = useRef<any|null>(null)
    const nameRef = useRef<HTMLInputElement|null>(null)
    const inputFileRef = useRef<HTMLInputElement|null>(null)

    function onBlur(event: any) {
        store.dispatch(presentationInfoActions.changeName(event.currentTarget.value))
        // dispatch(changeName, {
        //     newName: event.currentTarget.value,
        // })
    }

    function onFileChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            const fileread = new FileReader()
            fileread.onload = function(e: any) {
                const content = e.target.result
                const intern = JSON.parse(content)
                dispatch(uploadPresentation, {
                    newState: intern
                })
            }
            fileread.readAsText(file)
        }
        event.currentTarget.value = ''
    }


    function getFileActionsItem() {
        return [
            {
                id: 'save',
                text: 'Сохранить презентацию',
            },
            {
                id: 'export',
                text: 'Экспортировать в PDF',
            },
            {
                id: 'upload',
                text: 'Загрузить презентацию',
            }
        ]
    }

    function handleClickAction(id: string) {
        if (id === 'save' && saveRef.current) {
            saveRef.current.click()
        }
        if (id === 'export') {
            // exportPresentation(props.state)
        }
        if (id === 'upload' && inputFileRef.current) {
            inputFileRef.current.click()
        }
    }

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.value = presentationInfo.name
        }
    }, [presentationInfo])
    return(
        <div className="top-panel">
            <div className='header-panel'>
                <img src={logo} className='logo' alt='logo'/>
                <div className='tool-bar'>
                    <input
                        type="text"
                        ref={nameRef}
                        defaultValue={presentationInfo.name}
                        onBlur={onBlur}
                        className='presentation-title'/>
                    <div className="second-row">
                        {/*<a*/}
                        {/*    href={savePresentation(store.getState())}*/}
                        {/*    download={`${props.state.presentationInfo.name}.json`}*/}
                        {/*    className={'ref'}*/}
                        {/*    ref={saveRef}*/}
                        {/*></a>*/}
                        <Button_WithPopover
                            text={'Файл'}
                            popover={
                                <ActionList
                                    items={getFileActionsItem()}
                                    onChange={handleClickAction}
                                />
                            }
                        />
                        <input
                            type='file'
                            accept=".json"
                            ref={inputFileRef}
                            onInput={onFileChange}
                            className='upload-file-input'
                        />
                    </div>
                </div>
                <Button
                    label={'Preview'}
                    type={'normal'}
                    onClick={() => store.dispatch(previewReducerActions.setPreviewOpened(true))}
                />
            </div>
            <ToolPanel/>
        </div>
    )
}

export {
    TopPanel,
}