export default {
    toMain: {
        TEMP: 'TEMP',
        boot: {
            POST_READY: 'POST_READY',
            POST_SHOW: 'POST_SHOW'
        },
        window: {
            INIT_SIZE: 'INIT_SIZE',
            POST_CLOSE: 'POST_CLOSE',
            POST_MAXIMIZE: 'POST_MAXIMIZE',
            POST_MINIMIZE: 'POST_MINIMIZE',
            POST_UNMAXIMIZE: 'POST_UNMAXIMIZE'
        }
    },
    toRenderer: {
        window: {
            POST_ENTER_FULLSCREEN: 'POST_ENTER_FULLSCREEN',
            POST_LEAVE_FULLSCREEN: 'POST_LEAVE_FULLSCREEN',
            POST_MAXIMIZED: 'POST_MAXIMIZED',
            POST_UNMAXIMIZED: 'POST_UNMAXIMIZED'
        }
    }
};