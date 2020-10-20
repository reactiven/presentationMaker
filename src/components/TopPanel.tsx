import React from 'react';
import { state } from '../Entity/State';
import { ButtonProps, State } from '../Entity/types';
import { Button } from './Button';
import './TopPanel.css';

type PropsType = {
    state: State,
}

function printNewShape(): void {
    console.log('New shape')
}


function printNewTextBox(): void {
    console.log('New textBox')
}


function printNewImage(): void {
    console.log('New image')
}

function TopPanel(props: PropsType) {
    let addShapeButtonProps: ButtonProps = {
        onClick: printNewShape,
        img:'',
        label:'Shape',
    }
    let addTextBoxProps: ButtonProps = {
        onClick: printNewTextBox,
        img:'',
        label:'TextBox',
    }
    let addImageProps: ButtonProps = {
        onClick: printNewImage,
        img:'',
        label:'Image',
    }
    return(
        <div className="top-panel">
            <div className="first-row">
                {Button(addShapeButtonProps)}
                {Button(addTextBoxProps)}
                {Button(addImageProps)}
            </div>
            {state.presentationInfo.name}
        </div>
    )
}

export {
    TopPanel,
}