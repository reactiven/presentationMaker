import { ImageType } from './types'

const image: ImageType = {
	src: '/images/image.jpg',
}

function isImage(dataElement: any): dataElement is ImageType {
	return dataElement.src !== undefined
}

export {
	image,
	isImage,
}