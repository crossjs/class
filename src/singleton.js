define(function (require, exports, module) {

/**
 * 类
 * @module Class
 */

'use strict';

var $ = require('$'),
  Util = require('util'),
  Super = require('./super');

/**
 * 单例类
 * @class Singleton
 * @extends Super
 * @param {Function} [Brood] 将要继承的父类（只继承其原型方法）
 * @param {Object} [Proto] 将要扩展的实例方法集
 * @return {function}
 * @constructor
 */
var Singleton = function (/*[Brood][, Proto]*/) {

  var args = arguments,
    Dummy,
    Proto,
    Brood;

  switch (args.length) {
    case 2:

      if (typeof args[0] === 'function') {
        Brood = args[0];
      }

      if ($.isPlainObject(args[1])) {
        Proto = args[1];
      }

      break;
    case 1:

      if (typeof args[0] === 'function') {
        Brood = args[0];
      } else if ($.isPlainObject(args[0])) {
        Proto = args[0];
      }

      break;
  }

  Dummy = function () {
    if (this.constructor.__instance) {
      return this.constructor.__instance;
    }

    var args = Array.prototype.slice.call(arguments, 0),

      callparent = function (ctx, obj, prop) {
        if (obj && obj.hasOwnProperty(prop)){
          // 递归执行callparent
          callparent(ctx, obj.constructor.uber, prop);
          obj[prop].apply(ctx, args);
        }
      };

    // call parents' __construct
    // `Child's uber linked to Parent's prototype`
    callparent(this, this.constructor.uber, '__construct');

    // call __construct
    (function (ctx, obj, prop) {
      if (obj.hasOwnProperty(prop)) {
        obj[prop].apply(ctx, args);
      }
    })(this, this.constructor.prototype, '__construct');

    // load __plugins
    (function (ctx, obj, prop) {
      if (obj.hasOwnProperty(prop)) {
        $.each(obj[prop], function (n, func) {
          func.apply(ctx, args);
        });
      }
    })(this, this.constructor, '__plugins');

    // notify constructed, for plugins
    // this.fire('load');

    this.constructor.__instance = this;
  };

  // plugins
  Dummy.__plugins = (Brood && Brood.__plugins) ? Brood.__plugins : {};
  Dummy.plugins = function (plugins) {
    $.extend(Dummy.__plugins, plugins);
    return Dummy;
  };

  // make sure Classes inherited from Super or Super's sub-classes
  if (typeof Brood === 'undefined') {
    Brood = Super;
  } else if (!$.isPlainObject(Brood.uber) || Brood.uber._Super !== Util.guid) {
    Super.inherit(Brood, Super);
  }

  Super.inherit(Dummy, Brood);

  if (typeof Proto !== 'undefined') {
    $.extend(Dummy.prototype, Proto);
  }

  return Dummy;
};

return Singleton;

});
