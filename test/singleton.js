define(function (require, exports) {

  'use strict';

  var Singleton = require('../src/singleton');

  QUnit.start();

  module('Module Singleton');
  test('new Singleton()', function() {
    var S = new Singleton();
    equal( new S(), new S(), '' );
  });

  module('Module Inherit');
  test('new Singleton(SingletonA)', function() {
  var S1 = new Singleton({
      x: 1
    }),
    S2 = new Singleton(S1),
    s1 = new S1(),
    s2 = new S2();
    equal( s1.x, s2.x, '' );
    equal( s2.x, 1, '' );
  });

  module('Module Extend');
  test('.extend(PlainObjectA, ..., PlainObjectN)', function() {
    var S = new Singleton(),
      s = new S();
    s.extend({ x: 1, y: 2 }, { x: 3 });
    equal( s.x, 3, '' );
    equal( s.y, 2, '' );
  });

  module('Module Event');
  test('.fire(event)', function() {
    var S = new Singleton(),
      s = new S({
        on: {
          'test': function () {
            T = this;
            t = 'test' + Array.prototype.join.call(arguments, '');
          }
        }
      }),
      T = '',
      t = '';
    s.fire('test', 1, 2, 3);
    equal( T, s, '' );
    equal( t, 'test123', '' );
  });

});