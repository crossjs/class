define(function (require, exports, module) {

/**
 * 类
 * @module Class
 */

'use strict';

var $ = require('$');

var inherit = function (Child, Parent) {
  // 不使用`new Parent()`，以避免引入非原型方法/属性
  var Bridge = function () {};
  Bridge.prototype = Parent.prototype;
  Child.prototype = new Bridge();
  Child.superclass = Parent.prototype;
  Child.prototype.constructor = Child;
};

/**
 * 类
 *
 * 提供简洁的 OO 实现
 * @class Class
 */
var Class = function () {};

Class.superclass = Class.prototype = {

  /**
   * 初始化函数
   * @method initialize
   */
  initialize: function () { },

  /**
   * 扩展实例方法/属性
   * @example
   * ```
   * var Person = Class.create({
   *   initialize: function (name, age) {
   *     this.name = name;
   *     this.age = age;
   *   }
   * });
   * var bob = new Person('Bob', 13);
   * bob.extend({
   *   say: function () {
   *     console.log('My name is ' + this.name + '.');
   *     console.log('I\'m ' + this.age + ' years old.');
   *   }
   * });
   * bob.say();
   * // My name is Bob.
   * // I'm 13 years old.
   * ```
   * @method extend
   * @param {Object} obj1 实例方法集
   * @param {Object} [objN] 实例方法集
   * @return {Object} 类实例
   */
  extend: function (/*obj1[, objN]*/) {
    Array.prototype.unshift.call(arguments, true, this);
    $.extend.apply(null, arguments);
    return this;
  }

};

/**
 * 创建类
 * @constructor
 * @static
 * @example
 * ```
 * var Person = Class.create({
 *   initialize: function (name, age) {
 *     this.name = name;
 *     this.age = age;
 *   }
 * });
 * var Student = Class.create(Person, {
 *   initialize: function (name, age, school) {
 *     Student.superclass.initialize.apply(this, arguments);
 *     this.school = school;
 *   }
 * });
 * var tom = new Student('Tom', 21, 'MIT');
 * // now:
 * // tom.name === 'Tom';
 * // tom.age === 21;
 * // tom.school === 'MIT';
 * ```
 * @method create
 * @param {Function} [Brood] 将要继承的父类（只继承其原型方法）
 * @param {Object} [Proto] 将要扩展的实例方法集
 * @param {Object} [ProtoN] 将要扩展的实例方法集
 * @return {Function} 类
 */
Class.create = function (/*[Brood][, Proto[, ProtoN]]*/) {

  var args = Array.prototype.slice.call(arguments, 0),
    Dummy,
    Brood;

  Dummy = function () {
    this.initialize.apply(this, arguments);
  };

  if (args[0] && typeof args[0] === 'function') {
    Brood = args.shift();
    // make sure Classes inherited from Class or Class's sub-classes
    if (!Brood.superclass) {
      inherit(Brood, Class);
    }
  } else {
    Brood = Class;
  }

  inherit(Dummy, Brood);

  if (args.length) {
    args.unshift(true, Dummy.prototype);
    $.extend.apply(null, args);
  }

  Dummy.extend = function () {
    Array.prototype.unshift.call(arguments, Dummy);
    return Class.create.apply(null, arguments);
  };

  return Dummy;
};

module.exports = Class;

});
