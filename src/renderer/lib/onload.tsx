import $ from 'jquery';
import React from 'react';
import { Root, createRoot } from 'react-dom/client'

import MyEditor from 'REN_LIB/my-editor';

$(async () => {
    window.exApi.asset.install();

    window.exApi.asset.install = () => {};

    window.tabs = [];

    const reactOuter: HTMLDivElement = document.querySelector('#reactOuter') as HTMLDivElement;
    const root: Root = createRoot(reactOuter);
    root.render(<MyEditor />);
});