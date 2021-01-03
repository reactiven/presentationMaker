import React, {useContext, useEffect, useRef, useState} from 'react'
import { SlideType } from '../../Entity/types'
import styles from './Sidebar.module.css';
import {getParentRelativeCoordinates} from "../../common/getParentRelativeCoordinates";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {dispatchDecorator} from "../../state/dispatchDecarator";


function SideBar(): JSX.Element {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
    } = store.getState()
    const [moveMode, setMoveMode] = useState(false)
    const [separatorTop, setSeparatorTop] = useState(0)

    const sidebarRef = useRef<HTMLDivElement|null>(null)

    const separatorStyle = {
        top: separatorTop,
    }

    const slides = {...presentationInfo.presentation.slides}
    const selectedSlides = [...presentationInfo.selectedSlides]
    const slidesOrder = [...presentationInfo.presentation.slidesOrder]
    const listItems = slidesOrder.map((slideId, index) => {
        const slide = slides[slideId]
        if (!!slide)
        {
            return <SideBarItem 
                key={slideId}
                slide={slide}
                isSelected={presentationInfo.currentSlide === slideId || !!selectedSlides.find(slide => slide === slideId)}
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
        <div className={styles.sideBar} ref={sidebarRef}>
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
            dispatchDecorator(store, () => presentationInfoActions.moveSlides(pos -1))
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
                store.dispatch(presentationInfoActions.addSlideToSelected(props.slide.slideId))
            }
            else {
                dispatchDecorator(store, () => presentationInfoActions.selectSlide(props.slide.slideId))
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
        ? `${styles.sidebarItem} ${styles.sidebarItemSelected}`
        : `${styles.sidebarItem}`

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
        <div className={styles.sidebarSeparator} style={props.style}></div>
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