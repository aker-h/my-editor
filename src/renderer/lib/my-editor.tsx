import React, { useState, useEffect } from 'react';
import { IpcRendererEvent as IREvent } from 'electron';

import R from 'LIB/resource';
import Channel from 'PRE_LIB/ipc-channnel';
import Loading from 'COMPONENTS/loading';
import Header from 'COMPONENTS/header';
import Wrapper from 'COMPONENTS/wrapper';
import Footer from 'COMPONENTS/footer';

const MyEditor = (props: MyEditorProps): JSX.Element => {
    const [completedLoad, setCompletedLoad] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(32);
    const [footerHeight, setFooterHeight] = useState(32);
    const IPC = window.ipc;
    const BODY: HTMLBodyElement = document.body as HTMLBodyElement;

    const onCompleteLoad = (ev: Event) => {
        setCompletedLoad(true);
    }

    const wh = new class WindowHandler {
        private readonly _WINDOW = Channel.toRenderer.window;
        private readonly _FULLSCREEN = 'fullscreen';
        private readonly _MAXIMIZED = 'maximized'

        public observe (): void {
            IPC.on(this._WINDOW.POST_ENTER_FULLSCREEN, this._enterFullscreen.bind(this));
            IPC.on(this._WINDOW.POST_LEAVE_FULLSCREEN, this._leaveFullscreen.bind(this));
            IPC.on(this._WINDOW.POST_MAXIMIZED, this._maximized.bind(this));
            IPC.on(this._WINDOW.POST_UNMAXIMIZED, this._unmaximized.bind(this));
        }

        public off (): void {
            IPC.off(this._WINDOW.POST_ENTER_FULLSCREEN, this._enterFullscreen.bind(this));
            IPC.off(this._WINDOW.POST_LEAVE_FULLSCREEN, this._leaveFullscreen.bind(this));
            IPC.off(this._WINDOW.POST_MAXIMIZED, this._maximized.bind(this));
            IPC.off(this._WINDOW.POST_UNMAXIMIZED, this._unmaximized.bind(this));
        }

        private _enterFullscreen (ev: IREvent) {
            BODY.classList.add(this._FULLSCREEN);
        }

        private _leaveFullscreen (ev: IREvent) {
            BODY.classList.remove(this._FULLSCREEN);
        }

        private _maximized (ev: IREvent) {
            BODY.classList.add(this._MAXIMIZED);
        }

        private _unmaximized (ev: IREvent) {
            BODY.classList.remove(this._MAXIMIZED);
        }
    }

    useEffect(() => {
        document.addEventListener(R.eventType.COMPLETE_LOAD, onCompleteLoad);
        wh.observe();

        return () => {
            document.removeEventListener(R.eventType.COMPLETE_LOAD, onCompleteLoad);
            wh.off();
        };
    });

    if (!completedLoad) {
        return <Loading />
    }

    return <>
        <Header/>
        <Wrapper/>
        <Footer/>
        <style>{fixStyle(`
            div.react-outer {
                --header-height: ${headerHeight}px;
                --footer-height: ${footerHeight}px;
            }
        `)}</style>
    </>
}

function fixStyle (style: string): string {
    const lines = style.replace(/\n\n/g, '\n').split('\n');

    let result = '';

    lines.map((line, i) => {
        line = line.trim().replace(/--/, '\t--');

        if (i !== lines.length - 1) {
            line += '\n';
        }

        result += `\t${line}`;
    });

    return result;
}

interface MyEditorProps {}

export default MyEditor;