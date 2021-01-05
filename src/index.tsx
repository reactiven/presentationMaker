import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './state/store';
import { StoreContext } from './state/storeContext';
import { App } from './App';
import { initExternalLayer } from './common/externalLayers';


function rerenderEntireTree() {
    ReactDOM.render(
        <StoreContext.Provider value={store}>
            <App/>
        </StoreContext.Provider>, document.getElementById("root")
    )
}

initExternalLayer("popup")
initExternalLayer("popover")
rerenderEntireTree()


store.subscribe(() => {
    rerenderEntireTree();
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
