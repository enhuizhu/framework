'use strict';

const App  = require('../../libs/app');
const expect = require('chai').expect;

describe('App', () => {
    const config = {
        template: '#header-template',
        data: {
          title: 'TrialReach'
        },
        clearTitle: function(e) {
          document.querySelector('input').value = '';
          document.querySelector('h1').innerHTML = '';
        },
        titleChanged: function(e) {
          document.querySelector('h1').innerHTML = e.target.value;
        }
    }
    
    const myApp = new App(config);

    it('replace vars', () => {
        let testStr = 'fdasjlk {{title}} kfdjlal {{title}} jfdlkajlkfd';
        expect(myApp.replaceVars(testStr)).to.equal('fdasjlk TrialReach kfdjlal TrialReach jfdlkajlkfd');
    });
});