import {InsertionModeType} from "../Entity/types";


let initialState = {
    on: false,
    elementType: null,
}

const insertionModeReducer = (state: InsertionModeType = initialState, action: ActionTypes): InsertionModeType => {
    let newState: InsertionModeType = state
    switch (action.type) {
        case "SET_INSERTION_MODE":
            newState = {...action.data.payload}
            break
        case "RESET_STATE_TO_DEFAULT":
            newState = {
                on: false,
                elementType: null,
            }
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
    resetStateToDefault: () => {
        return {
            type: 'RESET_STATE_TO_DEFAULT',
        } as const
    }
}

export {
    insertionModeReducer,
    insertionReducerActions,
}