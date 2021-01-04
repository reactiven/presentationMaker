import React from "react";
import styles from "./ActionList.module.css";

type ItemType = {
    id: string,
    text: string,
    img?: any,
}

type ActionListProps = {
    items: Array<ItemType>,
    onChange: (id: string) => void,
}

function ActionList({
    items,
    onChange,
}: ActionListProps) {
    const listItems = items.map((item) =>
        <ActionListItem
            key={item.id}
            onClick={onChange}
            item={item}
        />
    );

    return(
        <div className={styles.listContainer}>
            {listItems}
        </div>
    )
}

type SelectListItemProps = {
    item: ItemType,
    onClick: (id: string) => void,
}

function ActionListItem({
    item,
    onClick,
}: SelectListItemProps) {
    return(
        <div className={styles.listItem} onClick={() => onClick(item.id)}>
            <div className={styles.itemBlockImage}>
                {item.img && <img src={item.img} alt='button-logo' className={styles.itemImage}/>}
            </div>
            {item.text}
        </div>
    )
}

export {
    ActionList,
}
