interface MyTab {
    key: string;
    path: string;
    fileName: string;
    type: MyTabType;
    data: string;    
    
    updateData? (data: string): void;
    updateFileName? (fileName: string): void;
    setFileName? (filename: string): void;
    toMyTab?(): MyTab
}

type MyTabType = 'undefined' | 'txt';