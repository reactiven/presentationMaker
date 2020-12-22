import {PresentationType} from "../Entity/types";


function savePresentation(state: PresentationType): string {
    const file = new Blob(
        [JSON.stringify(state)],
        { type: 'application/json'}
    )

    const fileURL = URL.createObjectURL(file)

    return fileURL
}

export {
    savePresentation,
}