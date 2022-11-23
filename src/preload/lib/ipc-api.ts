import { contextBridge, ipcRenderer, ipcRenderer as IR, IpcRendererEvent as IREvent } from 'electron';

import P from 'LIB/promise';
import R from 'LIB/resource';
import log from 'LIB/log';
import Channel from 'PRE_LIB/ipc-channel';

export default class IpcApi {
    public static readonly API_KEY = 'ipc';
    private static _channels: string[] = [];
    private readonly _LOG_DEBUG: boolean = false;
    
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

        public requestExtensions = (): void => {
            IR.send(this._CHANNEL.REQUEST_EXTENSIONS);
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
    
            this._setStatusText('initializing window size.', 14);
            P.VOID;
        }

        private _setStatusText (statusText: string, fontSize: number = 20): void {
            document.dispatchEvent(new CustomEvent(R.eventType.SET_STATUS_TEXT, {
                detail: { statusText: statusText, fontSize: fontSize }
            }));
        }
    }();

    public on = (channel: string, callback: (...args: any[]) => void) => {        
        IR.addListener(channel, (event: IREvent, args: any) => {
            log.event(`Received ['${channel}']`);
            callback(event, args);
        });

        IpcApi._channels.push(channel);
        this._debugLog('on', channel);
    }

    public removeAllListeners = (channel: string): void => {
        IR.removeAllListeners(channel);

        IpcApi._channels.splice(IpcApi._channels.indexOf((channel)), 1);
        this._debugLog('off', channel);
    };

    public temp = (width: number, height: number): void => {
        //main-ipc-handle.ts
        IR.send(Channel.toMain.TEMP, width, height);
    }
    
    private _debugLog = (action: string, channel: string) => {
        if (this._LOG_DEBUG === false) return; 

        const WIDTH: number = 30;

        const makeBoarder = (topOrBottm: 'top' | 'bottom') => {
            switch (topOrBottm) {
                case 'top': {
                    return '┌ACTIVE_LISTENERS──────────────┐\n';
                }
                case 'bottom': {
                    return '└──────────────────────────────┘\n'
                }
            }
        };

        const makeBlank = (channelLength: number): string => {
            let blank = '';

            const blankLength: number = WIDTH - channelLength;

            for (let i = 0; i < blankLength; i++) {
                blank += ' ';
            }

            return blank;
        };

        const rows: string = ((): string => {
            let result = '';
            IpcApi._channels.map((channel) => {
                result += `│${channel}${makeBlank(channel.length)}|\n`;
            }); 
            return result;
        })();

        const table: string = `${makeBoarder('top')}${rows}${makeBoarder('bottom')}`;

        console.log(`${table}${action}: ${channel}`);
    };
}

(() => {
    contextBridge.exposeInMainWorld (
        IpcApi.API_KEY,
        new IpcApi()
    );
})();