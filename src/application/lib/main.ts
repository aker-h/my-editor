import { app, App, BrowserWindow, BrowserWindowConstructorOptions, ipcMain as IM } from 'electron'

import log from 'LIB/log';
import getOS from 'APP_LIB/get-os';
import getInitWindowProps from 'APP_LIB/get-init-window-props';
import MainIpcHandler from 'APP_LIB/main-ipc-handler';
import Channel from 'SRC/preload/lib/ipc-channel';

const MIHandler: MainIpcHandler = new MainIpcHandler();

export default class Main {  
    private static readonly URL: string = `file://${__dirname}/../renderer/index.html`;
    private static readonly APP: App = app;

    private static window: BrowserWindow | null = null;
    private static os: NodeJS.Platform | null = null;
    private static windowProps: BrowserWindowConstructorOptions | null = null;

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

        IM.on(boot.POST_SHOW, MIHandler.onPostShow.bind(MIHandler));
        IM.handle(window.INIT_SIZE, MIHandler.onInitWindowSize.bind(MIHandler));
        IM.on(boot.POST_READY, MIHandler.onPostReady.bind(MIHandler));
        IM.on(boot.REQUEST_EXTENSIONS, MIHandler.onRequestExtensions.bind(MIHandler));

        IM.on(window.POST_CLOSE, MIHandler.onClose.bind(MIHandler));
        IM.on(window.POST_MAXIMIZE, MIHandler.onMaximize.bind(MIHandler));
        IM.on(window.POST_MINIMIZE, MIHandler.onMinimize.bind(MIHandler));
        IM.on(window.POST_UNMAXIMIZE, MIHandler.onUnmaximize.bind(MIHandler));

        IM.on(toMain.TEMP, MIHandler.onTemp.bind(MIHandler));
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
            MIHandler.setWindow(browserWindow);
            
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
}

Main.main();