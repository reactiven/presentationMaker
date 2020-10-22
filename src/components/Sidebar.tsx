import React from 'react'
import { renderApp } from '..';
import { goToSlide } from '../Entity/Presentation';
import { SlideType, State } from '../Entity/types'
import './Sidebar.css';

type PropsType = {
    state: State
}

function SideBar(props: PropsType): JSX.Element {

    function changeSlide(slideId: number) {
        console.log(slideId)
        const newState = goToSlide(props.state, slideId)
        renderApp(newState)
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
}

function SideBarItem(props: SidebarItemType): JSX.Element {
    return (
        <div
            className="sidebar-item"
        >
        <div 
            onClick={() => {
                props.changeSlide(props.slide.slideId)
            }}
        >
            Слайд {props.index}
        </div>
        </div>
    )
}

export {
    SideBar,
}