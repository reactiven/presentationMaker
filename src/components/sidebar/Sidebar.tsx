import React, {useContext, useEffect, useRef, useState} from 'react'
import {addSlideToSelected, moveSlides, selectSlide} from '../../Entity/Presentation';
import { SlideType, State } from '../../Entity/types'
import { dispatch } from '../../state/state-manager';
import './Sidebar.css';
import {getParentRelativeCoordinates} from "../../common/getParentRelativeCoordinates";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {previewReducerActions} from "../../state/previewReducer";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {selectionReducerActions} from "../../state/selectionReducer";


function SideBar(): JSX.Element {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
        selection,
    } = store.getState()
    const [moveMode, setMoveMode] = useState(false)
    const [separatorTop, setSeparatorTop] = useState(0)

    const sidebarRef = useRef<HTMLDivElement|null>(null)

    const separatorStyle = {
        top: separatorTop,
    }

    const slides = {...presentationInfo.slides}
    const selectedSlides = [...selection.selectedSlides]
    const slidesOrder = [...presentationInfo.slidesOrder]
    const listItems = slidesOrder.map((slideId, index) => {
        const slide = slides[slideId]
        if (!!slide)
        {
            return <SideBarItem 
                key={slideId}
                slide={slide}
                isSelected={selection.currentSlide === slideId || !!selectedSlides.find(slide => slide === slideId)}
                index={index}
                slidesCount={slidesOrder.length}
                setSeparatorTop={setSeparatorTop}
                setMoveMode={setMoveMode}
                moveMode={moveMode}
            />
        }
        return null
    })
    return (
        <div className='side-bar' ref={sidebarRef}>
            {moveMode && <SidebarSeparator style={separatorStyle}/>}
            {listItems}
        </div>
    )
}

type SidebarItemType = {
    slide: SlideType,
    index: number,
    slidesCount: number,
    isSelected: boolean,
    setSeparatorTop: (top: number) => void,
    setMoveMode: (mode: boolean) => void,
    moveMode: boolean,
}

function SideBarItem(props: SidebarItemType): JSX.Element {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        selection,
    } = store.getState()
    const slideRef = useRef<HTMLDivElement|null>(null)

    let sidebar: HTMLElement | null
    let slidesCount
    let moveMode = false

    function mouseUp(event: MouseEvent) {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
        if (moveMode) {
            const cursorY = getScrollCoordinates(sidebar, event.clientX, event.clientY)
            const pos = findSepPosition(cursorY)
            store.dispatch(presentationInfoActions.moveSlides(pos -1, selection.selectedSlides))
            props.setMoveMode(false)
            props.setSeparatorTop(0)
            moveMode = false
        }
    }

    function mouseMove(event: MouseEvent) {
        props.setMoveMode(true)
        moveMode = true
        const cursorY = getScrollCoordinates(sidebar, event.clientX, event.clientY)
        const pos = findSepPosition(cursorY)
        const sepPos = pos - 1 > props.slidesCount
            ? props.slidesCount + 1
            : pos
        props.setSeparatorTop(5 + (sepPos - 1) * 110)
    }

    function mouseDown(event: MouseEvent) {
        if (slideRef.current) {
            if (event.ctrlKey) {
                store.dispatch(selectionReducerActions.addSlideToSelected(props.slide.slideId))
            }
            else {
                store.dispatch(selectionReducerActions.selectSlide(props.slide.slideId))
            }

            if (!event.defaultPrevented) {
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('mouseup', mouseUp);
            }
        }
    }

    useEffect(() => {
        const element = slideRef.current
        slidesCount = props.slidesCount
        sidebar = slideRef && slideRef.current && slideRef.current.parentElement
        element && element.addEventListener('mousedown', mouseDown)
        return () => {
            element && element.removeEventListener('mousedown', mouseDown)
        }
    }, [slideRef, props.slidesCount])

    function findSepPosition(posY: number) {
        const posNumber = Math.ceil(posY / 55)
        return posNumber % 2 !== 0
            ? Math.floor(posNumber / 2) + 1
            : posNumber / 2 + 1
    }

    const className = props.isSelected
        ? 'sidebar-item sidebar-item_selected'
        : 'sidebar-item'

    const styleBackground = {
        background: props.slide.previewImage
            ? `url(${props.slide.previewImage}) no-repeat center/100% 100%`
            : 'transparent',
    }
    return (
        <div
            className={className}
            ref={slideRef}
            style={styleBackground}
        ></div>
    )
}

type SepType = {
    style: any,
}

function SidebarSeparator(props: SepType) {

    return(
        <div className='sidebar-separator' style={props.style}></div>
    )
}

function getScrollCoordinates(sidebar: HTMLElement|null, eventX: number, eventY: number): number {
    if (sidebar) {
        const [left, top] = getParentRelativeCoordinates(eventX, eventY, sidebar)
        const scrollTop = sidebar.scrollTop
        const posY = top + scrollTop
        return posY
    }
    return 0
}

export {
    SideBar,
}