import jsPDF from 'jspdf'
import { state } from '../state/state-manager'
import { State, StateList } from './types'

const stateList: StateList = {
	undoStateList: [],
	redoStateList: [],
}

function exportPresentation(state: State): void {
	const slides = {...state.presentationInfo.slides}
	const slidesOrder = [...state.presentationInfo.slidesOrder]
	const doc = new jsPDF()
	slidesOrder.forEach((slideId, index) => {
		const slide = {...slides[slideId]}
		doc.addImage(slide.previewImage,'JPEG', 5, 40, 200, 115)
		if (index < Object.keys(slides).length - 1) {
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

function uploadPresentation(state: State, payload: {newState: State}): State{
	return payload.newState
}

function goToPreview(state: State): State{
	return {
		...state,
		previewInfo: {
			currentSlide: 0,
			onPreview: true
		}
	}
}

function closePreview(state: State): State{
	return {
		...state,
		previewInfo: {
			currentSlide: 0,
			onPreview: false
		}
	}
}

function nextSlide(state: State): State {
	const slideCount = Object.keys(state.presentationInfo.slides).length
	return {
		...state,
		previewInfo: {
			...state.previewInfo,
			currentSlide: state.previewInfo.currentSlide < slideCount - 1
				? state.previewInfo.currentSlide + 1
				: state.previewInfo.currentSlide,
		}
	}
}

function prevSlide(state: State): State {
	return {
		...state,
		previewInfo: {
			...state.previewInfo,
			currentSlide: state.previewInfo.currentSlide > 0
				? state.previewInfo.currentSlide - 1
				: state.previewInfo.currentSlide,
		}
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
	nextSlide,
	prevSlide,
	stateList,
	uploadPresentation,
	closePreview,
}
