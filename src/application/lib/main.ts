import path from 'path';
import fs from 'fs';
import { app, App, BrowserWindow, BrowserWindowConstructorOptions, ipcMain as IM } from 'electron'

import log from 'LIB/log';
import getOS from 'APP_LIB/get-os';
import getInitWindowProps from 'APP_LIB/get-init-window-props';
import MainIpcHandler from 'APP_LIB/main-ipc-handler';
import Channel from 'SRC/preload/lib/ipc-channel';

export default class Main {  
    private static readonly URL: string = `file://${__dirname}/../renderer/index.html`;
    private static readonly APP: App = app;

    private static window: BrowserWindow | null = null;
    private static os: NodeJS.Platform | null = null;
    private static windowProps: BrowserWindowConstructorOptions | null = null;
    private static MIHandler: MainIpcHandler = new MainIpcHandler();

    public static async main (): Promise<void> {
        log.event('start booting.');

        Main.os = getOS();
        log.event(`OS: ${Main.os}`);

        Main.initApplication();        

        Main.windowProps = getInitWindowProps(Main.os!);
        log.event(`BrowserWindowOption is ready.`);

        
        Main.addIpcRecievers();
        log.event('IpcReciever was ready.');
    }

    private static addIpcRecievers (): void {
        const toMain = Channel.toMain;
        const boot = toMain.boot;
        const window = toMain.window;

        IM.on(boot.POST_SHOW, Main.MIHandler.onPostShow.bind(Main.MIHandler));
        IM.handle(window.INIT_SIZE, Main.MIHandler.onInitWindowSize.bind(Main.MIHandler));
        IM.on(boot.POST_READY, Main.MIHandler.onPostReady.bind(Main.MIHandler));
        IM.on(boot.REQUEST_EXTENSIONS, Main.MIHandler.onRequestExtensions.bind(Main.MIHandler));

        IM.on(window.POST_CLOSE, Main.MIHandler.onClose.bind(Main.MIHandler));
        IM.on(window.POST_MAXIMIZE, Main.MIHandler.onMaximize.bind(Main.MIHandler));
        IM.on(window.POST_MINIMIZE, Main.MIHandler.onMinimize.bind(Main.MIHandler));
        IM.on(window.POST_UNMAXIMIZE, Main.MIHandler.onUnmaximize.bind(Main.MIHandler));

        IM.on(toMain.TEMP, Main.MIHandler.onTemp.bind(Main.MIHandler));
    }

    private static initApplication (): void {
        log.event('Initializeing application.');

        const WINDOW_ALL_CLOSED = 'window-all-closed';
        const READY = 'ready';
        const ACTIVATE = 'activate';

        const onWindowAllClosed = () => {
            log.event('All windows were closed. Quit Application.');
            Main.APP.quit();
        }

        const create = () => {
            const browserWindow: BrowserWindow = new BrowserWindow(Main.windowProps!);
            Main.window = browserWindow;
            Main.MIHandler.setWindow(browserWindow);
            
            Main.window.loadURL(Main.URL);
            log.event(`Called BrowserWindow.\n-------------------URL(${Main.URL})`);

            const CLOSED = 'closed';

            const onClosed = () => {
                log.event('Window was closed. Main.window have been null.');
                Main.window = null;
            };
    
            Main.window.on(CLOSED, onClosed.bind(Main));    
        }

        const onActivate = () => {
            if (Main.window === null) {
                create();
            }
        };

        Main.APP.on(WINDOW_ALL_CLOSED, onWindowAllClosed.bind(Main));
        Main.APP.on(READY, create.bind(Main));
        Main.APP.on(ACTIVATE, onActivate.bind(Main));
    }

    private static loadReactDeveloperExt (): void {}
}

Main.main();