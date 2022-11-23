import React, { useState, useRef, RefObject } from 'react';

import fixStyle from '../fix-style';

let heightTextPaneDivProps: HeightsTextPaneDivProp[] = [];

const StyleVariables = (props: {}): JSX.Element => {
    const [heightHeader, setHeightHeader] = useState(32);
    const [heightFooter, setHeightFooter] = useState(32);
    const [heightTab, setHeightTab] = useState(32);
    const [widthTabLabelsOuter, setWidthTabLabelsOuter] = useState (0);
    const [widthLineNumbers, setWidthLineNumbers] = useState(30);

    const refHTPD = useRef() as RefObject<HTMLStyleElement>

    class StyleApi implements StyleApiInterface {
        public removeHeightTextPaneDivPropByKey(key: string): void {
            const newProps: HeightsTextPaneDivProp[] = [];

            heightTextPaneDivProps.map((prop) => {
                if (prop.key !== key) {
                    newProps.push(prop);
                }
            });

            this._updateStyleHeightTextPaneDiv(newProps);
        }

        public updateHeightHeader(hightHeader: number): void {
            setHeightHeader(heightHeader);
        }

        public updateHeightFooter(heightFooter: number): void {
            setHeightFooter(heightFooter);
        }

        public updateHeightTab(heightTab: number): void {
            setHeightTab(heightTab);
        }

        public updateHeightTextPaneDivProp(prop: HeightsTextPaneDivProp): void {
            const newProps: HeightsTextPaneDivProp[] = [];

            let needAdd: boolean = true;

            heightTextPaneDivProps.map((oldProp) => {
                if (oldProp.key === prop.key) {
                    newProps.push(prop);
                    needAdd = false;
                } else if (oldProp.key !== prop.key) {
                    newProps.push(oldProp);
                }
            });

            if (needAdd) {
                newProps.push(prop);
            }

            this._updateStyleHeightTextPaneDiv(newProps);
        }

        public updateWidthTabLabelsOuter(widthTabLabelsOuter: number): void {
            setWidthTabLabelsOuter(widthTabLabelsOuter);
        }

        public updateWidthLineNumbers(widthLineNumbers: number): void {
            setWidthLineNumbers(widthLineNumbers);
        }

        private _updateStyleHeightTextPaneDiv (props: HeightsTextPaneDivProp[]): void {
            heightTextPaneDivProps = props;
            refHTPD.current!.innerHTML = CreateStyleFromHeightTextPaneDivProp(props);
        }
    }

    window.sApi = new StyleApi();

    return <div className='style-variables'>
        <style>{fixStyle(`
            div.react-outer {
                --height-header: ${heightHeader}px;
                --height-footer: ${heightFooter}px;
                --height-tab: ${heightTab}px;
                --width-tab-labels-outer: ${widthTabLabelsOuter}px;
                --width-linenumbers: ${widthLineNumbers}px;
                --width-sidebar: 48px;
            }
        `)}</style>
        <style ref={refHTPD}></style>
        <link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'></link>
    </div>
}

function CreateStyleFromHeightTextPaneDivProp (props: HeightsTextPaneDivProp[]): string {
    let style: string = '';

    props.map((prop) => {
        style += `.pane-text--inner.${prop.key} {--height: ${prop.height}px; } `;
    });

    return fixStyle(style);
}

export default StyleVariables;