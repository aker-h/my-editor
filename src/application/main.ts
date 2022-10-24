import path from 'path';
import fs from 'fs';
import { app, App, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

import getOS from 'APP_LIB/get-os';
import getInitWindowProps from 'APP_LIB/get-init-window-props';

class Main {  
    private static readonly URL: string = `file://${__dirname}/../renderer/index.html`;
    private static readonly APP: App = app;

    private static os: NodeJS.Platform | null = null;
    private static window: BrowserWindow | null = null;
    private static windowProps: BrowserWindowConstructorOptions | null = null;

    public static async main (): Promise<void> {
        Main.os = getOS();
        Main.windowProps = getInitWindowProps(Main.os!);
        Main.initApplication();
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