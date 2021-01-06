import React, {useContext, useEffect, useRef} from 'react';
import styles from './TopPanel.module.css';
import logo from '../../../images/logo_tcaer.png';
import {ToolPanel} from './ToolPanel';
import {Button_WithPopover} from "../../common/Button_WithPopover";
import {ActionList} from "../../common/ActionList";
import {Button} from "../../common/Button";
import {StoreType} from "../../../state/store";
import {StoreContext} from "../../../state/storeContext";
import {presentationInfoActions} from "../../../state/presentationInfoReducer";
import {previewReducerActions} from "../../../state/previewReducer";
import {insertionReducerActions} from "../../../state/insertionModeReducer";
import {popupOpenedReducerActions} from "../../../state/popupsOpenedReducers";
import {exportPresentation} from '../../../common/exportPresentation';
import {savePresentation} from '../../../common/savePresentation';
import {dispatchDecorator} from "../../../state/dispatchDecarator";
import {useEventHandler} from "../../../common/hooks/useEventHandler";
import {useTooltip} from "../../../common/hooks/useTooltip";

function TopPanel() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {presentationInfo} = store.getState()

    const saveRef = useRef<any|null>(null)
    const nameRef = useRef<HTMLInputElement|null>(null)
    const inputFileRef = useRef<HTMLInputElement|null>(null)

    const slides = presentationInfo.presentation.slides
    const currentSlide = presentationInfo.currentSlide
        ? slides[presentationInfo.currentSlide]
        : null
    const selectedSlideElements = presentationInfo.selectedSlideElements

    function onFileNameBlur(event: any) {
        dispatchDecorator(store, () => presentationInfoActions.changeName(event.currentTarget.value))
    }

    function onFileChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            const fileread = new FileReader()
            fileread.onload = function(e: any) {
                const content = e.target.result
                const intern = JSON.parse(content)
                store.dispatch(presentationInfoActions.uploadPresentation(intern))
                store.dispatch(insertionReducerActions.resetStateToDefault())
                store.dispatch(popupOpenedReducerActions.resetStateToDefault())
                store.dispatch(previewReducerActions.resetStateToDefault())
            }
            fileread.readAsText(file)
        }
        event.currentTarget.value = ''
    }


    function getFileActionsItem() {
        return [
            {
                id: 'save',
                text: 'Сохранить презентацию',
            },
            {
                id: 'export',
                text: 'Экспортировать в PDF',
            },
            {
                id: 'upload',
                text: 'Загрузить презентацию',
            }
        ]
    }

    function handleClickAction(id: string) {
        if (id === 'save' && saveRef.current) {
            saveRef.current.click()
        }
        if (id === 'export') {
            exportPresentation(
                presentationInfo.presentation.slides,
                presentationInfo.presentation.slidesOrder,
                presentationInfo.presentation.name,
            )
        }
        if (id === 'upload' && inputFileRef.current) {
            inputFileRef.current.click()
        }
    }

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.value = presentationInfo.presentation.name
        }
    }, [presentationInfo.presentation.name])

    useEventHandler('input', inputFileRef, onFileChange)
    useEventHandler('blur', nameRef, onFileNameBlur)

    useTooltip({
        elementRef: nameRef,
        showTooltip: true,
        text: 'Переименовать',
    })

    return(
        <div className={styles.topPanel}>
            <div className={styles.headerPanel}>
                <img src={logo} className={styles.logo} alt='logo'/>
                <div className={styles.toolBar}>
                    <input
                        type="text"
                        ref={nameRef}
                        defaultValue={presentationInfo.presentation.name}
                        className={styles.presentationTitle}
                    />
                    <div className="second-row">
                        <a
                            href={savePresentation(store.getState().presentationInfo)}
                            download={`${presentationInfo.presentation.name}.json`}
                            className={styles.ref}
                            ref={saveRef}
                        ></a>
                        <Button_WithPopover
                            text={'Файл'}
                            popoverContent={
                                <ActionList
                                    items={getFileActionsItem()}
                                    onChange={handleClickAction}
                                />
                            }
                        />
                        <input
                            type='file'
                            accept=".json"
                            ref={inputFileRef}
                            className={styles.uploadFileInput}
                        />
                    </div>
                </div>
                <Button
                    label={'Preview'}
                    type={'normal'}
                    onClick={() => store.dispatch(previewReducerActions.setPreviewOpened(true))}
                    tooltipText={'Перейти в режим превью'}
                />
            </div>
            <ToolPanel
                currentSlide={currentSlide}
                selectedSlideElements={selectedSlideElements}
            />
        </div>
    )
}

export {
    TopPanel,
}