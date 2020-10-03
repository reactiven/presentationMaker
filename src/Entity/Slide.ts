import { image } from './Image'
import { shape } from './Shape'
import { textBox } from './TextBox'
import { BackgroundType, Slide, State } from './types'

const slide: Slide = {
	elements: [
		{
			type: 'image',
			dataElement: image,
			width: 1000,
			height: 1000,
			xPos: 200,
			yPos: 300,
			elementId: 1,
		},
		{
			type: 'textBox',
			dataElement: textBox,
			width: 1000,
			height: 1000,
			xPos: 200,
			yPos: 300,
			elementId: 1,
		},
		{
			type: 'shape',
			dataElement: shape,
			width: 1000,
			height: 1000,
			xPos: 200,
			yPos: 300,
			elementId: 1,
		},
	],
	slideId: 1,
	background: 'image',
}

function AddImage(state: State, filepath: string): State {
	
}
function AddTextBox(state: State): State{
	return state
}
function AddShape(state: State): State{
	return state
}
function DeleteObject(state: State): State{
	return state
}
function MoveObject(state: State): State{
	return state
}
function SetBackgroud(state: State, newBackground: BackgroundType): State{
	return state
}

export {
	slide,
}