import { contextBridge, ipcRenderer as IR } from 'electron';

import Channel from 'PRE_LIB/ipc-channnel';

export default class IpcApi {
    public static readonly API_KEY = 'ipc';
    
    private _posted: boolean = false;

    constructor () {}

    public postReady = (): void => {
        if (!this._posted) {
            IR.send(Channel.toMain.POST_READY);
            this._posted= true;
            return;
        }       
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