import {TextBoxType } from './types'

function isTextBox(dataElement: any): dataElement is TextBoxType {
	return dataElement.font !== undefined
}

export {
	isTextBox,
}