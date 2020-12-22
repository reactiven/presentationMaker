import {combineReducers, createStore} from "redux";
import {insertionModeReducer} from "./insertionModeReducer";
import {popupsOpenedReducer} from "./popupsOpenedReducers";
import {previewReducer} from "./previewReducer";
import {presentationInfoReducer} from "./presentationInfoReducer";


const rootReducer = combineReducers({
    insertionMode: insertionModeReducer,
    popupsOpened: popupsOpenedReducer,
    preview: previewReducer,
    presentationInfo: presentationInfoReducer,
})

const store = createStore(rootReducer);

export declare type StoreType = typeof store;

export {
    store,
}