import React from 'react';
import { Button } from '../common/Button';
import './TopPanel.css';
import logo from '../../images/logo_tcaer.png';
import { dispatch, state } from '../../state/state-manager';
import { changeName } from '../../Entity/Presentation';
import { AddShape, AddTextBox } from '../../Entity/Slide';
import { ToolPanel } from './ToolPanel';
import { State } from '../../Entity/types';
import { savePresentation } from '../../Entity/State';

type PropsType = {
    state: State,
}

function printNewSquare(): void {
    dispatch(AddShape, {
        type: 'rect',
    })
}

function printNewCircle(): void {
    dispatch(AddShape, {
        type: 'circle',
    })
}

function printNewTriangle(): void {
    dispatch(AddShape, {
        type: 'triangle',
    })
}

function printNewTextBox(): void {
    dispatch(AddTextBox)
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
                        <Button 
                            type={'normal'}
                            onClick={printNewTextBox}
                            label={'TextBox'}
                        />
                        <Button 
                            type={'normal'}
                            onClick={printNewSquare}
                            label={'Square'}
                        />
                        <Button 
                            type={'normal'}
                            onClick={printNewCircle}
                            label={'Circle'}
                        />
                        <Button 
                            type={'normal'}
                            onClick={printNewTriangle}
                            label={'Triangle'}
                        />
                        <a href={fileURL} download={fileName}>Download!</a>
                    </div>
                </div>
            </div>
            <ToolPanel />
        </div>
    )
}

export {
    TopPanel,
}