import Dummy from 'LIB/dummy';
import IpcApi from 'SRC/preload/lib/ipc-api';

declare global {
    interface Window {
        exApi: ExApi,
        ipc: IpcApi
    }
}