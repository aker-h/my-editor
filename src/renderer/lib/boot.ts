import P from 'LIB/promise';
import R from 'LIB/resource';

export default class Boot {
    public static async loadLastOpenedTabs (): Promise<MyTab[]> {
        const storagedTabs: string | null = localStorage.getItem('tabs');

        let tabs: MyTab[] = [] as MyTab[];

        if (storagedTabs !== null) {
            tabs = JSON.parse(storagedTabs) as MyTab[];
        }

        return P.TABS(tabs);
    }

    public static async requestInitWinSize () {
        await window.ipc.window.requestInitWinSize();
        return P.VOID;
    }

    public static setStatusText (statusText: string, fontSize: number = 20): void {
        document.dispatchEvent(new CustomEvent(R.eventType.SET_STATUS_TEXT, {
            detail: { statusText: statusText, fontSize: fontSize }
        }));
    }
}