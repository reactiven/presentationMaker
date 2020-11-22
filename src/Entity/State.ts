import jsPDF from 'jspdf'
import { state } from '../state/state-manager'
import { State, StateList } from './types'

// Не уверен что так мы будем задавать массивы, тут вопросик
const stateList: StateList = {
	undoStateList: [],
	redoStateList: [],
}

function exportPresentation(state: State): void {
	const slides = [...state.presentationInfo.slides]
	const doc = new jsPDF()
	slides.forEach((slide, index) => {
		doc.addImage(slide.previewImage,'JPEG', 7, 40, 200, 115)
		if (index < slides.length - 1) {
			doc.addPage()
		}
	})
	doc.save(`${state.presentationInfo.name}.pdf`)
}

function savePresentation(state: State): string {
	const file = new Blob(
		[JSON.stringify(state)],
		{ type: 'application/json'}
	)
	
	const fileURL = URL.createObjectURL(file)

	return fileURL	
}
// function uploadPresentation(filepath: string): State{
// 	return state
// }
function goToPreview(state: State): State{
	return {
		...state,
		onPreview: true
	}
}

function saveStateForUndo(state: State): void {
	stateList.undoStateList.push(state)
}

function undo(): State|undefined {
	const newState = stateList.undoStateList.pop()
	if (newState) {
		stateList.redoStateList.push(state)
	}
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
	exportPresentation,
	savePresentation,
	goToPreview,
	saveStateForUndo,
	undo,
	redo,
	stateList,
}
