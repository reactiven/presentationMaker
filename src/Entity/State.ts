import {PresentationType, StateList} from './types'

const stateList: StateList = {
	undoStateList: [],
	redoStateList: [],
}

function saveStateForUndo(state: PresentationType): void {
	const newState = JSON.parse(JSON.stringify(state))
	stateList.undoStateList.push(newState)
}

export {
	saveStateForUndo,
	stateList,
}
