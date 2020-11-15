import React  from 'react';
import './TopPanel.css';
import logo from '../../images/logo_tcaer.png';
import { dispatch, state } from '../../state/state-manager';
import { changeName } from '../../Entity/Presentation';
import { ToolPanel } from './ToolPanel';
import { State } from '../../Entity/types';
import { savePresentation } from '../../Entity/State';

type PropsType = {
    state: State,
}

function TopPanel(props: PropsType) {

    function download(): string {
        return savePresentation(state)
    }

    function onBlur(event: any) {
        dispatch(changeName, {
            newName: event.currentTarget.value,
        })
    }

    function onChangeHandler(e: any) {
        console.log(e.target.files[0])
    } 

    let fileURL = download()
    let fileName = `${props.state.presentationInfo.name}.json`


    return(
        <div className="top-panel">
            <div className='header-panel'>
                <img src={logo} className='logo' alt='logo'/>
                <div className='tool-bar'>
                    <input type="text" defaultValue={props.state.presentationInfo.name} onBlur={onBlur} className='presentation-title'/>
                    <div className="second-row">
                        <a href={fileURL} download={fileName}>Download!</a>
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