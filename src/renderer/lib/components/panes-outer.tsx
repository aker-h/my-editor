import React from 'react';

import PaneText from 'COMPONENTS/pane/pane-text';

const PanesOuter = (p: {tabs: MyTab[]}): JSX.Element => {
    const tabs: MyTab[] = p.tabs;

    return <div className='panes-outer'><>{
        tabs.map((tab) => {
            switch (tab.type) {
                case 'txt': 
                case 'undefined': 
                default: {
                    return <PaneText key={`pane-text-${tab.key}`} tab={tab}/>
                }
            }
        })
    }</></div> 
}

export default PanesOuter;