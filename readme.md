#class

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/crossjs/class/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![Build Status](https://api.travis-ci.org/crossjs/class.png?branch=master)](http://travis-ci.org/crossjs/class)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

 > seajs module

##how to require

1. run `spm install crossjs/class`
1. write `require('crossjs/class/VERSION.NUMBER/class')`

##how to build

1. checkout
1. `npm install --save-dev`
1. `spm install --save`
1. `grunt`

##history

- 0.0.5 - 不再自动绑定事件订阅（留给具体业务去做）
- 0.0.4 - 优化代码，修改事件订阅逻辑
- 0.0.3 - 子类不再重复执行`__construct`方法
- 0.0.2 - 子类不再继承父类的插件（`plugins`）
- 0.0.1 - init
