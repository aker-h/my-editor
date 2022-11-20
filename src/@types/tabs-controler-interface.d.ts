interface TabsControllerInterface {
    addTab (target: MyTab): void;
    closeTab (target: MyTab): void;
    createNewTab (tabType?: MyTabType): void;
    updateFileName(tabKey: string, fileName: string): void;
    updateTab (target: MyTab): void;
    sortTab (targetTabIndex: number, to: number): void;
}