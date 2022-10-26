import { BrowserWindow } from 'electron';
import Store from 'electron-store';

import log from 'LIB/log';
import Channel from 'PRE_LIB/ipc-channnel';

const store: Store = new Store();

export default class WindowControler {
    private readonly toRenderer = Channel.toRenderer;
    private window: BrowserWindow | null = null;
    private height: number = 0;
    private width: number = 0;
    
    constructor () {}

    public applyInitWindowSize (): void {
        this.window!.setSize(this.width, this.height);
        log.event('Applied Init window size.');
    }

    public closeWindow (): void {
        this.window!.close();
        log.event('Window had closed by browser window.');
    }

    public enableResize (): void {
        this.window!.setResizable(true);
        log.event('Enabled resizing window size.');
    }
    
    public initWindowSize (): void {
        this.width = this.getWidthFromStore();
        this.height = this.getHeightFromStore();
    }

    public maximizeWindow (): void {
        this.window!.maximize();
        log.event('Window have been maximized by browser window.');
    }

    public minimizeWindow (): void {
        this.window!.minimize();
        log.event('Window have been minimized by browser window.');
    }

    public observe (): void {
        this.window!.on('enter-full-screen', this.postEnterFullScreen.bind(this));
        this.window!.on('leave-full-screen', this.postLeaveFullScreen.bind(this));
        this.window!.on('maximize', this.postMaximized.bind(this));
        this.window!.on('unmaximize', this.postUnmaximized.bind(this));
    }

    public setWindow (browserWindow: BrowserWindow): void {
        this.window = browserWindow;
    }

    public unmaximizeWindow (): void {
        this.window!.unmaximize();
        log.event('Window have been minimized by browser window.');
    }

    private getHeightFromStore (): number {
        const width: string = store.get('height', '600') as string;
        return Number(width);
    }

    private getWidthFromStore (): number {
        const width: string = store.get('width', '800') as string;
        return Number(width);
    }

    private postEnterFullScreen (): void {
        log.event('Window have entered to fullscreen');
        this.window!.webContents.send(this.toRenderer.window.POST_ENTER_FULLSCREEN);
    }

    private postLeaveFullScreen (): void {
        log.event('Window have left from fullscreen');
        this.window!.webContents.send(this.toRenderer.window.POST_LEAVE_FULLSCREEN);
    }

    private postMaximized (): void {
        log.event('Window have been maximized.');
        this.window!.webContents.send(this.toRenderer.window.POST_MAXIMIZED);
    }

    private postUnmaximized (): void {
        log.event('Window have been unmaximized.');
        this.window!.webContents.send(this.toRenderer.window.POST_UNMAXIMIZED);

    }
}