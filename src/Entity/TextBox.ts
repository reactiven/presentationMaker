import { FontType, State, TextBoxType } from './types'

function changeFont(state: State, payload: {
	newFont: FontType
}): State {

	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const element = {...elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])]}
	const dataElement = {...element.dataElement}
	if (isTextBox(dataElement)){
		dataElement.font = {...payload.newFont}
	}
	element.dataElement = dataElement
	elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])] = element
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
function updateTextBox(state: State, payload: {text: string}): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const element = {...elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])]}
	const dataElement = {...element.dataElement}
	if (isTextBox(dataElement)){
		dataElement.text = payload.text
	}
	element.dataElement = dataElement
	elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])] = element
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

function isTextBox(dataElement: any): dataElement is TextBoxType {
	return dataElement.font !== undefined
}

export {
	changeFont,
	updateTextBox,
	isTextBox,
}