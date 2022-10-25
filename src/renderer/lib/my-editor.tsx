import React, { useState, useEffect } from 'react';

import Loading from 'COMPONENTS/loading';
import Header from 'COMPONENTS/header';
import Wrapper from 'COMPONENTS/wrapper';
import Footer from 'COMPONENTS/footer';

let booted: boolean = false;

const MyEditor = (props: MyEditorProps): JSX.Element => {
    const [completedLoad, setCompletedLoad] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(32);
    const [footerHeight, setFooterHeight] = useState(32);

    const completeLoad = (): void => { setCompletedLoad(true); };

    useEffect(() => {
        if (booted) {
            return;
        } 

        window.ipc.postReady();

        booted = true;
    });

    if (!completedLoad) {
        return <Loading completeLoad={completeLoad}/>
    }

    return <>
        <Header/>
        <Wrapper/>
        <Footer/>
        <style>{fixStyle(`
            div.react-outer {
                --header-height: ${headerHeight}px;
                --footer-height: ${footerHeight}px;
            }
        `)}</style>
    </>
}

function fixStyle (style: string): string {
    const lines = style.replace(/\n\n/g, '\n').split('\n');

    let result = '';

    lines.map((line, i) => {
        line = line.trim().replace(/--/, '\t--');

        if (i !== lines.length - 1) {
            line += '\n';
        }

        result += `\t${line}`;
    });

    return result;
}

interface MyEditorProps {}

export default MyEditor;