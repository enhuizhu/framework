'use strict';

class App {
    constructor(config) {
        this.config = config;
        // this.startWatch();
    }

    startWatch() {
        if (!this.latestData) {
            this.latestData = JSON.stringify(this.config.data);
        }

        if (JSON.stringify(this.config.data) !== this.latestData) {
            this.render(this.selector);
            this.latestData = JSON.stringify(this.config.data);
        }

        requestAnimationFrame(this.startWatch.bind(this));
    }

    replaceVars(str) {
        let matchedVars = str.match(/\{\{[^\{\}]+\}\}/g);
        let newMatchs = [];
        let newStr = str;

        matchedVars.map(v => {
            if (newMatchs.indexOf(v) === -1) {
                newMatchs.push(v);
            }
        });
        
        newMatchs.map(v => {
            let varName = v.replace(/\{|\}/g, '');
            newStr = newStr.replace(new RegExp(v, 'g'), this.config.data[varName]);
        });

        return newStr;
    }

    bindEvents() {
        let domsWithEventsSelector = `${this.selector} [data-event]`;
        let doms = document.querySelectorAll(domsWithEventsSelector);
        doms.forEach(dom => {
            let eventStr = dom.getAttribute('data-event');
            let eventStrArr = eventStr.split(':');
            let eventName = eventStrArr[0];
            let funcName = eventStrArr[1];
            
            dom.addEventListener(eventName, (e) => {
                this.config[funcName](e);
            });
        });
    }

    render(selector) {
        this.selector = selector;
        let filteredText = this.replaceVars(document.querySelector(this.config.template).text);
        document.querySelector(this.selector).innerHTML = filteredText;
        this.bindEvents();
    }
}

module.exports = App;