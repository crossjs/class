define(function (require, exports) {

  'use strict';

  var Class = require('../src/class');

  QUnit.start();

  module('Module Class');
  test('Class', function() {
    var ClassA = Class.create();
    notEqual( new ClassA(), new ClassA(), '' );
  });

  module('Module Construct');
  test('Construct', function() {
    var ClassA = Class.create({
      initialize: function (x) {
        this.x = x;
      }
    });
    equal( new ClassA(2).x, 2, '' );
  });

  // module('Module Singleton');
  // test('this.constructor.__instance', function() {
  //   var ClassA = Class.create({
  //     initialize: function (x) {
  //       this.constructor.__instance = this;
  //     }
  //   });
  //   equal( new ClassA(), new ClassA(), '' );
  // });
  // test('CLASSNAME.__instance', function() {
  //   var ClassA = Class.create({
  //     initialize: function (x) {
  //       ClassA.__instance = this;
  //     }
  //   });
  //   equal( new ClassA(), new ClassA(), '' );
  // });

  module('Module Inherits');
  test('Class.create(ClassA)', function() {
    var ClassA = Class.create({
        initialize: function () {
          this.xy = this.x + this.y;
        },
        x: 1,
        y: 2
      });
    var ClassB = Class.create(ClassA, {
        initialize: function () {
          ClassB.superclass.initialize.apply(this, arguments);
          this.xyz = this.x + this.y + this.z;
        },
        x: 3,
        z: 4
      });
    var ClassC = Class.create(ClassB, {
        initialize: function () {
          ClassC.superclass.initialize.apply(this, arguments);
          this.xyzk = this.x + this.y + this.z + this.k;
        },
        k: 5
      });
    var instanceA = new ClassA();
    var instanceB = new ClassB();
    var instanceC = new ClassC();
    equal( instanceA.xy, 3, '' );
    equal( instanceB.xy, 5, '' );
    equal( instanceB.xyz, 9, '' );
    equal( instanceC.xy, 5, '' );
    equal( instanceC.xyz, 9, '' );
    equal( instanceC.xyzk, 14, '' );
  });
  test('ClassA.extend({})', function() {
    var ClassA = Class.create({
        initialize: function () {
          this.xy = this.x + this.y;
        },
        x: 1,
        y: 2
      }),
      ClassB = ClassA.extend({
        initialize: function () {
          ClassB.superclass.initialize.apply(this, arguments);
          this.xyz = this.x + this.y + this.z;
        },
        x: 3,
        z: 4
      }),
      ClassC = ClassB.extend({
        initialize: function () {
          ClassC.superclass.initialize.apply(this, arguments);
          this.xyzk = this.x + this.y + this.z + this.k;
        },
        k: 5
      }),
      instanceA = new ClassA(),
      instanceB = new ClassB(),
      instanceC = new ClassC();
    equal( instanceA.x, 1, '' );
    equal( instanceA.y, 2, '' );
    equal( instanceA.xy, 3, '' );
    equal( instanceB.x, 3, '' );
    equal( instanceB.y, 2, '' );
    equal( instanceB.z, 4, '' );
    equal( instanceB.xy, 5, '' );
    equal( instanceB.xyz, 9, '' );
    equal( instanceC.x, 3, '' );
    equal( instanceC.y, 2, '' );
    equal( instanceC.z, 4, '' );
    equal( instanceC.xy, 5, '' );
    equal( instanceC.xyz, 9, '' );
    equal( instanceC.xyzk, 14, '' );
  });

  module('Module Extend');
  test('.extend(PlainObjectA, ..., PlainObjectN)', function() {
    var ClassA = Class.create(),
      instanceA = new ClassA();
    instanceA.extend({ x: 1, y: 2 }, { x: 3 });
    equal( instanceA.x, 3, '' );
    equal( instanceA.y, 2, '' );
  });

});