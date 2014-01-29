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
            t = Array.prototype.join.call(arguments, '');
          }
        }
      }),
      T = '',
      t = '';
    instanceA.fire('test', 1, 2, 3);
    instanceA.off('test');
    instanceA.fire('test', 4, 5, 6);
    equal( T, '', '' );
    equal( t, '', '' );
  });
  test('.fire(event)', function() {
    var SingletonA = new Singleton({
          __construct: function (e, f) {
            this.on(e, f);
          }
        }),
      instanceA = new SingletonA('test', function () {
          T = this;
          t = Array.prototype.join.call(arguments, '');
        }),
      T = '',
      t = '';
    instanceA.fire('test', 1, 2, 3);
    instanceA.off('test');
    instanceA.fire('test', 4, 5, 6);
    equal( T, instanceA, '' );
    equal( t, 'test123', '' );
  });

  module('Module Plugins');
  test('SingletonA.addPlugins(plugins)', function() {
    var SingletonA = new Singleton({
      __construct: function () {
        this.plugined = false;
      }
    }),
      SingletonB,
      instanceA,
      instanceB;
    SingletonA.addPlugins({
        'test': function () {
          this.plugined = true;
        }
      });
    instanceA = new SingletonA();
    SingletonB = new Singleton(SingletonA);
    instanceB = new SingletonB();
    equal( instanceA.plugined, true, '插件安装成功' );
    equal( instanceB.plugined, false, '插件不会被继承' );
  });

});