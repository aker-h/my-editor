import React, { useState, useEffect, SetStateAction } from 'react';

import P from 'LIB/promise';
import R from 'LIB/resource';
import sleep from 'LIB/sleep';

const Loading = (props: LoadingProps): JSX.Element => {
    const [ statusText, setStatusText ] = useState('loading...');
    window.ipc.boot.postShow();

    const onSetStatusTextHandler = (ev: Event) => {
        const cv: CustomEvent = ev as CustomEvent;
        const detail: any = cv.detail;
        const statusText: string = detail.statusText;

        setStatusText(statusText);
    }

    useEffect (() => {
        document.addEventListener(R.eventType.SET_STATUS_TEXT, onSetStatusTextHandler);

        load();

        return () => {
            document.removeEventListener(R.eventType.SET_STATUS_TEXT, onSetStatusTextHandler);
        }
    });    

    return <div className="loading">
        <div className='loading-animation'>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        <StatusText statusText={statusText} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"/>
        <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"></script>
    </div>
}

const StatusText = (props: StatusTextProps): JSX.Element => {
    return <div className='status-text'>{props.statusText}</div>
}

async function load () {
    await window.ipc.window.requestInitWinSize();

    const LIMIT = 5;

    for (let i = 0; i < LIMIT; i++) {
        await sleep(1000)
;    }
    
    document.dispatchEvent(new Event(R.eventType.COMPLETE_LOAD));
    window.ipc.boot.postReady();
    return P.VOID;
}

interface LoadingProps {}

interface StatusTextProps {
    statusText: string
}

export default Loading;