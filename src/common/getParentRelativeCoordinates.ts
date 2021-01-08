const getParentRelativeCoordinates = (screenLeft: number, screenTop: number, parent: HTMLElement|null): any => {
    if (parent)
    {
        let targetCoords = parent.getBoundingClientRect()
        let xCoord = screenLeft - targetCoords.left
        let yCoord = screenTop - targetCoords.top
        return [xCoord, yCoord]
    }
    return [0, 0]
}

export {
    getParentRelativeCoordinates,
}