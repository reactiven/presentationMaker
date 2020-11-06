import React from 'react';
import { Button } from '../common/Button';
import './ToolPanel.css';
import plusIcon from '../../images/add_new.png';
import arrowLeft from '../../images/undo.png';
import arrowRight from '../../images/redo.png';
import fill from '../../images/fill.png';
import stroke from '../../images/stroke.png';
import { dispatch } from '../../state/state-manager';
import { addSlide } from '../../Entity/Presentation';
import { redo, undo } from '../../Entity/State';
import { Button_WithColorPicker } from '../common/Button_WithColorPicker';
import {State} from "../../Entity/types";
import {isShape} from "../../Entity/Shape";
import {setBackgroundColor, setStrokeColor} from "../../Entity/SlideElement";

type PropsType = {
    state: State,
}

function ToolPanel(props: PropsType) {

    const selectedElements = props.state.selectedSlideElements
    const slides = props.state.presentationInfo.slides
    const currentSlide = slides[slides.findIndex(slide => slide.slideId == props.state.currentSlide)]

    const selectedElement = selectedElements.length > 0
        ? currentSlide.elements[currentSlide.elements.findIndex(element => element.elementId == selectedElements[0])]
        : null

    const fillColorPicker = selectedElement
        ? String(selectedElement.background)
        : ''

    const strokeColorPicker = selectedElement
        ? String(selectedElement.borderColor)
        : ''

    function changeBgColor(value: string) {
        debugger
        dispatch(setBackgroundColor, {
            newColor: value,
        })
    }

    function changeStrokeColor(value: string) {
        dispatch(setStrokeColor, {
            newColor: value,
        })
    }

    return(
        <div className='toolpanel'>
            <Button 
                type={'border-none'}
                img={plusIcon}
                onClick={() => dispatch(addSlide)}
            />
            <Button 
                type={'border-none'}
                img={arrowLeft}
                onClick={() => dispatch(undo)}
            />
            <Button 
                type={'border-none'}
                img={arrowRight}
                onClick={() => dispatch(redo)}
            />
            {selectedElement !== null && <Button_WithColorPicker
                img={fill}
                onChange={changeBgColor}
                value={fillColorPicker}
            />}
            {selectedElement !== null && <Button_WithColorPicker
                img={stroke}
                onChange={changeStrokeColor}
                value={strokeColorPicker}
            />}
        </div>
    )
}

export {
    ToolPanel,
}