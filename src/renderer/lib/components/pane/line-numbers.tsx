import React from 'react';

const LineNumbers = (p: {_key: string, length: number, active: number}): JSX.Element => {
    const props: Prop[] = [];

    for (let i = 1; i <= p.length; i++) {
        props.push({key: `${p._key}-ln-${i}`, num: i, active: (p.active === i)? true: false} as Prop)
    }

    return <div className={`line-numbers ${p._key}`}>
        {props.map((prop) => {
            return <LineNumber key={prop.key} num={prop.num} active={prop.active}/>
        })}
        <style>{`div.line-numbers.${p._key} {--length: ${p.length};}`}</style>
    </div>
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