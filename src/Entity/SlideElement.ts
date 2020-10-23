import { textBox } from './TextBox'
import { State } from './types'

const slideElement = {
	type: 'texBox',
	dataElement: textBox,
	width: 1000,
	height: 1000,
	xPos: 200,
	yPos: 300,
	elementId: 1,
}

function moveElement(state: State, payload: {elementId: number, newX: number, newY: number}): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const element = {...elements[elements.findIndex(element => element.elementId === payload.elementId)]}
	element.xPos = payload.newX
	element.yPos = payload.newY
	elements[elements.findIndex(element => element.elementId === payload.elementId)] = element
	slide.elements = elements
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides,
		}
	}
}
function resizeElement(state: State, payload:{newWidth: number, newHeight: number}): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const element = {...elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])]}
	element.width = payload.newWidth
	element.height = payload.newHeight
	elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])] = element
	slide.elements = elements
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides,
		}
	}
}

function addElementToSelected(state: State, payload: {elementId: number}): State {
	const selectedSlideElements = [...state.selectedSlideElements]
	selectedSlideElements.push(payload.elementId)
	return {
		...state,
		selectedSlideElements,
	}
}

function selectElement(state: State, payload: {elementId: number}): State {
	const selectedSlideElements = [payload.elementId]
	return {
		...state,
		selectedSlideElements,
	}
}

function deleteElementSelection(state: State): State {
	return {
		...state,
		selectedSlideElements: [],
	}
}

function generateElementId(): number {
	return (Math.random() * 10)
}

export {
	slideElement,
	selectElement,
	addElementToSelected,
	resizeElement,
	deleteElementSelection,
	moveElement,
	generateElementId,
}