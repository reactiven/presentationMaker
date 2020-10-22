import React from 'react';
import { state } from '../Entity/State';
import { State } from '../Entity/types';
import { Button } from './Button';
import './TopPanel.css';

type PropsType = {
    state: State,
}

function printNewSquare(): void {
    console.log('New shape')
}

function printNewCircle(): void {
    console.log('New shape')
}

function printNewTriangle(): void {
    console.log('New shape')
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
            <div className="first-row">
                <Button 
                    onClick={printNewImage}
                    img={''}
                    label={'Image'}
                />
                <Button 
                    onClick={printNewTextBox}
                    img={''}
                    label={'TextBox'}
                />
                <Button 
                    onClick={printNewSquare}
                    img={''}
                    label={'Square'}
                />
                <Button 
                    onClick={printNewCircle}
                    img={''}
                    label={'Circle'}
                />
                <Button 
                    onClick={printNewTriangle}
                    img={''}
                    label={'Triangle'}
                />
            </div>
            {state.presentationInfo.name}
        </div>
    )
}

export {
    TopPanel,
}