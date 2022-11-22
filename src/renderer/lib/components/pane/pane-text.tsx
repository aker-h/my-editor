import React, { RefObject } from 'react';
import { useState, useEffect, useRef } from 'react';

import LineNumbers from 'COMPONENTS/pane/line-numbers';

export default function PaneText (p: {tab: MyTab}): JSX.Element {
    const tab: MyTab = p.tab;

    const [heightViewArea, setHeightViewArea] = useState(0);
    const [widthLineNumbers, setWidthLineNumbers] = useState(64);
    const [lengthLineNumbers, setLengthLineNumbers] = useState(0);

    const vah: ViewAreaHandler = new ViewAreaHandler(useRef() as RefObject<HTMLDivElement>);
    const eah: EditAreaHandler = new EditAreaHandler(useRef() as RefObject<HTMLTextAreaElement>);


    //改行したときにカクつくところこここここ
    eah.onChange = (): void => {
        // tab.data = eah.text;
        // window.tc.updateTab(tab);

        vah.text = eah.text;
        setHeightViewArea(vah.height);
        setLengthLineNumbers(vah.length);
    }

    useEffect(() => {
        try {
            vah.text = tab.data;
            eah.text = tab.data;

            setHeightViewArea(vah.height);
            setLengthLineNumbers(vah.length);
        } catch (e) {}
    });

    return <div className='pane text' data-key={tab.key}>
        <div className={`pane-text--inner ${tab.key}`}>
            <LineNumbers _key={tab.key} length={lengthLineNumbers} active={0}/>
            <div className='editor-outer'>
                <div className='editor-inner'>
                    <div className='edit-unit view-area' ref={vah.ref}></div>
                    <textarea className='edit-unit edit-area' ref={eah.ref}
                    onChange={eah.onChange.bind(eah)}></textarea>
                </div>
            </div>
            <style>{`.pane-text--inner.${tab.key} {
                --size: 20px;
                --height: ${heightViewArea}px;
                --width-line-numbers: ${widthLineNumbers}px;
            }`}</style>
        </div>
    </div>
}

function fixForPaneText (text: string): string {
    text = (text.length === 0)? '\u00A0': text;
    return text.replace(/ /g, '\u00A0').replace(/\n$/, '\n\u00A0');
}

class ViewAreaHandler {
    public ref: RefObject<HTMLDivElement>;

    constructor (ref: RefObject<HTMLDivElement>) {
        this.ref = ref;
    }

    set text (text: string) { this.ref.current!.innerText = fixForPaneText(text); }

    get height (): number { return this.ref.current!.offsetHeight; }
    get length (): number { return this.ref.current!.innerText.split('\n').length; }
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