import { slide } from "./Slide";
import { Slide, Presentation, State } from "./types";

const presentation: Presentation = {
    name: "Презентация 1",
    slides: [
        slide,
    ],
}

function changeName(state: State, newName: string): State {
    return {
        ...state,
        presentationInfo: {
            ...state.presentationInfo,
            name: newName
        }
    };
}
function addSlide(state: State): State{
    const defaultSlide = {
        slideId: state.presentationInfo.slides.length,
        elements: [],
        background: '#fff',
    }
    return {
        ...state,
        presentationInfo: {
            ...state.presentationInfo,
            slides: [
                ...state.presentationInfo.slides,
                defaultSlide,
            ],
        }
    };
}
function deleteSlides(state: State): State{
    return {
        ...state,
        presentationInfo: {
            ...state.presentationInfo,
            slides: state.presentationInfo.slides.filter((slide, index) => (state.selectedSlides.indexOf(index))).map((slide, index) => {
                slide.slideId = index
                return slide
            })
        }
    };
}
function goToSlide(state: State, slideId: number): State{
    return {
        ...state,
        currentSlide: slideId,
    };
}
function getCurrentSlideInfo(state: State): Slide {
    return state.presentationInfo.slides[state.currentSlide]
}
function moveSlides(state: State, newPosition: number): State{
    const newState = { ...state };
    const selectedSlides = [...state.selectedSlides]
    const slides = [...state.presentationInfo.slides]
    const movedSlides = slides.filter((slide, index) => (selectedSlides.indexOf(index)))
    const staticSlides = slides.filter((slide, index) => (!selectedSlides.indexOf(index)))
    let insertPosition: number
    staticSlides.forEach((slide, index) => {
        if (slide.slideId == newPosition) {
            insertPosition = index
        }
    })
    const firtsPart = staticSlides.slice(0, insertPosition)
    const secondPart = staticSlides.slice(insertPosition)
    const concatArray = firtsPart.concat(movedSlides).concat(secondPart)
    const finalArray = concatArray.map((slide, index) => {
        slide.slideId = index
        return slide
    })
    let newSelectedSlides = []
    for (let i = newPosition; i < newPosition + selectedSlides.length; i++) {
        newSelectedSlides.push(i)
    }
    return {
        ...state,
        selectedSlides: newSelectedSlides,
        presentationInfo: {
            ...state.presentationInfo,
            slides: finalArray,
        }
    }
}
function selectSlides(state: State, slideId: number): State {
    return {
        ...state,
        selectedSlides: [
            ...state.selectedSlides,
            slideId,
        ]
    };
}
function deleteSelect(state: State): State {
    return {
        ...state,
        selectedSlides: []
    };
}

export {
    presentation,
}