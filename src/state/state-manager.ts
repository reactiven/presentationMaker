import { renderApp } from "..";
import { redo, saveStateForUndo, stateList, undo } from "../Entity/State";
import { State } from "../Entity/types";
import { initialState } from "../viewModel/initialState";

type fnType = (state: State, payload: any) => State|undefined

let state = initialState

function dispatch(fn: fnType, payload?: any) {
    const newState = fn(state, payload)
	console.log(stateList)
    if (fn !== undo && fn !== redo) {
        saveStateForUndo(state) 
    }
    state = newState ? newState : state
    console.log(state)
    renderApp(state)
}

export {
    dispatch,
    state,
}