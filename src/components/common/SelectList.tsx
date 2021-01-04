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

function SelectList({
    items,
    selected,
    onChange,
}: SelectListProps) {
    const listItems = items.map((item) =>
        <SelectListItem
            key={item.id}
            onClick={onChange}
            item={item}
            isSelected={selected === item.id}
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

function SelectListItem({
    item,
    isSelected,
    onClick,
}: SelectListItemProps) {
    return(
        <div
            className={styles.listItem}
            onClick={() => onClick(item.id)}
        >
            <div className={styles.itemBlockImage}>
                {isSelected && <img src={tick} alt='button-logo' className={styles.itemImage}/>}
            </div>
            {item.text}
        </div>
    )
}

export {
    SelectList,
}
