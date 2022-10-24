const path = require('path');

const ALIAS = {
    'SRC': path.resolve(__dirname, 'src'),
    'APP': path.resolve(__dirname, 'src', 'application'),
    'APP_LIB': path.resolve(__dirname, 'src', 'application', 'lib'),
    'PRELOAD': path.resolve(__dirname, 'src', 'preload'),
    'PRE_LIB': path.resolve(__dirname, 'src', 'preload', 'lib'),
    'RENDERER': path.resolve(__dirname, 'src', 'renderer'),
    'REN_LIB': path.resolve(__dirname, 'src', 'renderer', 'lib'),
    'LIB': path.resolve(__dirname, 'src', 'lib')
};

const MODE = 'development';
//const MODE = 'product';

const main = {
    mode: MODE,
    target: 'electron-main',
    entry: path.join(__dirname, 'src', 'application', 'main.ts'),
    output: {
        filename: 'application.js',
        path: path.resolve(__dirname, 'src', 'application')
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [{
            test: /.ts$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ],
            loader: 'ts-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: ALIAS
    }
};

const preload = {
    mode: MODE,
    target: 'electron-preload',
    entry: path.resolve(__dirname, 'src', 'preload', 'ipc-api.ts'),
    output: {
        filename: 'preload.js',
        path: path.resolve(__dirname, 'src', 'preload')
    },
    module: {
        rules: [{
            test: /.ts$/,
            exclude: /node_modules/,
            use: 'ts-loader',
            include: path.resolve(__dirname, 'src')
        }]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: ALIAS
    }
}

module.exports = [
    main, preload
]