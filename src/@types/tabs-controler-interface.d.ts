interface TabsControllerInterface {
    addTab (target: MyTab): void;
    closeTab (target: MyTab): void;
    createNewTab (tabType?: MyTabType): void;
    updateFileName(tabKey: string, fileName: string): void;
    updateTab (target: MyTab): void;
    sortTab (movingKey: string, targetKey: string, sortPositon: 'before' | 'after'): void;
}