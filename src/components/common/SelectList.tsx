import tick from "../../images/tick.png";
import React from "react";
import styles from './SelectList.module.css';

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
        <div className={styles.listСontainer}>
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
        <div className={styles.listItem} onClick={onClick}>
            <div className={styles.itemBlockImage}>
                {props.isSelected && <img src={tick} alt='button-logo' className={styles.itemImage}/>}
            </div>
            {props.item.text}
        </div>
    )
}

export {
    SelectList,
}
