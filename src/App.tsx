import React, {useContext, useEffect} from 'react';
import './App.css';
import {SideBar} from './components/sidebar/Sidebar';
import {TopPanel} from './components/topPanel/TopPanel';
import {Workspace} from './components/workspace/Workspace';
import {redo, undo} from "./Entity/State";
import { StoreType } from './state/store';
import { StoreContext } from './state/storeContext';
import {presentationInfoActions} from "./state/presentationInfoReducer";


function App(): JSX.Element {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
    } = store.getState()

    useEffect(() => {
        document.title = presentationInfo.presentation.name
    }, [presentationInfo])

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => {
            document.removeEventListener("keydown", keydownHandler);
        }
    })

    const keydownHandler = (e: KeyboardEvent): void => {
        if (e.keyCode === 46) {

            if (!!presentationInfo.selectedSlides.length) {
                store.dispatch(presentationInfoActions.deleteSlides())
            }
            else if (presentationInfo.currentSlide) {
                store.dispatch(presentationInfoActions.deleteElements())
                store.dispatch(presentationInfoActions.deleteElementSelection())
            }
        }
        if (e.keyCode === 90 && e.ctrlKey) {
            // dispatch(undo)
        }
        if (e.keyCode === 89 && e.ctrlKey) {
            // dispatch(redo)
        }
    }

    return (
        <div className="app-layout">
            <TopPanel />
            <div className="presentation-block">
                <SideBar />
                <Workspace />
            </div>
        </div>
    )
}

export default App
