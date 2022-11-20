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

            const newTabs: MyTab[] = [...window.tabs, newTab];

            this._updateTabs(newTabs);
        }

        public updateFileName(tabKey: string, fileName: string): void {
            const targetTab: MyTab | null = this._getTabByTabKey(tabKey);

            if (targetTab === null) return;

            targetTab.updateFileName!(fileName);

            this.updateTab(targetTab);
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

        public sortTab(targetTabIndex: number, to: number): void {
            const isToLeft = (targetTabIndex: number): boolean => {
                if (to < targetTabIndex) {
                    return true;
                }
                return false;
            };            

            const isToRight = (targetTabIndex: number): boolean => {
                if (targetTabIndex < to) {
                    return true;
                }
                return false;
            };

            const newTabs: MyTab[] = [];
            const targetTab: MyTab | null = this._getTabByTabIndex(targetTabIndex);

            if (targetTab === null) return;

            const tabs = window.tabs;

            if (isToLeft(targetTabIndex)) {
                tabs.map((tab: MyTab): void => {
                    if (tab.tabIndex < to || targetTabIndex < tab.tabIndex) {
                        newTabs.push(tab);
                    } else if (tab.tabIndex === to) {
                        const clonedTarget: MyTab = {
                            key: targetTab.key,
                            tabIndex: to,
                            type: targetTab.type,
                            path: targetTab.path,
                            fileName: targetTab.fileName,
                            data: targetTab.data
                        };    
                        newTabs.push(clonedTarget);

                        tab.tabIndex += 1;
                        newTabs.push(tab);
                    } else if (to <= tab.tabIndex && tab.tabIndex < targetTabIndex) {
                        tab.tabIndex++;
                        newTabs.push(tab);
                    }
                });
                this._updateTabs(newTabs);
            } else if (isToRight(targetTabIndex)) {
                tabs.map((tab: MyTab): void => {
                    if (tab.tabIndex < targetTabIndex) {
                        newTabs.push (tab);
                        return;
                    } else if (tab.tabIndex === targetTabIndex) {
                        const clonedTarget: MyTab = {
                            key: targetTab.key,
                            tabIndex: to,
                            type: targetTab.type,
                            path: targetTab.path,
                            fileName: targetTab.fileName,
                            data: targetTab.data
                        };
                        newTabs.push(clonedTarget);
                        return;
                    } else if (targetTabIndex < tab.tabIndex && tab.tabIndex < to) {
                        tab.tabIndex -= 1;
                        newTabs.push(tab);
                        return;
                    } else if (to <= tab.tabIndex) {
                        tab.tabIndex += 1;
                        newTabs.push(tab);
                        return;
                    }
                });
                this._updateTabs(newTabs);
            }
        }

        private _getTabByTabIndex (targetTabIndex: number): MyTab | null {
            let targetTab: MyTab | null = null;

            window.tabs.map((tab) => {
                if (tab.tabIndex === targetTabIndex) {
                    targetTab = tab;
                }
            });

            return targetTab;
        }

        private _getTabByTabKey (targetTabKey: string): MyTab | null {
            let targetTab: MyTab | null = null;

            const tabs: MyTab[] = window.tabs;

            tabs.map((tab) => {
                if (tab.key === targetTabKey) {
                    targetTab = tab;
                }
            });

            return targetTab;
        }

        private _updateTabs (newTabs: MyTab[]): void {
            window.tabs = newTabs.sort((a, b) => {
                if (a.tabIndex < b.tabIndex) return -1;
                if (a.tabIndex > b.tabIndex) return 1;
                return 0;
            });

            tabs.map((tab, i) => {
                tab.tabIndex = i + 1;
            });

            setTabs(newTabs);
            setToLocalStorage(window.tabs);
        }
    };

    window.tc = new TabsControler();

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
            window.tc.closeTab(this);
        }

        public fromMyTab(myTab: MyTab): Tab {
            this.key = myTab.key;
            this.path = myTab.path;
            this.fileName = myTab.fileName;
            this.type = myTab.type;
            this.data = myTab.data;
            this.tabIndex = myTab.tabIndex;
            return this;
        }

        public updateData (data: string): void {
            this.data = data;
            window.tc.updateTab(this);
        }

        public updateFileName (fileName: string): void {
            this.fileName = fileName;
            this._updateType(fileName);
        }

        public toMyTab(): MyTab {
            const myTab: MyTab = {
                key: this.key,
                path: this.path,
                fileName: this.fileName,
                type: this.type,
                data: this.data,
                tabIndex: this.tabIndex
            };
            return myTab;
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
            <Loading/>
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
        <Wrapper key='wrapper' tabs={tabs} toTabs={toTabs}/>
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