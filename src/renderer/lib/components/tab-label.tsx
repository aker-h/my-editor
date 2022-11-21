import { type } from 'jquery';
import React, { useRef, MutableRefObject, RefObject, MouseEvent, FocusEvent, KeyboardEvent, DragEvent } from 'react';
import useDoubleClick from 'use-double-click';

let draggingTab: number = 9999;

const TabLabel = (p: TabLabelProps): JSX.Element => {
    const refTl = useRef() as MutableRefObject<HTMLDivElement>;
    const refFch = useRef() as MutableRefObject<HTMLDivElement>;
    const refFeh = useRef() as RefObject<HTMLInputElement>;
    const refFlh = useRef() as MutableRefObject<HTMLDivElement>;
    // const refCbh = useRef() as MutableRefObject<HTMLDivElement>;

    class TabLabelHandler {
        private _dropZone: DropZone = 'none';

        constructor () {}

        public onDragEnd (ev: DragEvent<HTMLDivElement>): void {
            draggingTab = 9999;  
        }

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
                    this._dropZone = 'left';
                    break;
                }
                case regCloseIcon.test(target.className): {
                    refTl.current!.className = 'tab-label drag-over right';
                    this._dropZone = 'right';
                    break;
                }
                case regCenter.test(target.className): {
                    const tabWidth = refTl.current!.clientWidth;
                    const half: number = tabWidth / 2;
                    const pos: number = ev.nativeEvent.offsetX;

                    if (pos <= half) {
                        refTl.current!.className = 'tab-label drag-over left';
                        this._dropZone = 'left';
                    } else if (half < pos) {
                        refTl.current!.className = 'tab-label drag-over right';
                        this._dropZone = 'right';
                    }

                    break;
                }
            }        

            ev.preventDefault();
        }

        public onDragStart (ev: DragEvent<HTMLDivElement>): void {
            console.log('drag start');
            draggingTab = p.tabIndex;
        }

        public onDrop (ev: DragEvent<HTMLDivElement>): void {
            if (draggingTab === 9999) {
                return;
            }

            let to: number = p.tabIndex;

            if (this._dropZone === 'right') {
                to += 1;
            }

            // window.tc.sortTab(draggingTab, to);  

            this._leave();
            draggingTab = 9999;                 
        }

        private _leave () {            
            refTl.current!.className = 'tab-label';
        }
    }

    class FileControlerHandler {
        private readonly _EDIT: string = 'edit';
    
        constructor () {}
    
        public toEdit (): void {
            refFch.current!.classList.add(this._EDIT);
        }
    
        public leaveEdit (): void {
            refFch.current!.classList.remove(this._EDIT);
        }
    }
    
    class FileNameLabelHandler {
        constructor () {}
    
        public onDoubleClick (ev: MouseEvent): void {
            fch.toEdit();
        }
    
        public getText (): string {
            return refFlh.current!.textContent!;
        }
    };
    
    class FilenameEditorHandler {
        constructor () {}
    
        public onBlur (ev?: FocusEvent): void {
            fch.leaveEdit();
            refFeh.current!.value = refFlh.current!.textContent!
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
    
        public getValue (): String {
            return `${refFeh.current!.value!}`
        }
        public setValue (filename: string): void {
            refFeh.current!.value = filename;
        }
    
        private _evaluateFileName (filename: string): boolean {
            const REG: RegExp = /[\\/:*?<>|]+/;
    
            return !REG.test(filename);
        }
    
        private _onEnter (ev: KeyboardEvent<HTMLInputElement>): void {
            ev.preventDefault();
    
            const filename: string = refFeh.current!.value;
    
            const accepted: boolean = this._evaluateFileName(filename);
    
            if (accepted) {
                window.tc.updateFileName(p._key, filename);
                fch.leaveEdit();
                return;
            }
    
            alert('使用できない文字が含まれています。')
        }
    };

    class CloseButtonhandler {
        public onClick (ev: MouseEvent<HTMLDivElement>) {
            this._closeTab();
        }

        private _closeTab (): void {
            p.closeTab  ();
        }
    };

    let iconsClassName: string = 'bi bi-file-earmark';

    switch (p.type) {
        case 'txt': {
            iconsClassName = 'bi bi-filetype-txt';
            break;
        }
        case 'undefined': 
        default: {
            iconsClassName = 'bi bi-file-earmark';
            break;
        }
    }
    
    const tlh = new TabLabelHandler();
    const fch = new FileControlerHandler();
    const feh = new FilenameEditorHandler();
    const flh = new FileNameLabelHandler();
    const cbh = new CloseButtonhandler();

    useDoubleClick({
        ref: refFlh,
        onDoubleClick: flh.onDoubleClick
    });    

    return <div className='tab-label'
            ref={refTl}
            onDragEnd={tlh.onDragEnd.bind(tlh)}
            onDragLeave={tlh.onDragLeave.bind(tlh)}
            onDragOver={tlh.onDragOver.bind(tlh)}
            onDragStart={tlh.onDragStart.bind(tlh)}
            onDrop={tlh.onDrop.bind(tlh)}
        >
        <div className='file-icon-outer'>
            <i className={`${iconsClassName} file-icon`}/>
        </div>        
        <div className='filename-controler' ref={refFch}>
            <input className='filename-unit filename-editor'
                ref={refFeh}
                onBlur={feh.onBlur.bind(feh)}
                onKeyPress={feh.onKeypress.bind(feh)}
                defaultValue={p.fileName}
            />
            <div className='filename-unit filename-label'>
                <div className='filename-label-inner'
                    ref={refFlh}
                >{p.fileName}</div>
            </div>
        </div>
        <div className='tab-close-btn-outer'>
            <div className='tab-close-btn-inner' onClick={cbh.onClick.bind(cbh)}>
                <i className="bi bi-x tab-close-icon"/>
            </div>            
        </div>
    </div>
}

interface TabLabelProps {
    _key: string
    fileName: string;
    type: MyTabType;
    tabIndex: number;
    closeTab (): void;
    updateFileName (filename: string): void;
}

export default TabLabel;

interface DebugInterface {
    checkTabs (): void
}

type DropZone = 'left' | 'right' | 'none';

export {
    DebugInterface
}