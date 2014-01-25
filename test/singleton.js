define(function (require, exports) {

  'use strict';

  var Singleton = require('../src/singleton');

  QUnit.start();

  module('Module Singleton');
  test('new SingletonA()', function() {
    var SingletonA = new Singleton();
    equal( new SingletonA(), new SingletonA(), '' );
  });

  module('Module Construct');
  test('new SingletonA(arguments)', function() {
    var SingletonA = new Singleton({
      __construct: function (x) {
        this.x = x;
      }
    });
    equal( new SingletonA(2).x, 2, '' );
  });

  module('Module Inherit');
  test('new Singleton(SingletonA)', function() {
    var SingletonA = new Singleton({
        x: 1,
        y: 2
      }),
      SingletonB = new Singleton(SingletonA, {
        x: 3,
        z: 4
      }),
      instanceA = new SingletonA(),
      instanceB = new SingletonB();
    equal( instanceA.x, 1, '' );
    equal( instanceB.x, 3, '' );
    equal( instanceA.y, instanceB.y, '' );
    equal( instanceB.y, 2, '' );
    equal( instanceA.z, undefined, '' );
    equal( instanceB.z, 4, '' );
  });

  module('Module Extend');
  test('.extend(PlainObjectA, ..., PlainObjectN)', function() {
    var SingletonA = new Singleton(),
      instanceA = new SingletonA();
    instanceA.extend({ x: 1, y: 2 }, { x: 3 });
    equal( instanceA.x, 3, '' );
    equal( instanceA.y, 2, '' );
  });

  module('Module Event');
  test('.fire(event)', function() {
    var SingletonA = new Singleton(),
      instanceA = new SingletonA({
        on: {
          'test': function () {
            T = this;
            t = 'test' + Array.prototype.join.call(arguments, '');
          }
        }
      }),
      T = '',
      t = '';
    instanceA.fire('test', 1, 2, 3);
    equal( T, instanceA, '' );
    equal( t, 'test123', '' );
  });

  module('Module Plugins');
  test('SingletonA.addPlugins(plugins)', function() {
    var SingletonA = new Singleton(),
      instanceA;
    SingletonA.addPlugins({
        'test': function () {
          this.plugined = true;
        }
      });
    instanceA = new SingletonA();
    equal( instanceA.plugined, true, '' );
    equal( instanceA.another, undefined, '' );
  });

});