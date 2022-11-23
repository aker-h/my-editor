import React, { RefObject } from 'react';
import { useState, useEffect, useRef } from 'react';
import { UIEvent } from 'react';

import LineNumbers, { LineNumbersHandler } from 'COMPONENTS/pane/line-numbers';

export default function PaneText (p: {tab: MyTab}): JSX.Element {
    const tab: MyTab = p.tab;

    const [widthLineNumbers, setWidthLineNumbers] = useState(64);

    const eoh: EditorOuterHandler = new EditorOuterHandler();
    const vah: ViewAreaHandler = new ViewAreaHandler(useRef() as RefObject<HTMLDivElement>);
    const eah: EditAreaHandler = new EditAreaHandler(useRef() as RefObject<HTMLTextAreaElement>);
    const lnh: LineNumbersHandler = new LineNumbersHandler();

    eoh.onScroll = (ev: UIEvent): void => {
        const scrollTop: number = eoh.ref.current!.scrollTop;

        lnh.scrollTo(scrollTop);
    };

    //改行したときにカクつくところこここここ
    eah.onChange = (): void => {
        tab.data = eah.text;
        vah.text = eah.text;
        window.sApi.updateHeightTextPaneDivProp({key: tab.key, height: vah.height});
        lnh.updateLength(vah.length);
    }

    useEffect(() => {
        try {
            vah.text = tab.data;
            eah.text = tab.data;

            window.sApi.updateHeightTextPaneDivProp({key: tab.key, height: vah.height});
        } catch (e) {}
    });

    return <div className='pane text' data-key={tab.key} onWheel={ev => {}}>
        <div className={`pane-text--inner ${tab.key}`}>
            <LineNumbers _key={tab.key} length={getRowCount(tab.data)} active={0} lnh={lnh}/>
            <div className='editor-outer'  ref={eoh.ref} onScrollCapture={eoh.onScroll.bind(eoh)}>
                <div className='editor-inner'>
                    <div className='edit-unit view-area' ref={vah.ref} ></div>
                    <textarea className='edit-unit edit-area' spellCheck={false} ref={eah.ref}
                    onChange={eah.onChange.bind(eah)}></textarea>
                </div>
            </div>
            <style>{`.pane-text--inner.${tab.key} {
                --size: 20px;
                --width-line-numbers: ${widthLineNumbers}px;
            }`}</style>
        </div>
    </div>
}

function getRowCount (text: string): number { return text.split('\n').length; }

function fixForPaneText (text: string): string {
    text = (text.length === 0)? '\u00A0': text;
    return text.replace(/ /g, '\u00A0').replace(/\n$/, '\n\u00A0');
}

class EditorOuterHandler {
    public ref = useRef() as RefObject<HTMLDivElement>;
    
    public onScroll (ev: UIEvent): void { /*ココンポーネント内で実装 */}
}

class ViewAreaHandler {
    public ref: RefObject<HTMLDivElement>;

    constructor (ref: RefObject<HTMLDivElement>) {
        this.ref = ref;
    }

    set text (text: string) { this.ref.current!.innerText = fixForPaneText(text); }

    get height (): number { return this.ref.current!.offsetHeight; }
    get length (): number { return getRowCount(this.ref.current!.innerText); }
}

class EditAreaHandler {
    public ref: RefObject<HTMLTextAreaElement>;

    constructor (ref: RefObject<HTMLTextAreaElement>) {
        this.ref = ref;
    }

    set text (text: string) {this.ref.current!.value = text; }
    get text () { return this.ref.current!.value; }

public onChange (): void { /*coding on component*/ }
}