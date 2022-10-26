import React from 'react';

import Contents from 'COMPONENTS/contents';

const Wrapper = (props: WrapperProps): JSX.Element => {
    return <div className='wrapper'>
        <Contents/>
    </div>
}

interface WrapperProps {}

export default Wrapper;