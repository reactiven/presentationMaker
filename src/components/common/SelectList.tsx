import tick from "../../images/tick.png";
import React, {useRef} from "react";
import styles from './SelectList.module.css';
import {useEventHandler} from "../../common/useEventHandler";

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
    const ref = useRef<HTMLDivElement|null>(null)

    useEventHandler('click', ref, () => onClick(item.id))

    return(
        <div
            className={styles.listItem}
            ref={ref}
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
