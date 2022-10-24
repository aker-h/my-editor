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

/***/ "./src/application/lib/get-init-window-props.ts":
/*!******************************************************!*\
  !*** ./src/application/lib/get-init-window-props.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getInitWindowProps)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n\r\nfunction getInitWindowProps(OS) {\r\n    const initWindowProps = {\r\n        frame: false,\r\n        resizable: false,\r\n        show: true,\r\n        webPreferences: {\r\n            nodeIntegration: false,\r\n            contextIsolation: true,\r\n            preload: path__WEBPACK_IMPORTED_MODULE_0___default().resolve(__dirname, '..', '..', '..', 'preload', 'preload.js')\r\n        },\r\n        minHeight: 49,\r\n        darkTheme: true\r\n    };\r\n    switch (OS) {\r\n        case 'win32': {\r\n            // initWindowProps.webPreferences!.preload = ''\r\n            break;\r\n        }\r\n    }\r\n    return initWindowProps;\r\n}\r\n\n\n//# sourceURL=webpack://myeditor/./src/application/lib/get-init-window-props.ts?");

/***/ }),

/***/ "./src/application/lib/get-os.ts":
/*!***************************************!*\
  !*** ./src/application/lib/get-os.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getOS)\n/* harmony export */ });\nfunction getOS() {\r\n    const OS = process.platform;\r\n    return OS;\r\n}\r\n\n\n//# sourceURL=webpack://myeditor/./src/application/lib/get-os.ts?");

/***/ }),

/***/ "./src/application/main.ts":
/*!*********************************!*\
  !*** ./src/application/main.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var APP_LIB_get_os__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! APP_LIB/get-os */ \"./src/application/lib/get-os.ts\");\n/* harmony import */ var APP_LIB_get_init_window_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! APP_LIB/get-init-window-props */ \"./src/application/lib/get-init-window-props.ts\");\n\r\n\r\n\r\nclass Main {\r\n    static async main() {\r\n        Main.os = (0,APP_LIB_get_os__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n        Main.windowProps = (0,APP_LIB_get_init_window_props__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Main.os);\r\n        Main.initApplication();\r\n    }\r\n    static initApplication() {\r\n        const WINDOW_ALL_CLOSED = 'window-all-closed';\r\n        const READY = 'ready';\r\n        const ACTIVATE = 'activate';\r\n        const onWindowAllClosed = () => {\r\n            Main.APP.quit();\r\n        };\r\n        const create = () => {\r\n            Main.window = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow(Main.windowProps);\r\n            Main.window.loadURL(Main.URL);\r\n            const CLOSED = 'closed';\r\n            const onClosed = () => { Main.window = null; };\r\n            Main.window.on(CLOSED, onClosed.bind(Main));\r\n        };\r\n        const onActivate = () => {\r\n            if (Main.window === null) {\r\n                create();\r\n            }\r\n        };\r\n        Main.APP.on(WINDOW_ALL_CLOSED, onWindowAllClosed.bind(Main));\r\n        Main.APP.on(READY, create.bind(Main));\r\n        Main.APP.on(ACTIVATE, onActivate.bind(Main));\r\n    }\r\n}\r\nMain.URL = `file://${__dirname}/../renderer/index.html`;\r\nMain.APP = electron__WEBPACK_IMPORTED_MODULE_0__.app;\r\nMain.os = null;\r\nMain.window = null;\r\nMain.windowProps = null;\r\nMain.main();\r\n\n\n//# sourceURL=webpack://myeditor/./src/application/main.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/application/main.ts");
/******/ 	
/******/ })()
;