import { renderApp } from "..";
import { redo, saveStateForUndo, undo } from "../Entity/State";
import { State } from "../Entity/types";
import { initialState } from "../viewModel/initialState";
import * as htmlToImage from "html-to-image";
import {setPreviewImage} from "../Entity/Slide";

type fnType = (state: State, payload: any) => State|undefined

let state = initialState

function dispatch(fn: fnType, payload?: any) {
    const newState = fn(state, payload)
    if (fn !== undo && fn !== redo) {
        saveStateForUndo(state) 
    }
    state = newState ? newState : state
    const slide = document.getElementById('slide')
    if (slide) {
        htmlToImage.toJpeg(slide, {
            quality: 0.5,
        })
            .then(function (dataUrl) {
                state = setPreviewImage(state,{
                    image: dataUrl,
                })
                renderApp(state)
            });
    }
    renderApp(state)
}

export {
    dispatch,
    state,
}