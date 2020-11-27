import {SlidesMapType} from "../../Entity/types";
import './PreviewMode.css';
import {useEffect} from "react";
import React from "react";
import {dispatch} from "../../state/state-manager";
import {closePreview, nextSlide, prevSlide} from "../../Entity/State";

type PropsType = {
    slides: SlidesMapType,
    slidesOrder: Array<number>,
    currentSlide: number,
}

function PreviewMode(props: PropsType) {
    debugger
    const currentSlideId = props.slidesOrder[props.currentSlide]
    const currentSlideInfo = props.slides[currentSlideId]

    const slideBack = {
        background: `url("${currentSlideInfo.previewImage}") no-repeat center/100% 100%`
    }

    function keydownHandler(event: KeyboardEvent) {
        if (event.keyCode === 39) {
            dispatch(nextSlide)
        }
        if (event.keyCode === 37) {
            dispatch(prevSlide)
        }
        if (event.keyCode === 27) {
            dispatch(closePreview)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler)
        return () => document.removeEventListener('keydown', keydownHandler)
    })

    return(
        <div className={'preview-container'} onClick={() => dispatch(nextSlide)}>
            <div className={'preview-slide-container'} style={slideBack}>
            </div>
        </div>
    )
}

export {
    PreviewMode,
}