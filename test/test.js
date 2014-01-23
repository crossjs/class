define(function (require, exports) {

    'use strict';

    var Class = require('../src/class'),
        Singleton = require('../src/singleton');

    QUnit.start();

    module('Module .extend');
    test('.extend(PlainObject, ..., PlainObject)', function() {
        var C = new Class(),
            c = new C();
        c.extend({x:1,y:2},{x:3});
        equal( c.x, 3, '' );
        equal( c.y, 2, '' );
    });

    module('Module .fire');
    test('.fire(event)', function() {
        var C = new Class(),
            c = new C({
                on: {
                    'test': function () {
                        T = this;
                        t = 'test' + Array.prototype.join.call(arguments, '');
                    }
                }
            }),
            T = '',
            t = '';
        c.fire('test', 1, 2, 3);
        equal( T, c, '' );
        equal( t, 'test123', '' );
    });

    module('Module Class');
    test('new Class()', function() {
        var C = new Class({});
        notEqual( new C(), new C(), '' );
        equal( $.isPlainObject(new C().__eventList), true, '' );
    });

    module('Module Singleton');
    test('new Singleton()', function() {
        var S = new Singleton({});
        equal( new S(), new S(), '' );
    });

});