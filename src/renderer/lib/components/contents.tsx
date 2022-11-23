import React, { useState } from 'react';

import TabBar from 'COMPONENTS/tab-bar';
import PanesOuter from 'COMPONENTS/panes-outer';

const Contents = (p: {}): JSX.Element => {
    const [tabs, setTabs] = useState(myTabsToTabs(window.tabs) as MyTab[] | Tab[]);

    const setToLocalStorage = (tabs: MyTab[]) => {
        window.localStorage.setItem('tabs', JSON.stringify(tabs));
    };

    class TabsControler implements TabsControllerInterface {
        addTab (target: MyTab): void {}

        public closeTab (target: MyTab): void {
            const newTabs: Tab[] = [];

            window.tabs.map((myTab) => {
                if (target.key !== myTab.key) {
                    newTabs.push(new Tab(myTab));
                }
            });

            window.sApi.removeHeightTextPaneDivPropByKey(target.key);

            this._updateTabs(newTabs);
        }

        public createNewTab (tabType: MyTabType): void {
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

        public updateTab (target: MyTab): void {
            const newTabs: MyTab[] = [];

            window.tabs.map((tab) => {
                newTabs.push((tab.key === target.key)? target: tab);
            });

            this._updateTabs(newTabs);
        }

        public sortTab (movingKey: string, targetKey: string, sortPositon: 'before' | 'after'): void {
            if (movingKey === targetKey) {
                return;
            }

            const newTabs: Tab[] = [];

            window.tabs.map((myTab) => {
                //動かすタブのキーと一致しないときのみpush
                if (myTab.key !== movingKey) {
                    if (myTab.key === targetKey && sortPositon === 'before') {
                        newTabs.push(new Tab(this._getMyTabByKey(movingKey)!));
                    }

                    newTabs.push(new Tab(myTab));

                    if (myTab.key === targetKey && sortPositon === 'after') {
                        newTabs.push(new Tab(this._getMyTabByKey(movingKey)!));
                    }
                }
            });

            this._updateTabs(newTabs);
        }

        private _getMyTabByKey (key: string): MyTab | null {
            let tab: MyTab | null = null;

            window.tabs.map((myTab) => {
                if (myTab.key === key) {
                    tab = myTab;
                }
            });

            return tab;
        }

        private _updateTabs (tabs: MyTab[]): void {
            window.tabs = [...tabs];
            setToLocalStorage(window.tabs);
            setTabs(window.tabs);
        }
    }

    window.tc = new TabsControler();

    return <div className='contents'>
        {/*タブバー*/}
        <TabBar tabs={tabs}/>
        {/*メインエリア*/}
        <PanesOuter tabs={tabs}/>
    </div>
}

function myTabsToTabs (myTabs: MyTab[]): Tab[] {
    let tabs: Tab[] = [];

    myTabs.map((myTab) => {
        tabs.push(new Tab(myTab));
    });

    return tabs;
}

class Tab implements MyTab {
    public key: string;
    public path: string = '';
    public fileName: string = 'unsaved';
    public type: MyTabType = 'undefined';
    public data: string = 'hogehoge\npiyopiyo\nfugafuga';

    constructor (myTab?: MyTab) {
        if (myTab !== undefined) {
            this.key = myTab.key;
            this.path = myTab.path;
            this.fileName = myTab.fileName;
            this.type = myTab.type;
            this.data = myTab.data;
        } else {
            this.key = this._createKey();
        }        
    }
    
    updateData? (data: string): void;

    public updateDataBeforeReRendering (): void { /*Pane内で定義*/ }
    
    public updateFileName (fileName: string): void {
        this.updateDataBeforeReRendering();
        this.fileName = fileName;
        this._updateType(fileName);
    }

    setFileName? (filename: string): void;
    toMyTab?(): MyTab

    private _createKey (): string {
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

                window.tabs.map((tab) => {
                    if (tab.key === key) {
                        duplicated = true;
                    }
                });

                return duplicated;
            };

            if (isDuplicated(key)) {
                return this._createKey();
            }

            return key;
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
}

export default Contents;