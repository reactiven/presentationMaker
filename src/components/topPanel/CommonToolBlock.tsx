import {Button} from "../common/Button";
import plusIcon from "../../images/add_new.png";
import arrowLeft from "../../images/undo.png";
import arrowRight from "../../images/redo.png";
import styles from './CommonToolBlock.module.css';
import React, {useContext} from "react";
import {ToolSeparator} from "./ToolPanel";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {dispatchDecorator} from "../../state/dispatchDecarator";

function CommonToolBlock() {
    const store: Readonly<StoreType> = useContext(StoreContext);

    function addSlide() {
        dispatchDecorator(store, () => presentationInfoActions.addSlide())
    }

    return(
        <div className={styles.commonToolBlock}>
            <Button
                type={'border-none'}
                img={plusIcon}
                onClick={addSlide}
            />
            <Button
                type={'border-none'}
                img={arrowLeft}
                onClick={() => store.dispatch(presentationInfoActions.undo())}
            />
            <Button
                type={'border-none'}
                img={arrowRight}
                onClick={() => store.dispatch(presentationInfoActions.redo())}
            />
            <ToolSeparator/>
        </div>
    )
}

export {
    CommonToolBlock,
}