import React from "react";

const getParentRelativePointerСoordinates = (e: React.MouseEvent | MouseEvent, parent: HTMLElement|null): any => {
    // const parent = element && element.parentElement
    if (parent)
    {
        let targetCoords = parent.getBoundingClientRect()
        let xCoord = e.clientX - targetCoords.left
        let yCoord = e.clientY - targetCoords.top
        return [xCoord, yCoord]
    }
    return [0, 0]
}

export {
    getParentRelativePointerСoordinates,
}