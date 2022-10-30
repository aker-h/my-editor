/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/promise.ts":
/*!****************************!*\
  !*** ./src/lib/promise.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    ANY: async (anything) => { return (new Promise((resolve) => { resolve(anything); })); },\n    BOOL: (boo) => { return (new Promise((resolve) => { resolve(boo); })); },\n    NULL: new Promise((resolve) => { resolve(null); }),\n    NUM: (num) => { return (new Promise((resolve) => { resolve(num); })); },\n    OBJ: (obj) => { return (new Promise((resolve) => { resolve(obj); })); },\n    STR: (str) => { return (new Promise((resolve) => { resolve(str); })); },\n    STRINGS: (strs) => { return (new Promise((resolve) => { resolve(strs); })); },\n    TABS: (tabs) => { return (new Promise((resolve) => { resolve(tabs); })); },\n    UNDEFINED: () => { return (new Promise((resolve) => { resolve(undefined); })); },\n    VOID: new Promise((resolve) => { resolve(); }),\n});\n\n\n//# sourceURL=webpack://myeditor/./src/lib/promise.ts?");

/***/ }),

/***/ "./src/lib/resource.ts":
/*!*****************************!*\
  !*** ./src/lib/resource.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    eventType: {\n        COMPLETE_LOAD: 'completeload',\n        SET_STATUS_TEXT: 'setstatustext'\n    }\n});\n\n\n//# sourceURL=webpack://myeditor/./src/lib/resource.ts?");

/***/ }),

/***/ "./src/preload/lib/ipc-api.ts":
/*!************************************!*\
  !*** ./src/preload/lib/ipc-api.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ IpcApi)\n/* harmony export */ });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var LIB_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! LIB/promise */ \"./src/lib/promise.ts\");\n/* harmony import */ var LIB_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! LIB/resource */ \"./src/lib/resource.ts\");\n/* harmony import */ var PRE_LIB_ipc_channel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! PRE_LIB/ipc-channel */ \"./src/preload/lib/ipc-channel.ts\");\n\n\n\n\nclass IpcApi {\n    constructor() {\n        this._LOG_DEBUG = true;\n        this.boot = new class Boot {\n            constructor() {\n                this._CHANNEL = PRE_LIB_ipc_channel__WEBPACK_IMPORTED_MODULE_3__[\"default\"].toMain.boot;\n                this._postedReady = false;\n                this._postedShow = false;\n                this.postReady = () => {\n                    if (!this._postedReady) {\n                        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_READY);\n                        this._postedReady = true;\n                    }\n                };\n                this.postShow = () => {\n                    if (!this._postedShow) {\n                        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_SHOW);\n                        this._postedShow = true;\n                    }\n                };\n                this.requestExtensions = () => {\n                    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.REQUEST_EXTENSIONS);\n                };\n            }\n        }();\n        this.window = new class Window {\n            constructor() {\n                this._CHANNEL = PRE_LIB_ipc_channel__WEBPACK_IMPORTED_MODULE_3__[\"default\"].toMain.window;\n                this.postClose = () => {\n                    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_CLOSE);\n                };\n                this.postMaximize = () => {\n                    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_MAXIMIZE);\n                };\n                this.postMinimize = () => {\n                    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_MINIMIZE);\n                };\n                this.postUnmaximize = () => {\n                    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_UNMAXIMIZE);\n                };\n                this.requestInitWinSize = async () => {\n                    await electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke(this._CHANNEL.INIT_SIZE);\n                    this._setStatusText('initializing window size.', 14);\n                    LIB_promise__WEBPACK_IMPORTED_MODULE_1__[\"default\"].VOID;\n                };\n            }\n            _setStatusText(statusText, fontSize = 20) {\n                document.dispatchEvent(new CustomEvent(LIB_resource__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventType.SET_STATUS_TEXT, {\n                    detail: { statusText: statusText, fontSize: fontSize }\n                }));\n            }\n        }();\n        this.on = (channel, callback) => {\n            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.addListener(channel, (event, args) => {\n                callback(event, args);\n            });\n            IpcApi._channels.push(channel);\n            this._debugLog('on', channel);\n        };\n        this.removeAllListeners = (channel) => {\n            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeAllListeners(channel);\n            IpcApi._channels.splice(IpcApi._channels.indexOf((channel)), 1);\n            this._debugLog('off', channel);\n        };\n        this.temp = (width, height) => {\n            //main-ipc-handle.ts\n            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(PRE_LIB_ipc_channel__WEBPACK_IMPORTED_MODULE_3__[\"default\"].toMain.TEMP, width, height);\n        };\n        this._debugLog = (action, channel) => {\n            if (this._LOG_DEBUG === false)\n                return;\n            const WIDTH = 30;\n            const makeBoarder = (topOrBottm) => {\n                switch (topOrBottm) {\n                    case 'top': {\n                        return '┌ACTIVE_LISTENERS──────────────┐\\n';\n                    }\n                    case 'bottom': {\n                        return '└──────────────────────────────┘\\n';\n                    }\n                }\n            };\n            const makeBlank = (channelLength) => {\n                let blank = '';\n                const blankLength = WIDTH - channelLength;\n                for (let i = 0; i < blankLength; i++) {\n                    blank += ' ';\n                }\n                return blank;\n            };\n            const rows = (() => {\n                let result = '';\n                IpcApi._channels.map((channel) => {\n                    result += `│${channel}${makeBlank(channel.length)}|\\n`;\n                });\n                return result;\n            })();\n            const table = `${makeBoarder('top')}${rows}${makeBoarder('bottom')}`;\n            console.log(`${table}${action}: ${channel}`);\n        };\n    }\n}\nIpcApi.API_KEY = 'ipc';\nIpcApi._channels = [];\n(() => {\n    electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld(IpcApi.API_KEY, new IpcApi());\n})();\n\n\n//# sourceURL=webpack://myeditor/./src/preload/lib/ipc-api.ts?");

/***/ }),

/***/ "./src/preload/lib/ipc-channel.ts":
/*!****************************************!*\
  !*** ./src/preload/lib/ipc-channel.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    toMain: {\n        TEMP: 'TEMP',\n        boot: {\n            POST_READY: 'POST_READY',\n            POST_SHOW: 'POST_SHOW',\n            REQUEST_EXTENSIONS: 'REQUEST_EXTENSIONS'\n        },\n        window: {\n            INIT_SIZE: 'INIT_SIZE',\n            POST_CLOSE: 'POST_CLOSE',\n            POST_MAXIMIZE: 'POST_MAXIMIZE',\n            POST_MINIMIZE: 'POST_MINIMIZE',\n            POST_UNMAXIMIZE: 'POST_UNMAXIMIZE'\n        }\n    },\n    toRenderer: {\n        window: {\n            POST_ENTER_FULLSCREEN: 'POST_ENTER_FULLSCREEN',\n            POST_LEAVE_FULLSCREEN: 'POST_LEAVE_FULLSCREEN',\n            POST_MAXIMIZED: 'POST_MAXIMIZED',\n            POST_UNMAXIMIZED: 'POST_UNMAXIMIZED'\n        }\n    }\n});\n\n\n//# sourceURL=webpack://myeditor/./src/preload/lib/ipc-channel.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/preload/lib/ipc-api.ts");
/******/ 	
/******/ })()
;