import React, { useState } from 'react';

import fixStyle from '../fix-style';

const StyleVariables = (props: StyleVariablesProps): JSX.Element => {
    const [heightHeader, setHeightHeader] = useState(32);
    const [heightFooter, setHeightFooter] = useState(32);
    const [heightTab, setHeightTab] = useState(32);
    const [widthTabLabelsOuter, setWidthTabLabelsOuter] = useState (0);
    const [widthLineNumbers, setWidthLineNumbers] = useState(30);

    class StyleApi implements StyleApiInterface {
        public updateHeightHeader(hightHeader: number): void {
            setHeightHeader(heightHeader);
        }

        public updateHeightFooter(heightFooter: number): void {
            setHeightFooter(heightFooter);
        }

        public updateHeightTab(heightTab: number): void {
            setHeightTab(heightTab);
        }

        public updateWidthTabLabelsOuter(widthTabLabelsOuter: number): void {
            setWidthTabLabelsOuter(widthTabLabelsOuter);
        }

        public updateWidthLineNumbers(widthLineNumbers: number): void {
            setWidthLineNumbers(widthLineNumbers);
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
            }
        `)}</style>
        <link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'></link>
    </div>
}

interface StyleVariablesProps {

}

export default StyleVariables;