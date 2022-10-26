import React from 'react';

const PaneText = (props: PaneTextProps): JSX.Element => {
    return <div className='pane text'>{props.data}</div>
}

interface PaneTextProps {
    data: string
}

export default PaneText;