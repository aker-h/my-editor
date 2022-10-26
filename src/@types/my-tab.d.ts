interface MyTab {
    path: string;
    fileName: string;
    type: MyTabType;
    data: string;
}

type MyTabType = 'undefined' | 'txt';