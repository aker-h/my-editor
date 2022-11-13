import { type } from 'jquery';
import React, { useRef, MutableRefObject, RefObject, MouseEvent, FocusEvent, KeyboardEvent, DragEvent } from 'react';
import { useDrag } from 'react-dnd';
import useDoubleClick from 'use-double-click';

let applyeFileName = (filename: string): void => {};

const TabLabel = (props: TabLabelProps): JSX.Element => {
    const [collected, refTl, dragPreview] = useDrag({
        type: 'hoge',
        item: {}
    });
    const refFch = useRef() as MutableRefObject<HTMLDivElement>;
    const refFeh = useRef() as RefObject<HTMLInputElement>;
    const refFlh = useRef() as MutableRefObject<HTMLDivElement>;
    // const refCbh = useRef() as MutableRefObject<HTMLDivElement>;

    class TabLabelHandler {
        constructor () {}

        public onDragStart (ev: DragEvent<HTMLDivElement>): void {
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
                applyeFileName(filename);
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
            props.closeTab  ();
        }
    };

    let iconsClassName: string = 'bi bi-file-earmark';

    switch (props.type) {
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

    applyeFileName = (filename: string): void => {
        props.updateFileName(filename);
    };
    
    const tlh = new TabLabelHandler();
    const fch = new FileControlerHandler();
    const feh = new FilenameEditorHandler();
    const flh = new FileNameLabelHandler();
    const cbh = new CloseButtonhandler();

    useDoubleClick({
        ref: refFlh,
        onDoubleClick: flh.onDoubleClick
    });    

    return <div className='tab-label' ref={refTl} onDragStart={tlh.onDragStart.bind(tlh)}>
        <div className='file-icon-outer'>
            <i className={`${iconsClassName} file-icon`}/>
        </div>        
        <div className='filename-controler' ref={refFch}>
            <input className='filename-unit filename-editor'
                ref={refFeh}
                onBlur={feh.onBlur.bind(feh)}
                onKeyPress={feh.onKeypress.bind(feh)}
                defaultValue={props.fileName}
            />
            <div className='filename-unit filename-label'>
                <div className='filename-label-inner'
                    ref={refFlh}
                >{props.fileName}</div>
            </div>
        </div>
        <div className='tab-close-btn-outer'>
            <div className='tab-close-btn-inner' onClick={cbh.onClick.bind(cbh)}>
                <i className="bi bi-x"/>
            </div>            
        </div>
    </div>
}

interface TabLabelProps {
    fileName: string,
    type: MyTabType,
    closeTab (): void
    updateFileName (filename: string): void
}

export default TabLabel;

interface DebugInterface {
    checkTabs (): void
}

export {
    DebugInterface
}