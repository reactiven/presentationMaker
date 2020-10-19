import React from 'react'
import { renderApp } from '..';
import { selectSlide } from '../Entity/Presentation';
import { SlideType, State } from '../Entity/types'
import './Sidebar.css';

type PropsType = {
    state: State
}

function SideBar(props: PropsType): JSX.Element {

    function changeSlide(slideId: number) {
        console.log(slideId)
        const newState = selectSlide(props.state, slideId)
        debugger
        renderApp(newState)
    }

    const sildes = [...props.state.presentationInfo.slides]
    const listItems = sildes.map((slide, index) =>
        <SideBarItem 
            key={slide.slideId}
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
    slide: SlideType,
    index: number,
    changeSlide: (slideId: number) => void, 
}

function SideBarItem(props: SidebarItemType): JSX.Element {
    return (
        <li 
            onClick={() => {
                props.changeSlide(props.slide.slideId)
            }}
            className="sidebar-item"
        >
            Слайд {props.index}
        </li>
    )
}

export {
    SideBar,
}