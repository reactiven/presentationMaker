import React, {useRef} from 'react';
import './TopPanel.css';
import logo from '../../images/logo_tcaer.png';
import { dispatch, state } from '../../state/state-manager';
import { changeName } from '../../Entity/Presentation';
import { ToolPanel } from './ToolPanel';
import { State } from '../../Entity/types';
import {exportPresentation, savePresentation} from '../../Entity/State';
import {Button_WithPopover} from "../common/Button_WithPopover";
import {ActionList} from "../common/ActionList";

type PropsType = {
    state: State,
}

function TopPanel(props: PropsType) {
    const saveRef = useRef<any|null>(null)

    function onBlur(event: any) {
        dispatch(changeName, {
            newName: event.currentTarget.value,
        })
    }

    function getFileActionsItem() {
        return [
            {
                id: 'save',
                text: 'Сохранить презентацию'
            },
            {
                id: 'export',
                text: 'Экспортировать в PDF'
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
    }

    return(
        <div className="top-panel">
            <div className='header-panel'>
                <img src={logo} className='logo' alt='logo'/>
                <div className='tool-bar'>
                    <input type="text" defaultValue={props.state.presentationInfo.name} onBlur={onBlur} className='presentation-title'/>
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