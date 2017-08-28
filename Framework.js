/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(1);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (global) {
    global.Framework = {
        create: function create(config) {
            return new _app2.default(config);
        }
    };
})(window);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App(config) {
        _classCallCheck(this, App);

        this.config = config;
        // this.startWatch();
    }

    _createClass(App, [{
        key: 'startWatch',
        value: function startWatch() {
            if (!this.latestData) {
                this.latestData = JSON.stringify(this.config.data);
            }

            if (JSON.stringify(this.config.data) !== this.latestData) {
                this.render(this.selector);
                console.log('currentActiveSelector', this.currentActiveSelector);
                document.querySelector(this.selector + ' ' + this.currentActiveSelector).focus();
                this.latestData = JSON.stringify(this.config.data);
            }

            requestAnimationFrame(this.startWatch.bind(this));
        }
    }, {
        key: 'replaceVars',
        value: function replaceVars(str) {
            var _this = this;

            var matchedVars = str.match(/\{\{[^\{\}]+\}\}/g);
            var newMatchs = [];
            var newStr = str;

            matchedVars.map(function (v) {
                if (newMatchs.indexOf(v) === -1) {
                    newMatchs.push(v);
                }
            });

            newMatchs.map(function (v) {
                var varName = v.replace(/\{|\}/g, '');
                newStr = newStr.replace(new RegExp(v, 'g'), _this.config.data[varName]);
            });

            return newStr;
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this2 = this;

            var domsWithEventsSelector = this.selector + ' [data-event]';
            var doms = document.querySelectorAll(domsWithEventsSelector);
            doms.forEach(function (dom) {
                var eventStr = dom.getAttribute('data-event');
                var eventStrArr = eventStr.split(':');
                var eventName = eventStrArr[0];
                var funcName = eventStrArr[1];
                dom.addEventListener(eventName, function (e) {
                    _this2.currentActiveSelector = '[data-event=\'' + eventStr + '\']';
                    _this2.config[funcName](e);
                });
            });
        }
    }, {
        key: 'render',
        value: function render(selector) {
            this.selector = selector;
            var filteredText = this.replaceVars(document.querySelector(this.config.template).text);
            document.querySelector(this.selector).innerHTML = filteredText;
            this.bindEvents();
        }
    }]);

    return App;
}();

module.exports = App;

/***/ })
/******/ ]);