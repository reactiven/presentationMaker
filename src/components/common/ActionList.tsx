import React from "react";
import "./ActionList.css";

type ItemType = {
    id: string,
    text: string,
    img?: any,
}

type ActionListProps = {
    items: Array<ItemType>,
    onChange: (id: string) => void,
}

function ActionList(props: ActionListProps) {

    function onChange(id: string) {
        props.onChange(id)
    }

    const listItems = props.items.map((item) =>
        <ActionListItem
            key={item.id}
            onClick={onChange}
            item={item}
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
}

function ActionListItem(props: SelectListItemProps) {

    function onClick() {
        props.onClick(props.item.id)
    }

    return(
        <div className={'list-item'} onClick={onClick}>
            <div className={'item-block-image'}>
                {props.item.img && <img src={props.item.img} alt='button-logo' className={'item-image'}/>}
            </div>
            {props.item.text}
        </div>
    )
}

export {
    ActionList,
}
