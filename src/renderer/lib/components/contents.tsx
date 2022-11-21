import React, { useState, useRef, MutableRefObject, MouseEvent, useEffect } from 'react';

import TabBar from 'COMPONENTS/tab-bar';
import TabLabel, { DebugInterface } from 'COMPONENTS/tab-label';
import PaneText from 'COMPONENTS/pane/pane-text';

let booted: boolean = false;

const Contents = (p: {}): JSX.Element => {
    const [tabs, setTabs] = useState(myTabsToTabs(window.tabs) as MyTab[] | Tab[]);

    const setToLocalStorage = (tabs: MyTab[]) => {
        window.localStorage.setItem('tabs', JSON.stringify(tabs));
    };

    class TabsControler implements TabsControllerInterface {
        addTab (target: MyTab): void {}

        closeTab (target: MyTab): void {
            const newTabs: Tab[] = [];

            window.tabs.map((myTab) => {
                if (target.key !== myTab.key) {
                    newTabs.push(new Tab(myTab));
                }
            });

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

        public updateFileName(tabKey: string, fileName: string): void {
            let newTabs: Tab[] = [];
            
            window.tabs.map((myTab) => {
                const tab: Tab = new Tab(myTab);

                if (tab.key === tabKey) {
                    tab.updateFileName(fileName);
                }

                newTabs.push(tab);
            });

            this._updateTabs(newTabs);
        }

        updateTab (target: MyTab): void {}

        public sortTab (movingKey: string, targetKey: string, sortPositon: 'before' | 'after'): void {
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
    
    closeTab? (): void;
    fromMyTab? (myTab: MyTab): MyTab;
    updateData? (data: string): void;
    
    public updateFileName (fileName: string): void {
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

class C {
    public static TabBar (props: TabBarProps): JSX.Element {
        class CreatTabButtonHandler {
            public ref = useRef() as MutableRefObject<HTMLElement>;
            
            private readonly _FILLED: string = 'bi bi-file-earmark-plus-fill';
            private readonly _NON_FILLED: string = 'bi bi-file-earmark-plus';
            
            public onClick (ev: MouseEvent<HTMLDivElement>): void {
                this._createNewTab();
            }
    
            public onMouseOver (ev: MouseEvent<HTMLDivElement>): void {
                this._toggleFilled(true);
            }
    
            public onMouseLeave (ev: MouseEvent<HTMLDivElement>): void {
                this._toggleFilled(false);
            }
    
            private _createNewTab (): void {
                window.tc.createNewTab();
            }
    
            private _toggleFilled (filled: boolean): void {
                const target: HTMLElement = this.ref.current!;
    
                if (filled) {
                    target.className = this._FILLED;
                } else if (!filled) {
                    target.className = this._NON_FILLED;
                }
            }
        };
    
        const ctbh = new CreatTabButtonHandler();
    
        return <div className='tab-bar'>
            <div className='tab-bar-blank left'></div>
            {props.children}
            <div className='tab-bar-blank right'>
                <div className='create-tab-button-outer'>
                    <div className='create-tab-button-inner'
                        onClick={ctbh.onClick.bind(ctbh)}
                        onMouseLeave={ctbh.onMouseLeave.bind(ctbh)}
                        onMouseOver={ctbh.onMouseOver.bind(ctbh)}                    
                    >
                        <i className="bi bi-file-earmark-plus" ref={ctbh.ref}/>
                    </div>
                </div>
            </div>
        </div>
    }

    public static TabLabelsOuter (props: TabLabelsOuterProps): JSX.Element {
        const refTlo = useRef() as MutableRefObject<HTMLDivElement>;

        useEffect(() => {
            const widthTabLabelsOuter: number = ((tabLabelsOuter: HTMLDivElement): number => {
                let width: number = 0;

                const tabLabels: HTMLDivElement[] = Array.from(tabLabelsOuter.children) as HTMLDivElement[];

                tabLabels.map((tabLabel) => {
                    width += tabLabel.offsetWidth;
                });

                return width;
            })(refTlo.current!);

            window.sApi.updateWidthTabLabelsOuter(widthTabLabelsOuter);
        });

        return <div className='tab-labels-outer' ref={refTlo}>
            {props.children}
        </div>
    }

    public static PanesOuter (props: PanesOuterProps): JSX.Element {
        return <div className='panes-outer'>
            {props.children}
        </div>
    }
};

interface TabBarProps {
    children: JSX.Element;
}

interface TabLabelsOuterProps {
    children: JSX.Element
}

interface PanesOuterProps {
    children: JSX.Element
}