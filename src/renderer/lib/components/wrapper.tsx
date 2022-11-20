import React from 'react';

import Contents from 'COMPONENTS/contents';

const Wrapper = (props: WrapperProps): JSX.Element => {
    const tabs: MyTab[] = props.toTabs(props.tabs);

    return <div className='wrapper'>
        <Contents tabs={tabs} toTabs={props.toTabs}/>
    </div>
}

interface WrapperProps {
    tabs: MyTab[];
    toTabs (myTabs: MyTab[]): MyTab[];
}

export default Wrapper;