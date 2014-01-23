define(function (require, exports, module) {

/**
 * 类
 * @module Class
 */

'use strict';

var $ = require('$'),
  Util = require('util');

/**
 * 超类
 * 实现了事件订阅与类继承
 * @class Super
 * @constructor
 */
var Super = function () {},
  Dummy = function () {};

Super.uber = Super.prototype = {

  _Super: Util.guid,

  /**
   * 构造函数
   * @method __construct
   */
  __construct: function (options) {
    this.__eventList = {};
    // 增加订阅
    if ($.isPlainObject(options) && $.isPlainObject(options.on)) {
      this.on(options.on);
      // 删除数据，避免多次订阅
      // options.on = null;
    }
  },

  /**
   * 绑定事件，暂不支持命名空间
   * @method on
   * @param {String} event 事件名
   * @param {Function} callback 绑定回调函数
   */
  on: function (event, callback) {
    var eventList = this.__eventList,
      obj = {};
    if ($.isPlainObject(event)) {
      obj = event;
    } else {
      obj[event] = callback;
    }
    $.each(obj, function (event, callback) {
      if (Object.prototype.hasOwnProperty.call(eventList, event) && eventList[event]) {
        // 判断唯一性，避免多次订阅
        if ($.inArray(callback, eventList[event]) === -1) {
          eventList[event].push(callback);
        }
      } else {
        eventList[event] = [callback];
      }
    });
    return this;
  },

  /**
   * 解除绑定的事件
   * @param {String} event 事件名
   * @param {Function} callback 绑定回调函数
   * @method off
   */
  off: function (event, callback) {
    var eventList = this.__eventList;
    if (Object.prototype.hasOwnProperty.call(eventList, event)) {
      if (typeof callback === 'function') {
        $.each(eventList[event], function (i, n) {
          if (n === callback) {
            eventList[event].splice(i, 1);
          }
        });
      } else {
        delete eventList[event];
      }
    }
    return this;
  },

  /**
   * 触发绑定的事件
   * @param {String} event 事件名
   * @method fire
   */
  fire: function (event) {
    var eventList = this.__eventList,
      args;
    if (Object.prototype.hasOwnProperty.call(eventList, event)) {
      args = [];
      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments, 1);
      }
      $.each(eventList[event], $.proxy(function (i, callback) {
        callback.apply(this, args);
      }, this));
    }
    return this;
  },

  /**
   * 扩展实例方法，返回当前实例
   * @param {Object} obj1 实例方法集
   * @param {Object} [objN] 实例方法集
   * @return {object}
   * @method extend
   */
  extend: function (/*obj1[, objN]*/) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift(true, this);
    $.extend.apply(null, args);
    return this;
  }

};

/**
 * 类继承
 * @param {Function} Child 子类
 * @param {Function} Parent 父类
 * @method Super.inherit
 * @static
 */
Super.inherit = function (Child, Parent) {
  Dummy.prototype = Parent.prototype;
  Child.prototype = new Dummy();
  Child.uber = Parent.prototype;
  Child.prototype.constructor = Child;
};

return Super;

});
