import React, {useContext, useEffect} from 'react';
import './App.css';
import {SideBar} from './components/sidebar/Sidebar';
import {TopPanel} from './components/topPanel/TopPanel';
import {Workspace} from './components/workspace/Workspace';
import {State} from './Entity/types';
import {dispatch} from "./state/state-manager";
import {DeleteElements} from "./Entity/Slide";
import {redo, undo} from "./Entity/State";
import {deleteSlides} from "./Entity/Presentation";
import { StoreType } from './state/store';
import { StoreContext } from './state/storeContext';
import {presentationInfoActions} from "./state/presentationInfoReducer";
import {selectionReducerActions} from "./state/selectionReducer";


function App(): JSX.Element {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
        selection,
    } = store.getState()

    useEffect(() => {
        document.title = presentationInfo.name
    }, [presentationInfo])

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => {
            document.removeEventListener("keydown", keydownHandler);
        }
    })

    const keydownHandler = (e: KeyboardEvent): void => {
        if (e.keyCode === 46) {

            if (!!selection.selectedSlides.length) {
                store.dispatch(presentationInfoActions.deleteSlides(selection.selectedSlides))
            }
            else if (selection.currentSlide) {
                store.dispatch(presentationInfoActions.deleteElements(selection.currentSlide, selection.selectedSlideElements))
                store.dispatch(selectionReducerActions.deleteElementSelection())
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
            <TopPanel />
            <div className="presentation-block">
                <SideBar />
                <Workspace />
            </div>
        </div>
    )
}

export default App
