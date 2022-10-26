import {  BrowserWindow, IpcMainEvent as IMEvent, IpcMainInvokeEvent as IMInvokeEvent } from 'electron';

import log from 'LIB/log';
import Main from 'APP_LIB/main';
import WindowControler from 'APP_LIB/window-controler';

export default class MainIpcHandler {
    private windowControler: WindowControler = new WindowControler();

    private window: BrowserWindow | null = null;

    constructor () {}

    public onClose (ev: IMEvent): void {
        this.windowControler.closeWindow();
    }

    public onInitWindowSize (ev: IMInvokeEvent): void {
        log.event('Initializing Window size.');

        this.windowControler.initWindowSize();
        
        return;
    }

    public onMaximize (ev: IMEvent): void {
        this.windowControler.maximizeWindow();
    }

    public onMinimize (ev: IMEvent): void {
        this.windowControler.minimizeWindow();
    }

    public onPostReady (ev: IMEvent) {
        this.windowControler.applyInitWindowSize();
        this.windowControler.enableResize();
        this.windowControler.observe();
    }

    public onPostShow (ev: IMEvent) {
        this.window!.show();
        this.window!.webContents.openDevTools();
        this.windowControler.setWindow(this.window!);
        log.event('Appeard Window.')
    }

    public onTemp (ev: IMEvent, width: number, height: number) {
        this.window!.setSize(width, height);
    }

    public onUnmaximize (ev: IMEvent) {
        this.windowControler.unmaximizeWindow();
    }

    public setWindow (browserWindow: BrowserWindow) {
        log.event('BrowserWindow have set to MainIpcHandler.');
        this.window = browserWindow;
    }
}