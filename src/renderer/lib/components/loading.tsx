import React, { useState, useEffect, CSSProperties } from 'react';

import P from 'LIB/promise';
import R from 'LIB/resource';
import sleep from 'LIB/sleep';
import Boot from 'REN_LIB/boot';

let booted: boolean = false;

const Loading = (props: LoadingProps): JSX.Element => {
    const tc = props.tc;
    const [ statusText, setStatusText ] = useState('loading...');
    const [ fontSize, setFontSize] = useState(20);
    window.ipc.boot.postShow();

    const onSetStatusTextHandler = (ev: Event) => {
        const cv: CustomEvent = ev as CustomEvent;
        const detail: any = cv.detail;
        const statusText: string = detail.statusText;
        const fontSize: number | undefined = detail.fontSize;

        if (fontSize !== undefined) {
            setFontSize(fontSize);
        } else {
            setFontSize(20);
        }

        setStatusText(statusText);
    }

    useEffect (() => {
        document.addEventListener(R.eventType.SET_STATUS_TEXT, onSetStatusTextHandler);

        if (!booted) {
            load(tc);
            booted = true;
        }        

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
        <StatusText statusText={statusText} fontSize={fontSize}/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"/>
        <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"></script>
    </div>
}

const StatusText = (p: StatusTextProps): JSX.Element => {
    const style: CSSProperties = {
        fontSize: `${p.fontSize}px`
    }
    return <div className='status-text' style={style}>{p.statusText}</div>
}

async function load (tc: TabsControllerInterface) { 
    await Boot.requestInitWinSize();

    const tabs: MyTab[] = await Boot.loadLastOpenedTabs();

    if (tabs.length === 0) {
        tc.createNewTab();
    } else {
        tabs.map((tab) => {
            tc.addTab(tab);
        });
    }    

    const LIMIT = 1;

    for (let i = 0; i < LIMIT; i++) {
        await sleep(1000);
    }
    
    document.dispatchEvent(new Event(R.eventType.COMPLETE_LOAD));
    window.ipc.boot.postReady();
    window.ipc.boot.requestExtensions();
    return P.VOID;
}

interface LoadingProps {
    tc: TabsControllerInterface
}

interface StatusTextProps {
    statusText: string,
    fontSize: number
}

export default Loading;