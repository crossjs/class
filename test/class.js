define(function (require, exports) {

  'use strict';

  var Class = require('../src/class');

  QUnit.start();

  module('Module Class');
  test('new ClassA()', function() {
    var ClassA = new Class();
    notEqual( new ClassA(), new ClassA(), '' );
  });

  module('Module Construct');
  test('new ClassA(arguments)', function() {
    var ClassA = new Class({
      __construct: function (x) {
        this.x = x;
      }
    });
    equal( new ClassA(2).x, 2, '' );
  });

  module('Module Inherit');
  test('new Class(ClassA)', function() {
    var ClassA = new Class({
        x: 1,
        y: 2
      }),
      ClassB = new Class(ClassA, {
        x: 3,
        z: 4
      }),
      instanceA = new ClassA(),
      instanceB = new ClassB();
    equal( instanceA.x, 1, '' );
    equal( instanceB.x, 3, '' );
    equal( instanceA.y, instanceB.y, '' );
    equal( instanceB.y, 2, '' );
    equal( instanceA.z, undefined, '' );
    equal( instanceB.z, 4, '' );
  });

  module('Module Extend');
  test('.extend(PlainObjectA, ..., PlainObjectN)', function() {
    var ClassA = new Class(),
      instanceA = new ClassA();
    instanceA.extend({ x: 1, y: 2 }, { x: 3 });
    equal( instanceA.x, 3, '' );
    equal( instanceA.y, 2, '' );
  });

  module('Module Event');
  test('.fire(event)', function() {
    var ClassA = new Class(),
      instanceA = new ClassA({
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
    var ClassA = new Class({
          __construct: function (e, f) {
            this.on(e, f);
          }
        }),
      instanceA = new ClassA('test', function () {
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
  test('ClassA.addPlugins(plugins)', function() {
    var ClassA = new Class({
      __construct: function () {
        this.plugined = false;
      }
    }),
      ClassB,
      instanceA,
      instanceB;
    ClassA.addPlugins({
        'test': function () {
          this.plugined = true;
        }
      });
    instanceA = new ClassA();
    ClassB = new Class(ClassA);
    instanceB = new ClassB();
    equal( instanceA.plugined, true, '插件安装成功' );
    equal( instanceB.plugined, false, '插件不会被继承' );
  });

});