import { changeFont, updateTextBox } from './TextBox'
import { State } from './types'

const initialState: State = {
	currentSlide: 0,
	onPreview: false,
	selectedSlideElements: [0],
	selectedSlides: [],
	presentationInfo: {
		name: 'presentation1',
		slidesOrder: [0],
		slides: [
			{
				background: '#000',
				slideId: 0,
				elementsOrder: [0],
				elements: [
					{
						type: 'textBox',
						elementId: 0,
						height: 200,
						width: 200,
						xPos: 50,
						yPos: 50,
						dataElement: {
							font: {
								fontSize: '1px',
								bold: false,
								fontStyle: 'Times New Roman',
								italic: false,
							},
							text: 'text'
						}
					}
				]
			}
		]
	}
}
describe('TextBox test', () => {
	
	test('Set font for textbox', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [0],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [0],
						elements: [
							{
								type: 'textBox',
								elementId: 0,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									font: {
										fontSize: '2px',
										bold: true,
										fontStyle: 'Calibri',
										italic: true,
									},
									text: 'text'
								}
							}
						]
					}
				]
			}
		}
		expect(changeFont(initialState, {
			newFont: {
				bold: true,
				italic: true,
				fontSize: '2px',
				fontStyle: 'Calibri',
			}
		})).toEqual(newState)
	})
	test('Set font for textbox', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [0],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [0],
						elements: [
							{
								type: 'textBox',
								elementId: 0,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									font: {
										fontSize: '1px',
										bold: false,
										fontStyle: 'Times New Roman',
										italic: false,
									},
									text: 'text2'
								}
							}
						]
					}
				]
			}
		}
		expect(updateTextBox(initialState, {
			text: 'text2',
		})).toEqual(newState)
	})
})