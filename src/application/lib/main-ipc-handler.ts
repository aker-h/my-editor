import { BrowserWindow as BWindow, IpcMainEvent as IMEvent} from 'electron';

import Main from 'APP_LIB/main';

export default class MainIpcHandler {
    constructor () {}

    public onReady (ev: IMEvent) {
        this.showWindow();
    }

    public onTemp (ev: IMEvent, width: number, height: number) {
        Main.window!.setSize(width, height);
    }

    private showWindow (): void {
        Main.window!.show();
    }
}