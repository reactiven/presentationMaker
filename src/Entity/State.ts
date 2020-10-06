import { presentation } from './Presentation'
import { State } from './types'

// Не уверен что так мы будем задавать массивы, тут вопросик
let undoStateList = []
let redoStateList = []

const state: State = {
	selectedSlides: [
		1,
	],
	selectedSlideElements: [1, 2],
	currentSlide: 1,
	presentationInfo: presentation,
	onPreview: false,
}

function exportPresentation(state: State): void {}
function savePresentation(state: State): void {}
function uploadPresentation(filepath: string): State{
	return state
}
function goToPreview(state: State): State{
	return {
		...state,
		onPreview: true
	}
}

// Вызывать эту функцию в конце всех функций, которые изменяют состояние
function saveStateForUndo(state: State) {
	undoStateList.push(state)
}



function undo(): State {
	let newState: State = undoStateList.pop()
	redoStateList.push(newState)

	return newState
}
function redo(): State {
	let newState: State = redoStateList.pop()

	return state
}

export {
	exportPresentation,
	savePresentation,
	uploadPresentation,
	goToPreview,
	undo,
	redo,
}
