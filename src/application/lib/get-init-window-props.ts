import path from 'path';
import { BrowserWindowConstructorOptions } from 'electron';

export default function getInitWindowProps (OS: NodeJS.Platform): BrowserWindowConstructorOptions {
    const initWindowProps: BrowserWindowConstructorOptions = {
        frame: false,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.resolve(__dirname, '..', '..', 'preload', 'preload.js')
        },
        minHeight: 49,
        darkTheme: true
    };

    switch (OS) {
        case 'win32': {
            // initWindowProps.webPreferences!.preload = ''
            break;
        }
    }

    return initWindowProps;
}