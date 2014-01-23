define(function (require, exports) {

  'use strict';

  var Class = require('../src/class');

  QUnit.start();

  module('Module Class');
  test('new Class()', function() {
    var C = new Class({});
    notEqual( new C(), new C(), '' );
  });

  module('Module Inherit');
  test('new Class(ClassA)', function() {
    var C1 = new Class({
        x: 1
      }),
      C2 = new Class(C1),
      c1 = new C1(),
      c2 = new C2();
    equal( c1.x, c2.x, '' );
    equal( c2.x, 1, '' );
  });

  module('Module Extend');
  test('.extend(PlainObjectA, ..., PlainObjectN)', function() {
    var C = new Class(),
      c = new C();
    c.extend({ x: 1, y: 2 }, { x: 3 });
    equal( c.x, 3, '' );
    equal( c.y, 2, '' );
  });

  module('Module Event');
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

});