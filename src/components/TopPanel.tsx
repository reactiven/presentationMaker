import React from 'react';
import { redo, state, undo } from '../Entity/State';
import { State } from '../Entity/types';
import { Button } from './Button';
import './TopPanel.css';
import logo from '../images/logo_tcaer.png';
import { dispatch } from '../state/state-manager';
import { changeName } from '../Entity/Presentation';
import { AddShape, AddTextBox } from '../Entity/Slide';
import { ToolPanel } from './ToolPanel';

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

    function onBlur(event: any) {
        dispatch(changeName, {
            newName: event.currentTarget.value,
        })
    }

    return(
        <div className="top-panel">
            <div className='header-panel'>
                <img src={logo} className='logo' alt='logo'/>
                <div className='tool-bar'>
                    <input type="text" defaultValue={state.presentationInfo.name} onBlur={onBlur} className='presentation-title'/>
                    <div className="second-row">
                        <Button 
                            onClick={printNewImage}
                            label={'Image'}
                        />
                        <Button 
                            onClick={printNewTextBox}
                            label={'TextBox'}
                        />
                        <Button 
                            onClick={printNewSquare}
                            label={'Square'}
                        />
                        <Button 
                            onClick={printNewCircle}
                            label={'Circle'}
                        />
                        <Button 
                            onClick={printNewTriangle}
                            label={'Triangle'}
                        />
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