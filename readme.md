# pandora-class

---
提供简单的 OO 实现
---

## 安装

```
$ spm install pandora-class --save
```

## 使用说明

###创建类
```js
var Class = require('pandora-class');
var Person = Class.create({
  initialize: function (name, age) {
    this.name = name;
    this.age = age;
  }
});

```
###对类扩展（继承）
```js
var Student = Person.extend({
  //initialize是内置的初始化方法，实例化时自动执行
  initialize: function (name, age, school) {
    Student.superclass.initialize.apply(this, arguments);
	//superclass是Student的父类，也就是Person，这句是调用父类的初始化方法。
    this.school = school;
  }
});

```  
或
```js
var Student = Class.create(Person, {
 initialize: function (name, age, school) {
    Student.superclass.initialize.apply(this, arguments);
    this.school = school;
  }
});

``` 
###对实例扩展  
```js
var person = new Person('xiaoming', 18);
person.extend({
  showName: function () {
    console.log(this.name);
  }
});
person.showName(); //xiaoming
``` 

###混入
```js
var proto1 = {
    height: 175
  },
  proto2 = {
    getHeight: function() {
      return this.height;
    }
  };
```
然后通过以下方式把属性或方法混入到类里。
```js
var Student = Person.extend({
  mixins: [proto1, proto2]
});
```
或
```js
var Student = Class.create(Person,{
  mixins: [proto1, proto2]
});
```
混入后，Student就拥有height属性和getHeight()方法。
