import React from 'react'
import { renderApp } from '..';
import { goToSlide } from '../Entity/Presentation';
import { SlideType, State } from '../Entity/types'
import { dispatch } from '../state/state-manager';
import './Sidebar.css';

type PropsType = {
    state: State
}

function SideBar(props: PropsType): JSX.Element {

    function changeSlide(slideId: number) {
        console.log(slideId)
        dispatch(goToSlide, {
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
            onClick={() => {
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