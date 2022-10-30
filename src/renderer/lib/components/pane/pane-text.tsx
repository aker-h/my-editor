import React, {
    useState,
    useRef,
    useEffect,
    RefObject,
    MutableRefObject,
    KeyboardEvent,
    MouseEvent,
    ChangeEvent,
    UIEvent } from 'react';

const PaneText = (p: PaneTextProps): JSX.Element => {
    const [offset, setO] = useState(0);
    const [height, setH] = useState(0);
    const [rowCount, setRowCount] = useState(1);
    const [activeRowNumber, setActiveRowNumber] = useState(0);
    const refEo = useRef() as MutableRefObject<HTMLDivElement>;
    const refEa = useRef() as RefObject<HTMLTextAreaElement>;
    const refVa = useRef() as MutableRefObject<HTMLDivElement>;

    const setHeight = (height: number): void => {
        setH(height);
    };

    class EditorOuterHandler {
        constructor () {}

        public onResize (ev: UIEvent<HTMLDivElement>): void {
            const editorOuter= refEo.current!;
            const scrollTop: number = editorOuter.scrollTop;
            setO(scrollTop);
        }
    }

    class EditAreaHandler {
        constructor () {}

        public getRowCount (): number {
            const value: string = refEa.current!.value;
            return value.split('\n').length;
        }

        public onChange (ev: ChangeEvent<HTMLTextAreaElement>): void {
            this._updateData();
        }

        public onMouseMove (ev: MouseEvent<HTMLTextAreaElement>): void {
            this._updateActiveRowNumber();
        }

        public onKeyUp (ev: KeyboardEvent<HTMLTextAreaElement>): void {
            this._updateActiveRowNumber();
        }

        public setWidth (width: number): void {
            refEa.current!.style.width = `${width}px`;
        }

        private _updateActiveRowNumber (): void {
            const editArea: HTMLTextAreaElement = refEa.current!;
            let selectEnd: number = editArea.selectionEnd;

            const text: string = editArea.value;
            const lines: string[] = text.split('\n');

            lines.map((line, rowNumber) => {
                if (selectEnd < 0) return;

                line += '　';

                selectEnd -= line.length;

                if (selectEnd < 0) {
                    setActiveRowNumber(rowNumber + 1);
                }
            });
        }

        private _updateData (): void {
            p.updateData(refEa.current!.value);
        }
    }

    class ViewAreaHandler {
        constructor () {}

        public getWidth (): number {
            return refVa.current!.clientWidth;
        }

        public getHeight (): number {
            return refVa.current!.clientHeight;
        }
    }

    const eoh: EditorOuterHandler = new EditorOuterHandler();
    const eah: EditAreaHandler = new EditAreaHandler();
    const vah: ViewAreaHandler = new ViewAreaHandler();

    const fixEaWidth = () => {
        const vaWidth: number = vah.getWidth();

        eah.setWidth(vaWidth);
    };
    
    useEffect(() => {
        try {
            refEa.current!.value = p.data;
            refVa.current!.innerText = p.data.replace(/ /g, '\u00A0');

            const reg: RegExp = /<br>$/;

            if (reg.test(refVa.current!.innerHTML) || refVa.current!.innerHTML === '') {
                refVa.current!.innerHTML += '&nbsp;';
            }

            setHeight(vah.getHeight());

            fixEaWidth();
        } catch(e) {}
        
        setRowCount(eah.getRowCount());
    });

    return <div className='pane text'>
        <div className={`pane-text--inner ${p._key}`}>
            <div className='pane-text-wrapper'>
                <LineNumbersOuter _key={p._key} lineCount={rowCount} activeLineNumber={activeRowNumber} offsetTop={offset} setHeight={setHeight}/>
                <div className='editor-outer' ref={refEo} onScroll={eoh.onResize}>
                    <div className='editor-inner'>
                        <div className='edit-unit view-area' ref={refVa}></div>
                        <textarea className='edit-unit edit-area' ref={refEa} onChange={eah.onChange.bind(eah)} onMouseMove={eah.onMouseMove.bind(eah)} onKeyUp={eah.onKeyUp.bind(eah)} spellCheck={false}/>                        
                    </div>                
                </div>
                <style>{`.pane-text--inner.${p._key} {--size: 20px; --height: ${height}px;}`}</style>
                
            </div>
        </div>
    </div>
}

interface PaneTextProps {
    _key: string,
    data: string,
    updateData (data: string): void
}

export default PaneText;

const LineNumbersOuter = (p: LineNumbersOuterProps): JSX.Element => {
    const refLno = useRef() as MutableRefObject<HTMLDivElement>;

    let numbers: number[] = [];

    for (let i = 1; i <= p.lineCount; i++) {
        numbers.push(i);
    }

    const fix = () => {
        try {
            const height: number = refLno.current!.clientHeight;
            p.setHeight(height);
        } catch (e) {}        
    };

    useEffect(() => {
        refLno.current!.style.top = `${p.offsetTop * -1}px`;
    });
 
    return <div className='line-numbers--outer' ref={refLno}><>{
        numbers.map((num) => {
            const isActive: boolean = ((): boolean => {
                let active: boolean = false;

                if (num === p.activeLineNumber) {
                    active = true;
                }

                return active;
            })();
            return <LineNumber key={`${p._key}-line-${num}`}active={isActive} lineNumber={num}/>
        })
    }</></div>
}

const LineNumber = (p: LineNumberProps): JSX.Element => {
    let outerClassName: string = ((): string => {
        if (p.active) {
            return 'line-number--outer active';
        }
        return 'line-number--outer';
    })();

    return <div className={outerClassName}>
        <div className='line-number--inner'>{p.lineNumber}</div>
    </div>
}

interface LineNumbersOuterProps {
    _key: string
    lineCount: number,
    activeLineNumber: number,
    offsetTop: number,
    setHeight (height: number): void
}

interface LineNumberProps {
    active: boolean,
    lineNumber: number,
}