import { Presentation, State } from "./types";


const state: State = {
    selectedSlides: [
        1,
    ],
    selectedSlideElements: [1, 2],
    currentSlide: 1,
    presentationInfo: Presentation,
    onPreview: false,
}

function exportPresentation(state: State): void {}
function savePresentation(state: State): void {}
function uploadPresentation(filepath: string): State{
    return state;
}
function goToPreview(state: State): State{
    return state;
}

function undo(): State {
    return state;
}
function redo(): State {
    return state;
}
