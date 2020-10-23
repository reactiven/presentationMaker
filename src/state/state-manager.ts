import { renderApp } from "..";
import { saveStateForUndo, stateList } from "../Entity/State";
import { State } from "../Entity/types";
import { initialState } from "../viewModel/initialState";

type fnType = (state: State, payload: any) => State|undefined

let state = initialState

function dispatch(fn: fnType, payload?: any) {
    const newState = fn(state, payload) 
    if (JSON.stringify(state) !== JSON.stringify(newState)) {
        console.log(state)
        saveStateForUndo(state)
        state = newState ? newState : state
        renderApp(state)
    }
}

export {
    dispatch,
    state,
}