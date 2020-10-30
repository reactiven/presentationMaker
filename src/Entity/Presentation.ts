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
	slides.splice(state.currentSlide + 1, 0, defaultSlide)
	const slidesOrder: Array<number> = [...state.presentationInfo.slidesOrder]
	const insertPosition = slidesOrder.findIndex(slideId => slideId === state.currentSlide)
	slidesOrder.splice(insertPosition + 1, 0, defaultSlide.slideId)

	return {
		...state,
		currentSlide: defaultSlide.slideId,
		presentationInfo: {
			...state.presentationInfo,
			slidesOrder,
			slides,
		}
	}
}
function deleteSlides(state: State): State{
	let currentSlide = state.currentSlide
	let slides = [...state.presentationInfo.slides]
	let slidesOrder = [...state.presentationInfo.slidesOrder]
	let selectedSlides = [...state.selectedSlides]
	let firstSelected: number = -1
	for (let i = 0; i < slidesOrder.length; i++) {
		if (selectedSlides.indexOf(slidesOrder[i]) !== -1)
		{
			firstSelected = i
			break
		}
	}
	for (let i = firstSelected; i < slidesOrder.length; i++) {
		if (selectedSlides.indexOf(slidesOrder[i]) === -1)
		{
			currentSlide = i
			break
		}
	}
	slides = slides.filter((slide) => (selectedSlides.indexOf(slide.slideId) === -1))
	slidesOrder = slidesOrder.filter(slideId => (selectedSlides.indexOf(slideId) === -1))
	selectedSlides = []
	return {
		...state,
		selectedSlides,
		currentSlide,
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
	const selectedSlides = [...state.selectedSlides]
	const slides = [...state.presentationInfo.slides]
	const slidesOrder = [...state.presentationInfo.slidesOrder]
	const insertSlide = slides[payload.newPosition]
	const movedSlidesOrder = slidesOrder.filter((slideId) => (selectedSlides.indexOf(slideId) !== -1))
	const staticSlidesOrder = slidesOrder.filter((slideId) => (selectedSlides.indexOf(slideId) === -1))
	let insertPosition: number = -1
	if (insertSlide === undefined)
	{
		insertPosition = staticSlidesOrder.length
	}
	else
	{
		staticSlidesOrder.forEach((slideId, index) => {
			if (slideId === insertSlide.slideId)
			{
				insertPosition = index
			}
		})
	}
	
	const firtsPart = staticSlidesOrder.slice(0, insertPosition)
	const secondPart = staticSlidesOrder.slice(insertPosition)
	const concatArray = firtsPart.concat(movedSlidesOrder).concat(secondPart)

	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slidesOrder: concatArray,
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
}