import { ShapeType} from './types'


function isShape(dataElement: any): dataElement is ShapeType {
	return dataElement.shapeType !== undefined
}

export {
	isShape,
}