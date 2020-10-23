import { state } from "../Entity/State";
import { State } from "../Entity/types";

type fnType<T> = (state: State, payload: T) => State

function dispatch<T>(fn: fnType<T>, payload: T): State {
    return fn(state, payload)
}