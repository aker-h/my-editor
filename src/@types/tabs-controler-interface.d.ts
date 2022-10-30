interface TabsControllerInterface {
    addTab (target: MyTab): void;
    closeTab (target: MyTab): void;
    createNewTab (tabType?: MyTabType): void;
    updateTab (target: MyTab): void;
}