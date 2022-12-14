import React, { useState, useEffect, useContext, createContext } from 'react';
import { IpcRendererEvent as IREvent } from 'electron';

import R from 'LIB/resource';
import log from 'LIB/log';
import Channel from 'SRC/preload/lib/ipc-channel';
import Context from 'REN_LIB/context'
import Loading from 'COMPONENTS/loading';
import Header from 'COMPONENTS/header';
import Wrapper from 'COMPONENTS/wrapper';
import Footer from 'COMPONENTS/footer';
import StyleVariables from 'COMPONENTS/style-variables';

const MyEditor = (p: {}): JSX.Element => {
    const [completeLoad, setCompletedLoad] = useState(false);

    const onCompleteLoad = (ev: Event) => {
        setCompletedLoad(true);
    }    

    document.addEventListener(R.eventType.COMPLETE_LOAD, onCompleteLoad);
    
    useEffect(() => {
        wh.observe();
        return () => {
            document.removeEventListener(R.eventType.COMPLETE_LOAD, onCompleteLoad);
            wh.off();
        }
    });

    return <>
        {!completeLoad? <Loading/>: <>
            <Header key='header'/>
            <Wrapper key='wrapper'/>
            <Footer key='footer'/> 
        </>}
        <StyleVariables/>
    </>
}

export default MyEditor;

const wh = class WindowHandler {
    private static readonly _WINDOW = Channel.toRenderer.window;
    private static readonly _FULLSCREEN = 'fullscreen';
    private static readonly _MAXIMIZED = 'maximized'

    public static observe (): void {
        window.ipc.on(wh._WINDOW.POST_ENTER_FULLSCREEN, wh._enterFullscreen.bind(wh));
        window.ipc.on(wh._WINDOW.POST_LEAVE_FULLSCREEN, wh._leaveFullscreen.bind(wh));
        window.ipc.on(wh._WINDOW.POST_MAXIMIZED, wh._maximized.bind(wh));
        window.ipc.on(wh._WINDOW.POST_UNMAXIMIZED, wh._unmaximized.bind(wh));
    }

    public static off (): void {
        window.ipc.removeAllListeners(wh._WINDOW.POST_ENTER_FULLSCREEN);
        window.ipc.removeAllListeners(wh._WINDOW.POST_LEAVE_FULLSCREEN);
        window.ipc.removeAllListeners(wh._WINDOW.POST_MAXIMIZED);
        window.ipc.removeAllListeners(wh._WINDOW.POST_UNMAXIMIZED);
    }

    private static _enterFullscreen (ev: IREvent) {
        document.body.classList.add(wh._FULLSCREEN);
    }

    private static _leaveFullscreen (ev: IREvent) {
        document.body.classList.remove(wh._FULLSCREEN);
    }

    private static _maximized (ev: IREvent) {
        document.body.classList.add(wh._MAXIMIZED);
    }

    private static _unmaximized (ev: IREvent) {
        document.body.classList.remove(wh._MAXIMIZED);
    }
};