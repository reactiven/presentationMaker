import React from 'react'
import {goToSlide, selectSlide} from '../../Entity/Presentation';
import { SlideType, State } from '../../Entity/types'
import { dispatch, state } from '../../state/state-manager';
import './Sidebar.css';

type PropsType = {
    state: State
}

function SideBar(props: PropsType): JSX.Element {

    function changeSlide(slideId: number) {
        dispatch(goToSlide, {
            slideId,
        })
        dispatch(selectSlide, {
            slideId,
        })
    }

    const slides = [...props.state.presentationInfo.slides]
    const slidesOrder = [...props.state.presentationInfo.slidesOrder]
    const listItems = slidesOrder.map((slideId, index) => {
        const slide = slides.find(slide => slide.slideId === slideId)
        if (!!slide)
        {
            return <SideBarItem 
                key={slideId}
                slide={slide}
                isSelected={state.currentSlide === slideId}
                index={index} 
                changeSlide={changeSlide}
            />
        }
        return null
    })
    return (
        <div className='side-bar'>
            {listItems}
        </div>
    )
}

type SidebarItemType = {
    slide: SlideType,
    index: number,
    changeSlide: (slideId: number) => void, 
    isSelected: boolean,
}

function SideBarItem(props: SidebarItemType): JSX.Element {
    const className = props.isSelected
        ? 'sidebar-item sidebar-item_selected'
        : 'sidebar-item'
    return (
        <div
            className={className}
            onClick={(event) => {
                if (!event.defaultPrevented) {
                    event.preventDefault()
                }
                props.changeSlide(props.slide.slideId)
            }}
        >
            <div>
                Слайд {props.index}
            </div>
        </div>
    )
}

export {
    SideBar,
}