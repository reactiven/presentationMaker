import tick from "../../images/tick.png";
import React from "react";
import './SelectList.css';

type ItemType = {
    id: string,
    text: string,
}

type SelectListProps = {
    items: Array<ItemType>,
    selected: string|null,
    onChange: (id: string) => void,
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
            isSelected={props.selected === item.id}
        />
    );

    return(
        <div className={'list-container'}>
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
        <div className={'list-item'} onClick={onClick}>
            <div className={'item-block-image'}>
                {props.isSelected && <img src={tick} alt='button-logo' className={'item-image'}/>}
            </div>
            {props.item.text}
        </div>
    )
}

export {
    SelectList,
}
