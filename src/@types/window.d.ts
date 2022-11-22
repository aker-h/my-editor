import { SetStateAction } from 'react';

import Dummy from 'LIB/dummy';
import IpcApi from 'SRC/preload/lib/ipc-api';
import { DebugInterface } from 'SRC/renderer/temp/tab-label';

declare global {
    interface Window {
        exApi: ExApi;
        debug: DebugInterface;
        ipc: IpcApi;
        tabs: MyTab[];
        sApi: StyleApiInterface;

        tc: TabsControllerInterface
    }
}