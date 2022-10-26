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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    ANY: (anything) => { return (new Promise((resolve) => { resolve(anything); })); },\r\n    BOOL: (boo) => { return (new Promise((resolve) => { resolve(boo); })); },\r\n    NULL: new Promise((resolve) => { resolve(null); }),\r\n    NUM: (num) => { return (new Promise((resolve) => { resolve(num); })); },\r\n    OBJ: (obj) => { return (new Promise((resolve) => { resolve(obj); })); },\r\n    STR: (str) => { return (new Promise((resolve) => { resolve(str); })); },\r\n    STRINGS: (strs) => { return (new Promise((resolve) => { resolve(strs); })); },\r\n    UNDEFINED: () => { return (new Promise((resolve) => { resolve(undefined); })); },\r\n    VOID: new Promise((resolve) => { resolve(); }),\r\n});\r\n\n\n//# sourceURL=webpack://myeditor/./src/lib/promise.ts?");

/***/ }),

/***/ "./src/lib/resource.ts":
/*!*****************************!*\
  !*** ./src/lib/resource.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    eventType: {\r\n        COMPLETE_LOAD: 'completeload',\r\n        SET_STATUS_TEXT: 'setstatustext'\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://myeditor/./src/lib/resource.ts?");

/***/ }),

/***/ "./src/preload/lib/ipc-api.ts":
/*!************************************!*\
  !*** ./src/preload/lib/ipc-api.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ IpcApi)\n/* harmony export */ });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var LIB_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! LIB/promise */ \"./src/lib/promise.ts\");\n/* harmony import */ var LIB_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! LIB/resource */ \"./src/lib/resource.ts\");\n/* harmony import */ var PRE_LIB_ipc_channnel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! PRE_LIB/ipc-channnel */ \"./src/preload/lib/ipc-channnel.ts\");\n\r\n\r\n\r\n\r\nclass IpcApi {\r\n    constructor() {\r\n        this.boot = new class Boot {\r\n            constructor() {\r\n                this._CHANNEL = PRE_LIB_ipc_channnel__WEBPACK_IMPORTED_MODULE_3__[\"default\"].toMain.boot;\r\n                this._postedReady = false;\r\n                this._postedShow = false;\r\n                this.postReady = () => {\r\n                    if (!this._postedReady) {\r\n                        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_READY);\r\n                        this._postedReady = true;\r\n                    }\r\n                };\r\n                this.postShow = () => {\r\n                    if (!this._postedShow) {\r\n                        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_SHOW);\r\n                        this._postedShow = true;\r\n                    }\r\n                };\r\n            }\r\n        }();\r\n        this.window = new class Window {\r\n            constructor() {\r\n                this._CHANNEL = PRE_LIB_ipc_channnel__WEBPACK_IMPORTED_MODULE_3__[\"default\"].toMain.window;\r\n                this.postClose = () => {\r\n                    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_CLOSE);\r\n                };\r\n                this.postMaximize = () => {\r\n                    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_MAXIMIZE);\r\n                };\r\n                this.postMinimize = () => {\r\n                    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_MINIMIZE);\r\n                };\r\n                this.postUnmaximize = () => {\r\n                    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(this._CHANNEL.POST_UNMAXIMIZE);\r\n                };\r\n                this.requestInitWinSize = async () => {\r\n                    await electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke(this._CHANNEL.INIT_SIZE);\r\n                    this._setStatusText('initializing window size.');\r\n                    LIB_promise__WEBPACK_IMPORTED_MODULE_1__[\"default\"].VOID;\r\n                };\r\n            }\r\n            _setStatusText(statusText) {\r\n                document.dispatchEvent(new CustomEvent(LIB_resource__WEBPACK_IMPORTED_MODULE_2__[\"default\"].eventType.SET_STATUS_TEXT, {\r\n                    detail: { statusText: statusText }\r\n                }));\r\n            }\r\n        }();\r\n        this.off = (channel, callbak) => {\r\n            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.off(channel, (event, args) => {\r\n                callbak(event, args);\r\n            });\r\n        };\r\n        this.on = (channnel, callback) => {\r\n            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channnel, (event, args) => {\r\n                callback(event, args);\r\n            });\r\n        };\r\n        this.once = (channnel, callback) => {\r\n            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.once(channnel, (event, args) => {\r\n                callback(event, args);\r\n            });\r\n        };\r\n        this.temp = (width, height) => {\r\n            //main-ipc-handle.ts\r\n            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(PRE_LIB_ipc_channnel__WEBPACK_IMPORTED_MODULE_3__[\"default\"].toMain.TEMP, width, height);\r\n        };\r\n    }\r\n}\r\nIpcApi.API_KEY = 'ipc';\r\n(() => {\r\n    electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld(IpcApi.API_KEY, new IpcApi());\r\n})();\r\n\n\n//# sourceURL=webpack://myeditor/./src/preload/lib/ipc-api.ts?");

/***/ }),

/***/ "./src/preload/lib/ipc-channnel.ts":
/*!*****************************************!*\
  !*** ./src/preload/lib/ipc-channnel.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    toMain: {\r\n        TEMP: 'TEMP',\r\n        boot: {\r\n            POST_READY: 'POST_READY',\r\n            POST_SHOW: 'POST_SHOW'\r\n        },\r\n        window: {\r\n            INIT_SIZE: 'INIT_SIZE',\r\n            POST_CLOSE: 'POST_CLOSE',\r\n            POST_MAXIMIZE: 'POST_MAXIMIZE',\r\n            POST_MINIMIZE: 'POST_MINIMIZE',\r\n            POST_UNMAXIMIZE: 'POST_UNMAXIMIZE'\r\n        }\r\n    },\r\n    toRenderer: {\r\n        window: {\r\n            POST_ENTER_FULLSCREEN: 'POST_ENTER_FULLSCREEN',\r\n            POST_LEAVE_FULLSCREEN: 'POST_LEAVE_FULLSCREEN',\r\n            POST_MAXIMIZED: 'POST_MAXIMIZED',\r\n            POST_UNMAXIMIZED: 'POST_UNMAXIMIZED'\r\n        }\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://myeditor/./src/preload/lib/ipc-channnel.ts?");

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