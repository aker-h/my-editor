interface MyTab {
    key: string;
    path: string;
    fileName: string;
    type: MyTabType;
    data: string;
    tabIndex: number
    
    closeTab? (): void;
    fromMyTab? (myTab: MyTab): MyTab
    updateData? (data: string): void;
    updateFileName? (fileName: string): void;
    setFileName? (filename: string): void;
    toMyTab?(): MyTab
}

type MyTabType = 'undefined' | 'txt';