import { renderApp } from "..";
import { saveStateForUndo, stateList } from "../Entity/State";
import { State } from "../Entity/types";
import { initialState } from "../viewModel/initialState";

type fnType = (state: State, payload: any) => State|undefined

let state = initialState

function dispatch(fn: fnType, payload?: any) {
    const newState = fn(state, payload) 
    console.log(state)
    saveStateForUndo(state)
    state = newState !== undefined ? newState : state
    renderApp(state)
}

export {
    dispatch,
    state,
}