import path from 'path';
import fs from 'fs';
import { app, App, BrowserWindow, BrowserWindowConstructorOptions, ipcMain as IM, IpcMainEvent as IMEvent } from 'electron'

import getOS from 'APP_LIB/get-os';
import getInitWindowProps from 'APP_LIB/get-init-window-props';
import MainIpcHandler from 'APP_LIB/main-ipc-handler';
import Channnel from 'PRE_LIB/ipc-channnel';

export default class Main {  
    private static readonly URL: string = `file://${__dirname}/../renderer/index.html`;
    private static readonly APP: App = app;

    public static window: BrowserWindow | null = null;
    private static os: NodeJS.Platform | null = null;
    private static windowProps: BrowserWindowConstructorOptions | null = null;

    public static async main (): Promise<void> {
        Main.os = getOS();
        Main.windowProps = getInitWindowProps(Main.os!);
        Main.initApplication();
        Main.addIpcRecievers();
    }

    private static addIpcRecievers (): void {
        const MIHandler: MainIpcHandler = new MainIpcHandler();

        IM.once(Channnel.toMain.POST_READY, MIHandler.onReady.bind(MIHandler));
        IM.on(Channnel.toMain.TEMP, MIHandler.onTemp)
    }

    private static initApplication (): void {
        const WINDOW_ALL_CLOSED = 'window-all-closed';
        const READY = 'ready';
        const ACTIVATE = 'activate';

        const onWindowAllClosed = () => {
            Main.APP.quit();
        }

        const create = () => {
            Main.window = new BrowserWindow(Main.windowProps!);

            Main.window.loadURL(Main.URL);

            const CLOSED = 'closed';

            const onClosed = () => { Main.window = null; };
    
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