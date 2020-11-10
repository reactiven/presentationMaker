import React, { ChangeEvent } from 'react';
import { Button } from '../common/Button';
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

function printNewImage(): void {
    console.log('New image')
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
                        <Button 
                            type={'normal'}
                            onClick={printNewImage}
                            label={'Image'}
                        />
                        <a href={fileURL} download={fileName}>Download!</a>
                        <input type='file' name='file' onChange={onChangeHandler}/>
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