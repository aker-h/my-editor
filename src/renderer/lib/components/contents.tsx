import React, { FC, useRef, MutableRefObject, MouseEvent, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TabLabel, { DebugInterface } from 'COMPONENTS/tab-label';
import PaneText from 'COMPONENTS/pane/pane-text';

let booted: boolean = false;

const Contents: FC<ContentsProps> = (props: ContentsProps) => {
    const tabs: MyTab[] = props.tabs;

    return <div className="contents">
        <TabBar tc={props.tc}>
            <DndProvider backend={HTML5Backend}>
                <TabLabelsOuter><>{
                    tabs.map((tab) => {
                        return <TabLabel 
                                key={`tab-${tab.key}`}
                                fileName={tab.fileName}
                                type={tab.type}
                                closeTab={tab.closeTab!.bind(tab)}
                                updateFileName={tab.updateFileName!.bind(tab)}
                        />            
                    })
                }</></TabLabelsOuter>
            </DndProvider>
        </TabBar>        
        <PanesOuter><>{
            tabs.map((tab) => {
                switch (tab.type) {
                    case 'txt':
                    default : {
                        return <PaneText 
                            key={`pane-${tab.key}`} 
                            _key={`pane-${tab.key}`} 
                            data={tab.data}
                            updateData={tab.updateData!.bind(tab)}
                        />
                    }
                }
            })
        }</></PanesOuter>
    </div>
}

interface ContentsProps {
    tabs: MyTab[],
    tc: TabsControllerInterface
}

export default Contents;

const TabBar = (props: TabBarProps): JSX.Element => {
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
            props.tc.createNewTab();
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

const TabLabelsOuter = (props: TabLabelsOuterProps): JSX.Element => {
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

const PanesOuter = (props: PanesOuterProps): JSX.Element => {
    return <div className='panes-outer'>
        {props.children}
    </div>
}

interface TabBarProps {
    children: JSX.Element,
    tc: TabsControllerInterface
}

interface TabLabelsOuterProps {
    children: JSX.Element
}

interface PanesOuterProps {
    children: JSX.Element
}