import {InsertionModeType} from "../Entity/types";
import {PopupOpenedReducerType} from "./popupsOpenedReducers";


let initialState = {
    on: false,
    elementType: null,
}

const insertionModeReducer = (state: InsertionModeType = initialState, action: ActionTypes): InsertionModeType => {
    let newState: InsertionModeType = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "SET_INSERTION_MODE":
            newState = {...action.data.payload}
            break
        default:
            break
    }
    return newState;
}

type ActionTypes = ReturnType<PropertiesType<typeof insertionReducerActions>>;
type PropertiesType<T> = T extends { [key: string]: infer U} ? U: never;

const insertionReducerActions = {
    setInsertionMode : (payload: InsertionModeType) => {
        return {
            type: 'SET_INSERTION_MODE',
            data: {
                payload,
            }
        } as const
    },
}

export {
    insertionModeReducer,
    insertionReducerActions,
}