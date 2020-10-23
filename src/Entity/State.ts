import { presentation } from './Presentation'
import { State, StateList } from './types'

// Не уверен что так мы будем задавать массивы, тут вопросик
const stateList: StateList = {
	undoStateList: [],
	redoStateList: [],
}

const state: State = {
	selectedSlides: [
		1,
	],
	selectedSlideElements: [1, 2],
	currentSlide: 1,
	presentationInfo: presentation,
	onPreview: false,
}

// function exportPresentation(state: State): void {}
// function savePresentation(state: State): void {}
// function uploadPresentation(filepath: string): State{
// 	return state
// }
function goToPreview(state: State): State{
	return {
		...state,
		onPreview: true
	}
}

// Вызывать эту функцию в конце всех функций, которые изменяют состояние
function saveStateForUndo(state: State): void {
	stateList.undoStateList.push(state)
}

function undo(): State|undefined {
	const newState = stateList.undoStateList.pop()
	if (newState)
	{
		stateList.redoStateList.push(newState)
	}
	return newState
}
function redo(): State|undefined {
	const newState = stateList.redoStateList.pop()
	return newState
}

export {
	goToPreview,
	saveStateForUndo,
	undo,
	redo,
	stateList,
	state,
}
