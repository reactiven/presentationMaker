import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {State} from './Entity/types';
import {initialState} from './viewModel/initialState';
import {EditSlideBackgroundPopup} from './components/popups/EditSlideBackgroundPopup';
import {getCurrentSlideInfo} from "./Entity/Presentation";


function renderApp(state: State) {
    const currentSlideInfo = getCurrentSlideInfo(state)
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}/>
            {state.editSlideBackgroundPopupOpened && currentSlideInfo && <EditSlideBackgroundPopup currentSlideInfo={currentSlideInfo}/>}
        </React.StrictMode>,
        document.getElementById('root')
    );
}

renderApp(initialState)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export {
    renderApp,
}
