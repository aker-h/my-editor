import React, { MutableRefObject, useRef, MouseEvent, useEffect } from 'react';

import log from 'LIB/log';

const Header = (props: HeaderProps): JSX.Element => {
    const minbh = new class MinimizeButtonHandler {
        public ref: MutableRefObject<HTMLDivElement>

        constructor () {
            this.ref = useRef() as MutableRefObject<HTMLDivElement>;
        }

        public onClick (ev: MouseEvent<HTMLDivElement>): void {
            window.ipc.window.postMinimize();
        }
    }();

    const maxbh = new class MaximizeButtonHandler {
        public ref: MutableRefObject<HTMLDivElement>

        constructor () {
            this.ref = useRef() as MutableRefObject<HTMLDivElement>;
        }

        public onClick (ev: MouseEvent<HTMLDivElement>): void {
            if (this._windowIsMaximized()) {
                window.ipc.window.postUnmaximize();
                return;
            }
            
            window.ipc.window.postMaximize();
        }

        private _windowIsMaximized (): boolean {
            return document.body.classList.contains('maximized');
        }
    }();

    const cbh = new class CloseButtonHandler {
        public ref: MutableRefObject<HTMLDivElement>

        constructor () {
            this.ref = useRef() as MutableRefObject<HTMLDivElement>;
        }

        public onClick (ev: MouseEvent<HTMLDivElement>): void {
            window.ipc.window.postClose();
        }
    }();

    useEffect(() => {
        log.event('Header have been rendered.')
    });

    return <div className='header'>
        <div className='header-inner'>
            <div className='header-draggable-area'></div>
            <div className='navigate-buttons'>
                <div className='navi-btn minimize' ref={minbh.ref} onClick={minbh.onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                    </svg>
                </div>
                <div className='navi-btn maximize' ref={maxbh.ref} onClick={maxbh.onClick.bind(maxbh)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>
                </div>
                <div className='navi-btn close' ref={cbh.ref} onClick={cbh.onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                    </svg>
                </div>
            </div>
        </div>        
    </div>
}

interface HeaderProps {};

export default Header;