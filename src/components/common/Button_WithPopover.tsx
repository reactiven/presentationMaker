import React, {useEffect} from "react";
import {useRef, useState} from "react";
import tick from '../../images/tick.png';
import './Button_WithPopover.css'


type ItemType = {
    id: string,
    text: string,
}

type Button_WithPopover = {
    text?: string,
    img?: any,
    items: Array<ItemType>,
    selected: string|null,
    onChange: (id: string) => any,
}

function Button_WithPopover(props: Button_WithPopover) {
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const popoverStyle = {
        left: buttonRef.current && buttonRef.current.getBoundingClientRect().left + 10,
        top: buttonRef.current && buttonRef.current.getBoundingClientRect().top + 30,
    }

    function onClick(event: any) {
        event.preventDefault()
        setOpen(!open)
    }

    function onDocumentClick(event: MouseEvent) {
        if (!event.defaultPrevented) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', onDocumentClick)
        return () => document.removeEventListener('click', onDocumentClick)
    })

    return(
        <>
            <button className='button-with-popover' ref={buttonRef} onClick={onClick}>
                {props.img && <img src={props.img} alt='button-logo' className='button-image'/>}
                {props.text}
            </button>
            {open && <SelectList
                items={props.items}
                style={popoverStyle}
                selected={props.selected}
                onChange={props.onChange}
            />}
        </>
    )
}

type SelectListProps = {
    items: Array<ItemType>,
    selected: string|null,
    onChange: (id: string) => void,
    style: any,
}

function SelectList(props: SelectListProps) {

    function onChange(id: string) {
        props.onChange(id)
    }

    const listItems = props.items.map((item) =>
        <SelectListItem
            key={item.id}
            onClick={onChange}
            item={item}
            isSelected={props.selected == item.id}
        />
    );

    return(
        <div className='list-container' style={props.style}>
            {listItems}
        </div>
    )
}

type SelectListItemProps = {
    item: ItemType,
    onClick: (id: string) => void,
    isSelected: boolean,
}

function SelectListItem(props: SelectListItemProps) {

    function onClick() {
        props.onClick(props.item.id)
    }

    return(
        <div className='list-item' onClick={onClick}>
            <div className='item-block-image'>
                {props.isSelected && <img src={tick} alt='button-logo' className='item-image'/>}
            </div>
            {props.item.text}
        </div>
    )
}

export {
    Button_WithPopover,
}