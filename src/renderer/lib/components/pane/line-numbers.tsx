import React, { useRef, useState, RefObject } from 'react';

const LineNumbers = (p: {_key: string, length: number, active: number, lnh: LineNumbersHandler}): JSX.Element => {
    const lnh: LineNumbersHandler = p.lnh;
    const [length, setLength] = useState (p.length);
    const props: Prop[] = [];

    lnh.updateLength = (length: number): void => {
        setLength(length);
    }

    lnh.scrollTo = (scrollTo: number): void => {
        lnh.ref.current!.scrollTop = scrollTo;
    }

    for (let i = 1; i <= length; i++) {
        props.push({key: `${p._key}-ln-${i}`, num: i, active: (p.active === i)? true: false} as Prop)
    }

    return <div className={`line-numbers--outer ${p._key}`} ref={lnh.ref}>
        <div className='line-numbers--inner'>{props.map((prop) => {
            return <LineNumber key={prop.key} num={prop.num} active={prop.active}/>
        })}</div>        
        <style>{`div.line-numbers.${p._key} {--length: ${length};}`}</style>
    </div>
}

class LineNumbersHandler {
    public ref = useRef() as RefObject<HTMLDivElement>;

    constructor () {}

    public scrollTo (scrollTo: number): void { /* コンポーネント内で実装 */ }

    public updateLength (length: number): void { /* コンポーネント内で実装 */}
}

export default LineNumbers;

const LineNumber = (p: {num: number, active: boolean}): JSX.Element => {
    let className: string = `line-number--outer ${p.num}`;
    className += (p.active)? 'active': '';

    return <div className={className}>
        <div className='line-number--inner'>{p.num}</div>
    </div>
}

interface Prop {
    key: string;
    num: number;
    active: boolean
}

export {
    LineNumbersHandler
}