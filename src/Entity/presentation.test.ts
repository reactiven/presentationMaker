import { State } from './types'
import { addSlide, addSlideToSelected, changeName, deleteSlides, generateSlideId, getCurrentSlideInfo, goToSlide, moveSlides, selectSlide } from './Presentation'


describe('move selected slides ', () => {
	test('move 0 and 2 slide to 4 position', () => {
		const initialState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [0, 2],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0,1,2,3,4],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#003',
						slideId: 3,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#004',
						slideId: 4,
						elementsOrder: [],
						elements: []
					}
				]
			}
		}
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [0, 2],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [1,3,0,2,4],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#003',
						slideId: 3,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#004',
						slideId: 4,
						elementsOrder: [],
						elements: []
					}
				]
			}
		}

		expect(moveSlides(initialState, 4)).toEqual(newState)
	})

	test('move slide 1', () => {
		const initialState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0,1,2,3,4],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#003',
						slideId: 3,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#004',
						slideId: 4,
						elementsOrder: [],
						elements: []
					}
				]
			}
		}
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0,2,3,4,1],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#003',
						slideId: 3,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#004',
						slideId: 4,
						elementsOrder: [],
						elements: []
					}
				]
			}
		}

		expect(moveSlides(initialState, 5)).toEqual(newState)
	})

	test('move slide 1', () => {
		const initialState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [3],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0,1,2,3,4],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#003',
						slideId: 3,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#004',
						slideId: 4,
						elementsOrder: [],
						elements: []
					}
				]
			}
		}
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [3],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [3,0,1,2,4],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#003',
						slideId: 3,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#004',
						slideId: 4,
						elementsOrder: [],
						elements: []
					}
				]
			}
		}

		expect(moveSlides(initialState, 0)).toEqual(newState)
	})

	test('move 2 and 4 slide to 1 position', () => {
		const initialState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [2, 4],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0,1,2,3,4],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#003',
						slideId: 3,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#004',
						slideId: 4,
						elementsOrder: [],
						elements: []
					}
				]
			}
		}
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [2, 4],
			presentationInfo: {
				slidesOrder: [0, 2, 4, 1, 3],
				name: 'presentation1',
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#003',
						slideId: 3,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#004',
						slideId: 4,
						elementsOrder: [],
						elements: []
					}
				]
			}
		}

		expect(moveSlides(initialState, 1)).toEqual(newState)
	})
    
	test('change presentation name', () => {
		const initialState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [],
				slides: [],
			}
		}
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [],
			presentationInfo: {
				name: 'new presentation name',
				slidesOrder: [],
				slides: [],
			}
		}
		expect(changeName(initialState, 'new presentation name')).toEqual(newState)
	})
    
	test('delete slides', () => {
		const initialState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1, 2],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0, 1, 2],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}
        
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}
		expect(deleteSlides(initialState)).toEqual(newState)
	})
    
	test('go to slide', () => {
		const initialState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1, 2],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0, 1, 2],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}
		const newState: State = {
			currentSlide: 2,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1, 2],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0, 1, 2],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}
		expect(goToSlide(initialState, 2)).toEqual(newState)
	})
    
	test('get current slide info', () => {
		const initialState: State = {
			currentSlide: 1,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1, 2],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0, 1, 2],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}
        
		const slideInfo = {
			background: '#001',
			slideId: 1,
			elementsOrder: [],
			elements: []
		}
		expect(getCurrentSlideInfo(initialState)).toEqual(slideInfo)
	})
	
	test('add new slide', () => {
		const initialState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}

		const newState = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						slideId: 1,
						elements: [],
						elementsOrder: [],
						background: '#fff',
					},
				],
			}
		}

		expect(addSlide(initialState)).toEqual(newState)
	})

	test('add slide to selected', () => {
		const initialState: State = {
			currentSlide: 1,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1, 2],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0, 1, 2],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}
		const newState: State = {
			currentSlide: 1,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1, 2, 0],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0, 1, 2],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}
        
		expect(addSlideToSelected(initialState, 0)).toEqual(newState)
	})

	test('select one slide', () => {
		const initialState: State = {
			currentSlide: 1,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1, 2],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0, 1, 2],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}
		const newState: State = {
			currentSlide: 1,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [0],
			presentationInfo: {
				name: 'presentation',
				slidesOrder: [0, 1, 2],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#001',
						slideId: 1,
						elementsOrder: [],
						elements: []
					},
					{
						background: '#002',
						slideId: 2,
						elementsOrder: [],
						elements: []
					},
				],
			}
		}
		expect(selectSlide(initialState, 0)).toEqual(newState)
	})
})