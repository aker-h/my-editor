import React, { useState, useEffect } from 'react';

import PaneText from 'COMPONENTS/pane/pane-text';

let booted: boolean = false;

const Contents = (props: ContentsProps): JSX.Element => {
    const [tabs, updateTabs] = useState([] as MyTab[]);

    useEffect (() => {
        if (!booted) {
            booted = true;

            const tab: MyTab = {
                path: '',
                fileName: 'new-file',
                type: 'undefined',
                data: ''
            }

            updateTabs([tab]);
        }
    });

    return <div className="contents">
        <TabLabelsOuter><>{
            tabs.map((tab) => {
                return <TabLabel fileName={tab.fileName} type={tab.type}/>
            })
        }</></TabLabelsOuter>
        <PanesOuter><>{
            tabs.map((tab) => {
                switch (tab.type) {
                    case 'txt':
                    default : {
                        return <PaneText data={tab.data}/>
                    }
                }
            })
        }</></PanesOuter>
        <style>{`div.contents{ --height-tab: 32px;}`}</style>
    </div>
}

interface ContentsProps {}

export default Contents;

const TabLabelsOuter = (props: TabLabelsOuterProps): JSX.Element => {
    return <div className='tab-labels-outer'>
        {props.children}
    </div>
}

const TabLabel = (props: TabLabelProps): JSX.Element => {
    const fileName: string = props.fileName;
    const tabType: MyTabType = props.type;

    return <div className='tab-label'>{`${tabType}: ${fileName}`}</div>
}

const PanesOuter = (props: PanesOuterProps): JSX.Element => {
    return <div className='panes-outer'>
        {props.children}
    </div>
}

interface TabLabelsOuterProps {
    children: JSX.Element
}

interface TabLabelProps {
    fileName: string,
    type: MyTabType
}

interface PanesOuterProps {
    children: JSX.Element
}