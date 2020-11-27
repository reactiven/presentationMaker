const getParentRelativeCoordinates = (screenLeft: number, screenTop: number, parent: HTMLElement|null): any => {
    // const parent = element && element.parentElement
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