import { slide } from "./Slide";
import { Slide, Presentation, State } from "./types";

const presentation: Presentation = {
    name: "Презентация 1",
    slides: [
        slide,
    ],
}

function changeName(state: State, newName: string): State {
    return state;
}
function addSlide(state: State): State{
    return state;
}
function deleteSlides(state: State): State{
    return state;
}
function goToSlide(state: State, slideId: number): State{
    return state;
}
function getCurrentSlideInfo(state: State): Slide {
    return slide;
}
function moveSlides(state: State, newPosition: number): State{
    return state;
}
function selectSlides(state: State): State{
    return state;
}

export {
    presentation,
}