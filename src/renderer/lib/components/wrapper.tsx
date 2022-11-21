import React from 'react';

import Contents from 'COMPONENTS/contents';
import Sidebar from 'COMPONENTS/sidebar';

const Wrapper = (props: {}): JSX.Element => {
    // const tabs: MyTab[] = props.toTabs(props.tabs);

    return <div className='wrapper'>
        <Sidebar />
        <Contents />
    </div>
}

export default Wrapper;