import React, {useEffect, useRef} from 'react';
import './TopPanel.css';
import logo from '../../images/logo_tcaer.png';
import { dispatch, state } from '../../state/state-manager';
import {changeName, setInsertionMode} from '../../Entity/Presentation';
import { ToolPanel } from './ToolPanel';
import { State } from '../../Entity/types';
import {exportPresentation, savePresentation, uploadPresentation} from '../../Entity/State';
import {Button_WithPopover} from "../common/Button_WithPopover";
import {ActionList} from "../common/ActionList";

type PropsType = {
    state: State,
}

function TopPanel(props: PropsType) {
    const saveRef = useRef<any|null>(null)
    const nameRef = useRef<HTMLInputElement|null>(null)
    const inputFileRef = useRef<HTMLInputElement|null>(null)

    function onBlur(event: any) {
        dispatch(changeName, {
            newName: event.currentTarget.value,
        })
    }

    function onFileChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            const fileread = new FileReader()
            fileread.onload = function(e: any) {
                debugger
                const content = e.target.result
                const intern = JSON.parse(content)
                dispatch(uploadPresentation, {
                    newState: intern
                })
                console.log(intern)
            }
            debugger
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
        if (id == 'save' && saveRef.current) {
            saveRef.current.click()
        }
        if (id == 'export') {
            exportPresentation(props.state)
        }
        if (id == 'upload' && inputFileRef.current) {
            inputFileRef.current.click()
        }
    }

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.value = props.state.presentationInfo.name
        }
    }, [props.state.presentationInfo])
    return(
        <div className="top-panel">
            <div className='header-panel'>
                <img src={logo} className='logo' alt='logo'/>
                <div className='tool-bar'>
                    <input
                        type="text"
                        ref={nameRef}
                        defaultValue={props.state.presentationInfo.name}
                        onBlur={onBlur}
                        className='presentation-title'/>
                    <div className="second-row">
                        <a
                            href={savePresentation(props.state)}
                            download={`${props.state.presentationInfo.name}.json`}
                            className={'ref'}
                            ref={saveRef}
                        ></a>
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
            </div>
            <ToolPanel state={props.state}/>
        </div>
    )
}

export {
    TopPanel,
}