import React from 'react';
import { state } from '../Entity/State';
import { State } from '../Entity/types';
import { Button } from './Button';
import './TopPanel.css';
import logo from '../images/logo_tcaer.png';

type PropsType = {
    state: State,
}

function printNewSquare(): void {
    console.log('New square')
}

function printNewCircle(): void {
    console.log('New circle')
}

function printNewTriangle(): void {
    console.log('New triangle')
}

function printNewTextBox(): void {
    console.log('New textBox')
}


function printNewImage(): void {
    console.log('New image')
}

function TopPanel(props: PropsType) {
    return(
        <div className="top-panel">
            <div className='header-panel'>
                <img src={logo} className='logo'/>
                <div className='tool-bar'>
                    <input type="text" defaultValue={state.presentationInfo.name} className='presentation-title'/>
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
        </div>
    )
}

export {
    TopPanel,
}