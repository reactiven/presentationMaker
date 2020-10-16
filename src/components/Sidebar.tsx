import React from 'react'
import { selectSlide } from '../Entity/Presentation';
import { Slide, State } from '../Entity/types'
import './Sidebar.css';

type PropsType = {
    state: State
}

function SideBar(props: PropsType): JSX.Element {

    function changeSlide(slideId: number) {
        selectSlide(props.state, slideId)
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
    slide: Slide,
    index: number,
    changeSlide: (slideId: number) => void, 
}

function SideBarItem(props: SidebarItemType): JSX.Element {
    return (
        <li 
            onClick={() => {
                console.log('test')
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