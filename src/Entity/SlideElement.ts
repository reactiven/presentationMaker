import { textBox } from './TextBox'
import { SlideElement, State } from './types'

const slideElement = {
	type: 'texBox',
	dataElement: textBox,
	width: 1000,
	height: 1000,
	xPos: 200,
	yPos: 300,
	elementId: 1,
}

function moveElement(state: State, elementId: number, newX: number, newY: number): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[state.currentSlide]}
	const elements = [...slide.elements]
	const element = {...elements[state.selectedSlideElements[elementId]]}
	element.xPos = newX
	element.yPos = newY
	elements[state.selectedSlideElements[elementId]] = element
	slide.elements = elements
	slides[state.currentSlide] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides,
		}
	}
}
function resizeElement(state: State, elementId: number, newWidth: number, newHeight: number): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[state.currentSlide]}
	const elements = [...slide.elements]
	const element = {...elements[state.selectedSlideElements[elementId]]}
	element.width = newWidth
	element.height = newHeight
	elements[state.selectedSlideElements[elementId]] = element
	slide.elements = elements
	slides[state.currentSlide] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides,
		}
	}
}

function addElement(state: State, element: SlideElement): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[state.currentSlide]}
	const elements = [
		...slide.elements,
		element
	]
	slide.elements = elements
	slides[state.currentSlide] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}

function deleteElements(state: State): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[state.currentSlide]}
	const elements = [...slide.elements].filter((element) => (state.selectedSlideElements.indexOf(element.elementId)))
    
	slide.elements = elements
	slides[state.currentSlide] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}

function selectElement(state: State, elementId: number): State {
	return {
		...state,
		selectedSlideElements: [
			...state.selectedSlideElements,
			elementId,
		]
	}
}

function deleteSelect(state: State): State {
	return {
		...state,
		selectedSlideElements: []
	}
}

export {
	slideElement,
	deleteSelect,
	selectElement,
	deleteElements,
	addElement,
	resizeElement,
	moveElement,
}