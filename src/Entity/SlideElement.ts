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

function moveElement(state: State, elementId: number, newX: number, newY: number): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides.find(slide => slide.slideId === state.currentSlide)}
	const elements = [...slide.elements]
	const element = {...elements.find(element => element.elementId === elementId)}
	element.xPos = newX
	element.yPos = newY
	elements[elements.findIndex(element => element.elementId === elementId)] = element
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
function resizeElement(state: State, newWidth: number, newHeight: number): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides.find(slide => slide.slideId === state.currentSlide)}
	const elements = [...slide.elements]
	const element = {...elements.find(element => element.elementId === state.selectedSlideElements[0])}
	element.width = newWidth
	element.height = newHeight
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

function addElementToSelected(state: State, elementId: number): State {
	const selectedSlideElements = [...state.selectedSlideElements]
	selectedSlideElements.push(elementId)
	return {
		...state,
		selectedSlideElements,
	}
}

function selectElement(state: State, elementId: number): State {
	const selectedSlideElements = [elementId]
	return {
		...state,
		selectedSlideElements,
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
	moveElement,
	generateElementId,
}