var expect = require('expect.js');
var pandoraClass = Class = require('../class');

describe('pandora-class', function() {

  it('instanceof', function() {
    var ClassA = Class.create();
    var ClassB = ClassA.extend({});
    expect(new ClassA instanceof Class &&
      new ClassB instanceof Class &&
      new ClassB instanceof ClassA).to.be.ok();
  });

  it('constructor', function() {
    var ClassA = Class.create();
    var ClassB = ClassA.extend({});
    expect((new ClassA).constructor === ClassA &&
      (new ClassB).constructor === ClassB).to.be.ok();
  });

  it('new', function() {
    var ClassA = Class.create();
    expect(new ClassA() !== new ClassA()).to.be.ok();
  });


  it('initialize', function() {
    var ClassA = Class.create({
      initialize: function(x) {
        this.x = x;
      }
    });
    expect(new ClassA(2).x === 2).to.be.ok();
  });

  it('extend', function() {
    var ClassA = Class.create(),
      instanceA = new ClassA();
    instanceA.extend({
      x: 1,
      y: 2
    }, {
      x: 3
    });
    expect(instanceA.x === 3 && instanceA.y === 2).to.be.ok();
  });


  it('Class.create', function() {
    var ClassA = Class.create(function() {}, {
        initialize: function() {
          this.xy = this.x + this.y;
        },
        x: 1,
        y: 2
      }),
      ClassB = Class.create(ClassA, {
        initialize: function() {
          ClassB.superclass.initialize.apply(this, arguments);
          this.xyz = this.x + this.y + this.z;
        },
        x: 3,
        z: 4
      }),
      ClassC = Class.create(ClassB, {
        initialize: function() {
          ClassC.superclass.initialize.apply(this, arguments);
          this.xyzk = this.x + this.y + this.z + this.k;
        },
        k: 5
      }),
      instanceA = new ClassA(),
      instanceB = new ClassB(),
      instanceC = new ClassC();

    expect(instanceA.xy === 3 &&
      instanceB.xy === 5 &&
      instanceB.xyz === 9 &&
      instanceC.xy === 5 &&
      instanceC.xyz === 9 &&
      instanceC.xyzk === 14).to.be.ok();
  });

  it('Class.create with mixins', function() {
    var proto1 = {
        a: 1
      },
      proto2 = {
        x: function() {
          return this.a;
        }
      },
      ClassA = Class.create({
        mixins: [proto1, proto2]
      }),
      instanceA = new ClassA();
    expect(instanceA.x()).to.be(1);
  });

  it('Class.extend', function() {
    var ClassA = Class.create({
        initialize: function() {
          this.xy = this.x + this.y;
        },
        x: 1,
        y: 2
      }),
      ClassB = ClassA.extend({
        initialize: function() {
          ClassB.superclass.initialize.apply(this, arguments);
          this.xyz = this.x + this.y + this.z;
        },
        x: 3,
        z: 4
      }),
      ClassC = ClassB.extend({
        initialize: function() {
          ClassC.superclass.initialize.apply(this, arguments);
          this.xyzk = this.x + this.y + this.z + this.k;
        },
        k: 5
      }),
      instanceA = new ClassA(),
      instanceB = new ClassB(),
      instanceC = new ClassC();

    expect(instanceA.x === 1 &&
      instanceA.y === 2 &&
      instanceA.xy === 3 &&
      instanceB.x === 3 &&
      instanceB.y === 2 &&
      instanceB.z === 4 &&
      instanceB.xy === 5 &&
      instanceB.xyz === 9 &&
      instanceC.x === 3 &&
      instanceC.y === 2 &&
      instanceC.z === 4 &&
      instanceC.xy === 5 &&
      instanceC.xyz === 9 &&
      instanceC.xyzk === 14).to.be.ok();
  });

  it('Class.extend with mixins', function() {
    var proto1 = {
        a: 1
      },
      proto2 = {
        x: function() {
          return this.a;
        }
      },
      ClassA = Class.create({
        mixins: [proto1]
      }),
      ClassB = ClassA.extend({
        mixins: [proto2]
      }),
      instanceA = new ClassA(),
      instanceB = new ClassB();

    expect(instanceA.a === 1 &&
      instanceB.x() === 1).to.be.ok();
  });

  it('properties copied, not linked', function() {
    var ClassA = Class.create({
        initialize: function() {
          this.setup();
        },
        setup: function() {}
      }),
      ClassC = ClassA.extend({
        defaults: {
          z: 5
        },
        setup: function() {
          var defaults = {
              x: 3,
              y: 4
            },
            ClassB = ClassA.extend({
              defaults: defaults,
              setup: function() {
                expect(this.defaults).to.eql({
                  x: 3,
                  y: 4
                });
              }
            });
          new ClassB();
          expect(this.defaults).to.eql({
            z: 5
          });
        }
      });
    new ClassC();

  });



});
