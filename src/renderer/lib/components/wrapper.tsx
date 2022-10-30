import React from 'react';

import Contents from 'COMPONENTS/contents';

const Wrapper = (props: WrapperProps): JSX.Element => {
    const tabs: MyTab[] = props.toTabs(props.tabs).sort((a, b) => {
        if (a.tabIndex < b.tabIndex) return -1;
        if (a.tabIndex > b.tabIndex) return -1;
        return 0;
    });

    return <div className='wrapper'>
        <Contents tabs={tabs} tc={props.tc}/>
    </div>
}

interface WrapperProps {
    tabs: MyTab[],
    tc: TabsControllerInterface,
    toTabs (myTabs: MyTab[]): MyTab[]
}

export default Wrapper;