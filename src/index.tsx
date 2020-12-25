import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {EditSlideBackgroundPopup} from './components/popups/EditSlideBackgroundPopup';
import {AddImageLinkPopup} from "./components/popups/AddImageLinkPopup";
import { store } from './state/store';
import { StoreContext } from './state/storeContext';
import { PreviewMode } from './components/preview/PreviewMode';
import { App } from './App';

function rerenderEntireTree() {
    const {
        preview,
        popupsOpened,
        presentationInfo,
    } = store.getState()
    const currentSlideInfo = presentationInfo.currentSlide
        ? presentationInfo.presentation.slides[presentationInfo.currentSlide]
        : null

    ReactDOM.render(
        <StoreContext.Provider value={store}>
            {!preview.onPreview && <App/>}
            {preview.onPreview && <PreviewMode/>}
            {popupsOpened.editSlideBackgroundPopupOpened && currentSlideInfo && <EditSlideBackgroundPopup currentSlideInfo={currentSlideInfo}/>}
            {popupsOpened.addImageLinkPopupOpened && <AddImageLinkPopup />}
        </StoreContext.Provider>, document.getElementById("root")
    )
}

rerenderEntireTree();

store.subscribe(() => {
    rerenderEntireTree();
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
