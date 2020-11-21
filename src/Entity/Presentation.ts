import { SlideType, State } from './types'

function changeName(state: State, payload: {
	newName: string,
}): State {
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			name: payload.newName
		}
	}
}

function addSlide(state: State): State{
	const defaultSlide: SlideType = {
		slideId: generateSlideId(),
		elements: [],
		elementsOrder: [],
		background: '#fff',
	}
	const slides = [...state.presentationInfo.slides]
	slides.splice(Number(state.currentSlide) + 1, 0, defaultSlide)
	const slidesOrder: Array<number> = [...state.presentationInfo.slidesOrder]
	const insertPosition = slidesOrder.findIndex(slideId => slideId === state.currentSlide)
	slidesOrder.splice(insertPosition + 1, 0, defaultSlide.slideId)

	return {
		...state,
		currentSlide: defaultSlide.slideId,
		selectedSlideElements: [],
		presentationInfo: {
			...state.presentationInfo,
			slidesOrder,
			slides,
		}
	}
}
function deleteSlides(state: State): State {

	let currentSlide = state.currentSlide
	let slides = [...state.presentationInfo.slides]
	let slidesOrder = [...state.presentationInfo.slidesOrder]
	let selectedSlides = [...state.selectedSlides]

	const currentSlideIndex = slidesOrder.findIndex(slideId => currentSlide === slideId)
	const newCurrentSlideIndex = currentSlideIndex < slidesOrder.length - 1
		? currentSlideIndex + 1
		: currentSlideIndex - 1
	const newCurrentSlideId = slidesOrder[newCurrentSlideIndex]

	slides = slides.filter((slide) => (selectedSlides.indexOf(slide.slideId) === -1))
	slidesOrder = slidesOrder.filter(slideId => (selectedSlides.indexOf(slideId) === -1))
	selectedSlides = []
	return {
		...state,
		selectedSlides,
		currentSlide: newCurrentSlideId,
		presentationInfo: {
			...state.presentationInfo,
			slides,
			slidesOrder,
		}
	}
}
function goToSlide(state: State, payload: {
	slideId: number,
}): State{
	return {
		...state,
		currentSlide: payload.slideId,
		selectedSlides: [],
		selectedSlideElements: [],
	}
}
function getCurrentSlideInfo(state: State): SlideType|undefined {
	const slides: Array<SlideType> = [...state.presentationInfo.slides]
	const slide = slides.find(slide => slide.slideId === state.currentSlide)
	return slide
}
function moveSlides(state: State, payload: {
	newPosition: number
}): State{

	const selectedSlideId = [...state.selectedSlides][0]
	const slidesOrder = [...state.presentationInfo.slidesOrder]
	const selectedSlideIndex = slidesOrder.findIndex(id => selectedSlideId === id)
	let finalArray
	if (payload.newPosition == 0) {
		let newSlidesOrder = slidesOrder.filter(slideId => slideId !== selectedSlideId)
		finalArray = [selectedSlideId].concat(newSlidesOrder)
	}
	else if (payload.newPosition == slidesOrder.length) {
		let newSlidesOrder = slidesOrder.filter(slideId => slideId !== selectedSlideId)
		finalArray = newSlidesOrder.concat([selectedSlideId])
	}
	else {
		let nextSlideId = slidesOrder[payload.newPosition]
		slidesOrder.splice(selectedSlideIndex, 1)
		const insertPosition = slidesOrder.findIndex(id => nextSlideId === id)
		const firstPart = slidesOrder.slice(0, insertPosition)
		const secondPart = slidesOrder.slice(insertPosition)
		finalArray = firstPart.concat([selectedSlideId]).concat(secondPart)
	}

	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slidesOrder: finalArray,
		}
	}
}

function addSlideToSelected(state: State, payload: {
	slideId: number
}): State {
	const selectedSlides = [...state.selectedSlides]
	selectedSlides.push(payload.slideId)
	return {
		...state,
		selectedSlides
	}
}

function selectSlide(state: State, payload: {
	slideId: number
}): State {
	const selectedSlides = [payload.slideId]
	return {
		...state,
		currentSlide: payload.slideId,
		selectedSlides
	}
}

function deleteSlideSelection(state: State): State {
	return {
		...state,
		selectedSlides: [],
	}
}

function setEditSlideBackgroundPopupOpened(state: State, payload: {opened: boolean}): State {
	return {
		...state,
		editSlideBackgroundPopupOpened: payload.opened,
	}
}

function setAddImageLinkPopopOpened(state: State, payload: {opened: boolean}): State {
	return {
		...state,
		addImageLinkPopupOpened: payload.opened,
	}
}

function generateSlideId(): number {
	return Math.random() * 10
}

export {
	changeName,
	addSlideToSelected,
	selectSlide,
	moveSlides,
	goToSlide,
	getCurrentSlideInfo,
	deleteSlides,
	addSlide,
	generateSlideId,
	deleteSlideSelection,
	setEditSlideBackgroundPopupOpened,
	setAddImageLinkPopopOpened,
}