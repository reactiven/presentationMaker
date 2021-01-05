import React, {useContext} from 'react';
import {StoreType} from './state/store';
import { StoreContext } from './state/storeContext';
import {Editor} from "./components/editor/Editor";
import {PreviewMode} from "./components/preview/PreviewMode";

function App(): JSX.Element {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        preview: {
            onPreview,
        }
    } = store.getState()

    return onPreview
        ? <PreviewMode />
        : <Editor />
}

export {
    App,
}
