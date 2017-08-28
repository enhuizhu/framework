'use strict';

import App from './libs/app.js';

(function(global) {
    global.Framework = {
        create: function(config) {
            return new App(config);
        }   
    }
})(window)