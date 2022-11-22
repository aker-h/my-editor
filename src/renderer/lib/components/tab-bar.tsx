import React, { useState, useRef, useEffect, RefObject, MutableRefObject , MouseEvent, DragEvent, KeyboardEvent, FocusEvent} from 'react';
import useDoubleClick from 'use-double-click';

const DEFAULT_DRAGGING_KEY: string = 'NON_TAGET';

let draggingTabKey: string = DEFAULT_DRAGGING_KEY;

const TabBar = (p: {tabs: MyTab[]}): JSX.Element => {
    const tabs = p.tabs;

    const tloh = new class TabLabelsOuterHandler {
        public ref = useRef() as MutableRefObject<HTMLDivElement>;

        constructor () {}

        public onRender () {
            window.sApi.updateWidthTabLabelsOuter(this._getInnerWidth());
        }

        private _getInnerWidth (): number {
            let width: number = 0;

            const tabLabels: HTMLDivElement[] = Array.from(this.ref.current!.children) as HTMLDivElement[];

            tabLabels.map((tabLabel) => {
                width += tabLabel.offsetWidth;
            });

            return width;
        }
    }();

    const ctbh = new class CreateTabButtonHandler {
        public ref = useRef() as MutableRefObject<HTMLElement>;
        private readonly _NON_FILLED: string = 'bi bi-file-earmark-plus';
        private readonly _FILLED: string = 'bi bi-file-earmark-plus-fill';

        constructor () {}

        public onClick (ev: MouseEvent<HTMLDivElement>): void {
            this._createNewTab();
        }

        public onMouseOver (ev: MouseEvent<HTMLDivElement>): void {
            this._toggleFilled(true);
        }

        public onMouseLeave (ev: MouseEvent<HTMLDivElement>): void {
            this._toggleFilled(false);
        }

        private _createNewTab (): void {
            window.tc.createNewTab('undefined');
        }

        private _toggleFilled (filled: boolean): void {
            const target: HTMLElement = this.ref.current!;

            if (filled) {
                target.className = this._FILLED;
            } else if (!filled) {
                target.className = this._NON_FILLED;
            }
        }
    }();

    useEffect(() => {
        tloh.onRender();
    });

    return <div className='tab-bar'>
            <div className='tab-bar-blank left'></div>
            <div className='tab-labels-outer' ref={tloh.ref}><>{
                tabs.map((tab) => {
                    return <TabLabel key={tab.key} tab={tab}/>
                })
            }</></div>
            <div className='tab-bar-blank right'>
                <div className='create-tab-button-outer' onClick={ctbh.onClick.bind(ctbh)} onMouseLeave={ctbh.onMouseLeave.bind(ctbh)} onMouseOver={ctbh.onMouseOver.bind(ctbh)}>
                    <div className='create-tab-button-inner'>
                        <i className='bi bi-file-earmark-plus' ref={ctbh.ref}/>
                    </div>
                </div>
            </div>
    </div>
}

export default TabBar;

const TabLabel = (p: {tab: MyTab}): JSX.Element  => {
    const tab: MyTab = p.tab;
    const [isEdit, setEdit] = useState(false);
    const refTl = useRef () as MutableRefObject<HTMLDivElement>;

    const toEdit = (): void => {
        setEdit(true);
    };

    const leaveEdit = (): void=> {
        setEdit(false);
    }

    const tabCloseBtnOnClick = (ev: MouseEvent): void => {
        window.tc.closeTab(tab);
    }

    const dmHandler = new class DragMovingHandler {
        constructor () {}

        public onDragEnd (ev: DragEvent<HTMLDivElement>): void {
            draggingTabKey = DEFAULT_DRAGGING_KEY;  
        }

        public onDragStart (ev: DragEvent<HTMLDivElement>): void {
            draggingTabKey = tab.key;
        }
    }();

    const dtHandler = new class DragTargetHandler {
        private _dropZone: DropZone = 'none';

        constructor () {}

        public onDragLeave (ev: DragEvent<HTMLDivElement>): void {
            this._leave();
        }

        public onDragOver (ev: DragEvent<HTMLDivElement>): void {
            const regFileIcon: RegExp = /file-icon/;
            const regCloseIcon: RegExp = /tab-close/;
            const regCenter: RegExp = /(tab-label||filename)/;

            const target: HTMLDivElement = ev.nativeEvent.target as HTMLDivElement;

            switch(true) {
                case regFileIcon.test(target.className): {
                    refTl.current!.className = 'tab-label drag-over left';
                    this._dropZone = 'before';
                    break;
                }
                case regCloseIcon.test(target.className): {
                    refTl.current!.className = 'tab-label drag-over right';
                    this._dropZone = 'after';
                    break;
                }
                case regCenter.test(target.className): {
                    const tabWidth = refTl.current!.clientWidth;
                    const half: number = tabWidth / 2;
                    const pos: number = ev.nativeEvent.offsetX;

                    if (pos <= half) {
                        refTl.current!.className = 'tab-label drag-over left';
                        this._dropZone = 'before';
                    } else if (half < pos) {
                        refTl.current!.className = 'tab-label drag-over right';
                        this._dropZone = 'after';
                    }

                    break;
                }
            }        

            ev.preventDefault();
        }

        public onDrop (ev: DragEvent<HTMLDivElement>): void {
            if (draggingTabKey === DEFAULT_DRAGGING_KEY) {
                return;
            }

            let targetTabKey: string = p.tab.key;

            if (this._dropZone === 'before') {
                window.tc.sortTab(draggingTabKey, targetTabKey, 'before');
            } else if (this._dropZone === 'after') {
                window.tc.sortTab(draggingTabKey, targetTabKey, 'after');
            }

            this._leave();
            draggingTabKey = DEFAULT_DRAGGING_KEY;                 
        }

        private _leave () {            
            refTl.current!.className = 'tab-label';
        }
    }


    return <div className='tab-label' data-key={tab.key} ref={refTl}
        onDragEnd={dmHandler.onDragEnd} onDragStart={dmHandler.onDragStart}
        onDragLeave={dtHandler.onDragLeave.bind(dtHandler)} onDragOver={dtHandler.onDragOver.bind(dtHandler)} onDrop={dtHandler.onDrop.bind(dtHandler)}>
        <div className='file-icon-outer'>
            <i className={`${getIconsClassNameByType(tab.type)} file-icon`}/>
        </div>
        {!isEdit? <FileNameLabel filename={tab.fileName} toEdit={toEdit}/>: <FileNameEditor _key={tab.key} filename={tab.fileName} leaveEdit={leaveEdit}/>}
        <div className='tab-close-btn-outer' onClick={tabCloseBtnOnClick}>
            <div className='tab-close-btn-inner'>
                <i className="bi bi-x tab-close-icon"/>
            </div>            
        </div>
    </div>
}

function getIconsClassNameByType (tabType: MyTabType): string {
    switch (tabType) {
        case 'txt': {
            return 'bi bi-filetype-txt';
        }
        case 'undefined':
        default: {
            return 'bi bi-file-earmark';
        }
    }
}

const FileNameLabel = (p: {filename: string, toEdit(): void}): JSX.Element => {
    const ref = useRef() as RefObject<HTMLDivElement>;

    const onDoubleClick = (ev: MouseEvent) => {
        p.toEdit();
    };

    useDoubleClick({
        ref: ref,
        onDoubleClick: onDoubleClick
    })

    return <div className='filename-label' ref={ref}>{p.filename}</div>
}

const FileNameEditor = (p: {_key: string, filename: string, leaveEdit(): void}): JSX.Element => {
    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    class FilenameEditorHandler {
        constructor () {}
    
        public onBlur (ev?: FocusEvent): void {
            p.leaveEdit();
            // refFeh.current!.value = refFlh.current!.textContent!
            console.log('unkoooooooooo');
        }
    
        public onKeypress (ev: KeyboardEvent<HTMLInputElement>): void {
            switch (ev.key) {
                case 'Enter': {
                    this._onEnter(ev);
                    return;
                } case 'Escape': {
                    this.onBlur();
                    return;
                }
            }
        }
    
        // public getValue (): String {
        //     return `${refFeh.current!.value!}`
        // }
        // public setValue (filename: string): void {
        //     refFeh.current!.value = filename;
        // }
    
        private _evaluateFileName (filename: string): boolean {
            const REG: RegExp = /[\\/:*?<>|]+/;
    
            return !REG.test(filename);
        }
    
        private _onEnter (ev: KeyboardEvent<HTMLInputElement>): void {
            ev.preventDefault();
    
            const filename: string = ref.current!.value;
    
            const accepted: boolean = this._evaluateFileName(filename);
    
            if (accepted) {
                window.tc.updateFileName(p._key, filename);
                p.leaveEdit();
                return;
            }
    
            alert('使用できない文字が含まれています。')
        }
    };

    const h: FilenameEditorHandler = new FilenameEditorHandler();

    return <input className='filename-editor' type="text" defaultValue={p.filename}
    ref={ref} onBlur={h.onBlur.bind(h)} onKeyPress={h.onKeypress.bind(h)}></input>
}

type DropZone = 'none' | 'before' | 'after';