import { contextBridge, ipcRenderer, ipcRenderer as IR, IpcRendererEvent as IREvent } from 'electron';

import P from 'LIB/promise';
import R from 'LIB/resource';
import Channel from 'PRE_LIB/ipc-channnel';

export default class IpcApi {
    public static readonly API_KEY = 'ipc';
    
    constructor () {}

    public boot = new class Boot {
        private readonly _CHANNEL = Channel.toMain.boot;
        private _postedReady: boolean = false;
        private _postedShow: boolean = false;

        public postReady = (): void => {
            if (!this._postedReady) {
                IR.send(this._CHANNEL.POST_READY);
                this._postedReady = true;
            }
        }
    
        public postShow = (): void => {
            if (!this._postedShow) {
                IR.send(this._CHANNEL.POST_SHOW);
                this._postedShow = true;
            }
        } 
    }();

    public window = new class Window {
        private readonly _CHANNEL = Channel.toMain.window;

        public postClose = (): void => {
            IR.send(this._CHANNEL.POST_CLOSE);
        }

        public postMaximize = (): void => {
            IR.send(this._CHANNEL.POST_MAXIMIZE);
        }

        public postMinimize = (): void => {
            IR.send(this._CHANNEL.POST_MINIMIZE);
        };

        public postUnmaximize = (): void => {
            IR.send(this._CHANNEL.POST_UNMAXIMIZE);
        };

        public requestInitWinSize = async (): Promise<void> => {
            await IR.invoke(this._CHANNEL.INIT_SIZE);
    
            this._setStatusText('initializing window size.');
            P.VOID;
        }

        private _setStatusText (statusText: string): void {
            document.dispatchEvent(new CustomEvent(R.eventType.SET_STATUS_TEXT, {
                detail: { statusText: statusText }
            }));
        }
    }();

    public off = (channel: string, callbak: Function) => {
        IR.off(channel, (event: IREvent, args: any) => {
            callbak(event, args);
        });
    }

    public on = (channnel: string, callback: Function) => {
        IR.on(channnel, (event: IREvent, args: any) => {
            callback(event, args);
        });
    }

    public once = (channnel: string, callback: Function) => {
        IR.once(channnel, (event: IREvent, args: any) => {
            callback(event, args);
        });
    }

    public temp = (width: number, height: number): void => {
        //main-ipc-handle.ts
        IR.send(Channel.toMain.TEMP, width, height);
    }  
}

(() => {
    contextBridge.exposeInMainWorld (
        IpcApi.API_KEY,
        new IpcApi()
    );
})();