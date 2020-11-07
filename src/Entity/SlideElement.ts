import {ShapeColorType, State} from './types'
import {isShape} from "./Shape";
import {isTextBox} from "./TextBox";
import {isImage} from "./Image";

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
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elementsOrder = [...slide.elementsOrder].filter((elementId) => elementId !== payload.elementId)
	elementsOrder.push(payload.elementId)
	const selectedSlideElements = [payload.elementId]

	slide.elementsOrder = elementsOrder
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		selectedSlideElements,
		presentationInfo: {
			...state.presentationInfo,
			slides,
		}
	}
}

function setBackgroundColor(state: State, payload: {newColor: string}): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const element = {...elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])]}

	const dataElement = {...element.dataElement}
	element.background = payload.newColor
	element.dataElement = dataElement
	let elementNumber: number = elements.findIndex(element => element.elementId === state.selectedSlideElements[0])
	if (elementNumber < elements.length)
	{
		elements[elementNumber] = element
	}
	slide.elements = elements
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}

function setStrokeColor(state: State, payload: {newColor: string}): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const element = {...elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])]}

	const dataElement = {...element.dataElement}
	element.borderColor = payload.newColor
	element.dataElement = dataElement
	let elementNumber: number = elements.findIndex(element => element.elementId === state.selectedSlideElements[0])
	if (elementNumber < elements.length)
	{
		elements[elementNumber] = element
	}
	slide.elements = elements
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}

function setStrokeWidth(state: State, payload: {newWidth: string}): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const element = {...elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])]}

	const dataElement = {...element.dataElement}
	element.borderWidth = payload.newWidth
	element.dataElement = dataElement
	let elementNumber: number = elements.findIndex(element => element.elementId === state.selectedSlideElements[0])
	if (elementNumber < elements.length)
	{
		elements[elementNumber] = element
	}
	slide.elements = elements
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	debugger
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
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
	selectElement,
	addElementToSelected,
	resizeElement,
	deleteElementSelection,
	moveElement,
	generateElementId,
	setBackgroundColor,
	setStrokeColor,
	setStrokeWidth,
}