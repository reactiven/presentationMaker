import {ElementType, ShapeTypeType, SlidesMapType, SlideType, State} from './types'

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
		background: '#ffffff',
		previewImage: null,
	}
	const slides = {...state.presentationInfo.slides}
	slides[defaultSlide.slideId] = defaultSlide
	const slidesOrder: Array<number> = [...state.presentationInfo.slidesOrder]
	const insertPosition = slidesOrder.findIndex(slideId => slideId === state.currentSlide)
	slidesOrder.splice(insertPosition + 1, 0, defaultSlide.slideId)

	return {
		...state,
		currentSlide: defaultSlide.slideId,
		selectedSlideElements: [],
		selectedSlides: [defaultSlide.slideId],
		presentationInfo: {
			...state.presentationInfo,
			slidesOrder,
			slides,
		}
	}
}
function deleteSlides(state: State): State {

	let currentSlide = state.currentSlide
	let slides = {...state.presentationInfo.slides}
	let slidesOrder = [...state.presentationInfo.slidesOrder]
	let selectedSlides = [...state.selectedSlides]

	const currentSlideIndex = slidesOrder.findIndex(slideId => currentSlide === slideId)
	const newCurrentSlideIndex = currentSlideIndex < slidesOrder.length - 1
		? currentSlideIndex + 1
		: currentSlideIndex - 1
	const newCurrentSlideId = slidesOrder[newCurrentSlideIndex]

	selectedSlides.forEach((slideId => {
		delete slides[slideId]
	}))
	slidesOrder = slidesOrder.filter(slideId => (selectedSlides.indexOf(slideId) === -1))
	selectedSlides = []
	return {
		...state,
		selectedSlides,
		currentSlide: !!Object.keys(slides).length
			? newCurrentSlideId
			: null,
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
	const slides: SlidesMapType = {...state.presentationInfo.slides}
	const slide = slides[Number(state.currentSlide)]
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
	let newSelectedSlides = [...selectedSlides]
	let newCurrentSlide
	if (!!selectedSlides.find(slide => slide === payload.slideId)) {
		newSelectedSlides = selectedSlides.filter(slide => slide !== payload.slideId)
		newCurrentSlide = newSelectedSlides[newSelectedSlides.length - 1]
	}
	else {
		newSelectedSlides.push(payload.slideId)
		newCurrentSlide = payload.slideId
	}
	return {
		...state,
		currentSlide: newCurrentSlide,
		selectedSlides: newSelectedSlides,
	}
}

function selectSlide(state: State, payload: {
	slideId: number
}): State {
	const selectedSlides = [payload.slideId]
	return {
		...state,
		currentSlide: payload.slideId,
		selectedSlideElements: [],
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

function setInsertionMode(state: State, payload: {
	on: boolean,
	elementType: ElementType | null,
	shapeType: ShapeTypeType | undefined,
	filepath: string | undefined,
}): State {
	return {
		...state,
		insertionMode: {
			on: payload.on,
			elementType: payload.elementType,
			shapeType: payload.shapeType,
			filepath: payload.filepath,
		}
	}
}

function generateSlideId(): number {
	return Date.now()
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
	setInsertionMode,
}