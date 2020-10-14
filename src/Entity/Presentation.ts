import { slide } from './Slide'
import { Slide, Presentation, State } from './types'

const presentation: Presentation = {
	name: 'Презентация 1',
	slides: [
		slide,
	],
	slidesOrder: [1],
}

function changeName(state: State, newName: string): State {
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			name: newName
		}
	}
}

function addSlide(state: State): State{
	const defaultSlide: Slide = {
		slideId: generateSlideId(),
		elements: [],
		elementsOrder: [],
		background: '#fff',
	}
	const slides = [...state.presentationInfo.slides]
	slides.push(defaultSlide)
	const slidesOrder: Array<number> = [...state.presentationInfo.slidesOrder]
	slidesOrder.push(defaultSlide.slideId)

	return {
		...state,
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
function goToSlide(state: State, slideId: number): State{
	return {
		...state,
		currentSlide: slideId,
	}
}
function getCurrentSlideInfo(state: State): Slide|undefined {
	const slides: Array<Slide> = [...state.presentationInfo.slides]
	return slides.find(slide => slide.slideId === state.currentSlide)
}
function moveSlides(state: State, newPosition: number): State{
	const selectedSlides = [...state.selectedSlides]
	const slides = [...state.presentationInfo.slides]
	const slidesOrder = [...state.presentationInfo.slidesOrder]
	const insertSlide = slides[newPosition]
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

function addSlideToSelected(state: State, slideId: number): State {
	const selectedSlides = [...state.selectedSlides]
	selectedSlides.push(slideId)
	return {
		...state,
		selectedSlides
	}
}

function selectSlide(state: State, slideId: number): State {
	const selectedSlides = [slideId]
	return {
		...state,
		selectedSlides
	}
}

function generateSlideId(): number {
	return Math.random() * 10
}

export {
	presentation,
	changeName,
	addSlideToSelected,
	selectSlide,
	moveSlides,
	goToSlide,
	getCurrentSlideInfo,
	deleteSlides,
	addSlide,
}