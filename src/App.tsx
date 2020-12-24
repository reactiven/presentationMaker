import React, {useContext, useEffect} from 'react';
import './App.css';
import {SideBar} from './components/sidebar/Sidebar';
import {TopPanel} from './components/topPanel/TopPanel';
import {Workspace} from './components/workspace/Workspace';
import {store, StoreType} from './state/store';
import { StoreContext } from './state/storeContext';
import {presentationInfoActions} from "./state/presentationInfoReducer";
import {stateList} from "./Entity/State";
import { saveSlidePreview } from './common/saveSlidePreview';

function App(): JSX.Element {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
    } = store.getState()

    const handleSetPreviewImage = (dataUrl: string) => store.dispatch(presentationInfoActions.setPreviewImage(dataUrl))

    useEffect(() => {
        document.title = presentationInfo.presentation.name
    }, [presentationInfo])

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => {
            document.removeEventListener("keydown", keydownHandler);
        }
    })

    useEffect(() => {
        let timerId = setInterval(() => {
            const lastState = !!stateList.undoStateList.length
                ? stateList.undoStateList[stateList.undoStateList.length]
                : null
            if (lastState != presentationInfo && presentationInfo.currentSlide) {
                saveSlidePreview(handleSetPreviewImage)
            }
        }, 1500);
        return () => clearInterval(timerId)
    })

    const keydownHandler = (e: KeyboardEvent): void => {
        if (e.keyCode === 46) {

            if (!!presentationInfo.selectedSlides.length) {
                store.dispatch(presentationInfoActions.deleteSlides())
            }
            else if (presentationInfo.currentSlide) {
                store.dispatch(presentationInfoActions.deleteElements())
            }
        }
        if (e.keyCode === 90 && e.ctrlKey) {
            store.dispatch(presentationInfoActions.undo())
        }
        if (e.keyCode === 89 && e.ctrlKey) {
            store.dispatch(presentationInfoActions.redo())
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
