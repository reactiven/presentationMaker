import { ShapeType, ShapeColorType, State } from './types'


function isShape(dataElement: any): dataElement is ShapeType {
	return dataElement.shapeType !== undefined
}

export {
	isShape,
}