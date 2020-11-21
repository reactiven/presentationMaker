import React, {useEffect} from 'react';
import './App.css';
import {SideBar} from './components/sidebar/Sidebar';
import {TopPanel} from './components/topPanel/TopPanel';
import {Workspace} from './components/workspace/Workspace';
import {State} from './Entity/types';
import {dispatch} from "./state/state-manager";
import {DeleteElements} from "./Entity/Slide";
import {redo, undo} from "./Entity/State";
import {deleteSlides} from "./Entity/Presentation";


type PropsType = {
    state: State
}

function App(props: PropsType): JSX.Element {

    useEffect(() => {
        document.title = props.state.presentationInfo.name
    }, [props.state])

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => {
            document.removeEventListener("keydown", keydownHandler);
        }
    })

    const keydownHandler = (e: KeyboardEvent): void => {
        if (e.keyCode === 46) {

            if (!!props.state.selectedSlides.length) {
                dispatch(deleteSlides)
            }
            else {
                dispatch(DeleteElements)
            }
        }
        if (e.keyCode === 90 && e.ctrlKey) {
            dispatch(undo)
        }
        if (e.keyCode === 89 && e.ctrlKey) {
            dispatch(redo)
        }
    }

    return (
        <div className="app-layout">
            <TopPanel
                state={props.state}
            />
            <div className="presentation-block">
                <SideBar state={props.state}/>
                <Workspace state={props.state}/>
            </div>
        </div>
    )
}

export default App
