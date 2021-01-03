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
        <div className={styles.listContainer}>
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
        <div className={styles.listItem} onClick={onClick}>
            <div className={styles.itemBlockImage}>
                {props.item.img && <img src={props.item.img} alt='button-logo' className={styles.itemImage}/>}
            </div>
            {props.item.text}
        </div>
    )
}

export {
    ActionList,
}
