import React from 'react'
import { State } from '../Entity/types'

type ButtonProps = {
    callbackFunc: (state: State) => State
    label: string
    onClick: () => ()
}

function Button(props: ButtonProps): JSX.Element {
    return (
        <button className='standard-button'>
            <img src={props.callbackFunc()} />
        </button>
    )

}