import React from 'react'
import { selectSlide } from '../Entity/Presentation';
import { Slide, State } from '../Entity/types'
import './Sidebar.css';

function SideBar(state: State): JSX.Element {

    function changeSlide(slideId: number) {
        selectSlide(state, slideId)
    }

    const sildes = [...state.presentationInfo.slides]
    const listItems = sildes.map((slide, index) =>
        <SideBarItem 
            slide={slide}
            index={index} 
            changeSlide={changeSlide}
        />
    );

    return (
        <div className='side-bar'>
            <ul>{listItems}</ul>
        </div>
    )
}

type SidebarItemType = {
    slide: Slide,
    index: number,
    changeSlide: (slideId: number) => void, 
}

function SideBarItem(props: SidebarItemType): JSX.Element {
    return (
        <li key={props.slide.slideId} onClick={() => props.changeSlide(props.slide.slideId)}>
            Слайд {props.index}
        </li>
    )
}

export {
    SideBar,
}