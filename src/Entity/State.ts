import jsPDF from 'jspdf'
import { State, StateList } from './types'

const stateList: StateList = {
	undoStateList: [],
	redoStateList: [],
}

function saveStateForUndo(state: State): void {
	stateList.undoStateList.push(state)
}

function undo(): State|undefined {
	const newState = stateList.undoStateList.pop()
	// if (newState) {
	// 	stateList.redoStateList.push(state)
	// }
	return newState
}

function redo(): State|undefined {
	const newState = stateList.redoStateList.pop()
	if (newState) {
		saveStateForUndo(newState)
	}
	return newState
}

export {
	saveStateForUndo,
	undo,
	redo,
	stateList,
}
