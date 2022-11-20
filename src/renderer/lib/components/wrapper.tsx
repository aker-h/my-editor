import React from 'react';

import Contents from 'COMPONENTS/contents';
import Sidebar from 'COMPONENTS/sidebar';

const Wrapper = (props: WrapperProps): JSX.Element => {
    const tabs: MyTab[] = props.toTabs(props.tabs);

    return <div className='wrapper'>
<<<<<<< HEAD
        <Contents tabs={tabs} toTabs={props.toTabs}/>
=======
        <Sidebar />
        <Contents tabs={tabs} tc={props.tc}/>
>>>>>>> 6d626912a923ffdb2377416f969408bfb4f8c457
    </div>
}

interface WrapperProps {
    tabs: MyTab[];
    toTabs (myTabs: MyTab[]): MyTab[];
}

export default Wrapper;