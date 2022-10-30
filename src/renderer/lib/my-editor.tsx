import React, { useState, useEffect, useContext, createContext } from 'react';
import { IpcRendererEvent as IREvent } from 'electron';

import R from 'LIB/resource';
import Channel from 'SRC/preload/lib/ipc-channel';
import Context from 'REN_LIB/context'
import Loading from 'COMPONENTS/loading';
import Header from 'COMPONENTS/header';
import Wrapper from 'COMPONENTS/wrapper';
import Footer from 'COMPONENTS/footer';
import StyleVariables from 'COMPONENTS/style-variables';

const MyEditor = (p: MyEditorProps): JSX.Element => {
    createContext(Context);
    const [tabs, setTabs] = useState([] as MyTab[]);
    const [completedLoad, setCompletedLoad] = useState(false);    

    const onCompleteLoad = (ev: Event) => {
        setCompletedLoad(true);
    }

    const setToLocalStorage = (tabs: MyTab[]) => {
        window.localStorage.setItem('tabs', JSON.stringify(tabs));
    };    

    class TabsControler implements TabsControllerInterface {
        public addTab(target: MyTab): void {
            const tabs = window.tabs;

            const newTabs: MyTab[] = [...tabs, target];

            this._updateTabs(newTabs);
        }

        public closeTab (target: MyTab): void {
            let newTabs: MyTab[] = [];

            const tabs = window.tabs;

            tabs.map((tab) => {
                if (tab.key !== target.key) {
                    if (target.tabIndex <= tab.tabIndex) {
                        tab.tabIndex -= 1;
                    }

                    newTabs.push(tab);
                }
            });

            this._updateTabs(newTabs);
        }

        public createNewTab(tabType: MyTabType = 'undefined'): void {
            const newTab: Tab = new Tab();
            newTab.type = tabType;

            let targetExtension = '';

            switch (tabType) {
                case 'txt': {
                    newTab.fileName += '.txt';
                    targetExtension = '.txt';
                    break;
                }
            }

            newTab.fileName = newTab.fileName.replace(`${targetExtension}${targetExtension}`, targetExtension);

            const newTabs: MyTab[] = [...tabs, newTab];

            this._updateTabs(newTabs);
        }

        public updateTab(target: MyTab): void {
            let newTabs: MyTab[] = [];

            const tabs = window.tabs;

            tabs.map((tab) => {
                if (tab.key === target.key) {
                    newTabs.push(target);
                } else if (tab.key !== target.key) {
                    newTabs.push(tab);
                }
            });

            this._updateTabs(newTabs);
        }

        private _updateTabs (newTabs: MyTab[]): void {
            window.tabs = newTabs;
            setTabs(newTabs);
            setToLocalStorage(window.tabs);
        }
    };

    const tc = new TabsControler();

    class Tab implements MyTab {
        public key: string='';
        public path: string = '';
        public fileName: string = 'unsaved';
        public type: MyTabType = 'undefined';
        public data: string = 'hogehoge\npiyopiyo\nfugafuga';
        public tabIndex: number = tabs.length + 1;

        constructor (myTab?: MyTab, ) {
            if (myTab !== undefined) {
                this.path = myTab.path;
                this.fileName = myTab.fileName;
                this.type = myTab.type;
                this.data = myTab.data;
            }
            this._creatKey();
        }

        public closeTab (): void {
            tc.closeTab(this);
        }

        public fromMyTab(myTab: MyTab): void {
            this.key = myTab.key;
            this.path = myTab.path;
            this.fileName = myTab.fileName;
            this.type = myTab.type;
            this.data = myTab.data;
            this.tabIndex = myTab.tabIndex;
        }

        public updateData (data: string): void {
            this.data = data;
            tc.updateTab(this);
        }

        public updateFileName (fileName: string): void {
            this.fileName = fileName;
            this._updateType(fileName);
            tc.updateTab(this);
        }

        private _creatKey (): void {
            const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
            const getRandom = () => {
                return Math.floor(Math.random() * 25);
            };

            let key = '';

            for (let i = 0; i < 16; i++) {
                const pos: number = getRandom();
                key += `${ALPHABET.charAt(pos)}`;
            }

            const isDuplicated = (key: string): boolean => {
                let duplicated: boolean = false;

                tabs.map((tab) => {
                    if (tab.key === key) {
                        duplicated = true;
                    }
                });

                return duplicated;
            };

            if (isDuplicated(key)) {
                this._creatKey();
            }

            this.key = key;
        }

        private _updateType (fn: string): void {
            const regs = {
                text: /.txt$/
            }

            switch (true) {
                case regs.text.test(fn): {
                    this.type = 'txt';
                    return;
                }
                default: {
                    this.type = 'undefined';
                    return;
                }
            }
        }
    };    

    useEffect(() => {
        document.addEventListener(R.eventType.COMPLETE_LOAD, onCompleteLoad);
        WindowHandler.observe();

        return () => {
            document.removeEventListener(R.eventType.COMPLETE_LOAD, onCompleteLoad);
            WindowHandler.off();
        };
    });

    if (!completedLoad) {
        return <>
            <Loading tc={tc}/>
            <StyleVariables />
        </>
    }

    const toTabs = (myTabs: MyTab[]): Tab[] => {
        const tabs: Tab[] = [];

        myTabs.map((myTab) => {
            const tab: Tab = new Tab();
            tab.fromMyTab(myTab);
            tabs.push(tab);
        });

        return tabs;
    };

    return <Context.Provider value={{}}>
        <Header key='header'/>
        <Wrapper key='wrapper' tabs={tabs} tc={tc} toTabs={toTabs}/>
        <Footer key='footer'/>      
        <StyleVariables />
    </Context.Provider>
}

interface MyEditorProps {}

export default MyEditor;

class WindowHandler {
    private static readonly _WINDOW = Channel.toRenderer.window;
    private static readonly _FULLSCREEN = 'fullscreen';
    private static readonly _MAXIMIZED = 'maximized'

    public static observe (): void {
        window.ipc.on(WindowHandler._WINDOW.POST_ENTER_FULLSCREEN, WindowHandler._enterFullscreen.bind(WindowHandler));
        window.ipc.on(WindowHandler._WINDOW.POST_LEAVE_FULLSCREEN, WindowHandler._leaveFullscreen.bind(WindowHandler));
        window.ipc.on(WindowHandler._WINDOW.POST_MAXIMIZED, WindowHandler._maximized.bind(WindowHandler));
        window.ipc.on(WindowHandler._WINDOW.POST_UNMAXIMIZED, WindowHandler._unmaximized.bind(WindowHandler));
    }

    public static off (): void {
        window.ipc.removeAllListeners(WindowHandler._WINDOW.POST_ENTER_FULLSCREEN);
        window.ipc.removeAllListeners(WindowHandler._WINDOW.POST_LEAVE_FULLSCREEN);
        window.ipc.removeAllListeners(WindowHandler._WINDOW.POST_MAXIMIZED);
        window.ipc.removeAllListeners(WindowHandler._WINDOW.POST_UNMAXIMIZED);
    }

    private static _enterFullscreen (ev: IREvent) {
        document.body.classList.add(WindowHandler._FULLSCREEN);
    }

    private static _leaveFullscreen (ev: IREvent) {
        document.body.classList.remove(WindowHandler._FULLSCREEN);
    }

    private static _maximized (ev: IREvent) {
        document.body.classList.add(WindowHandler._MAXIMIZED);
    }

    private static _unmaximized (ev: IREvent) {
        document.body.classList.remove(WindowHandler._MAXIMIZED);
    }
};