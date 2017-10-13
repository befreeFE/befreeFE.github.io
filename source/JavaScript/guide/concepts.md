---
title: 基本概念
type: guide
order: 3
---

> 以下摘抄并修改自 [阮一峰 JavaScript基本语法](http://javascript.ruanyifeng.com/grammar/basic.html)，JavaScript高级程序设计（第三章）

任何语言的核心都必然会描述这门语言最基本的工作原理。而描述的内容通常都要涉及这门语言的语法、操作符、数据类型、内置功能等用于构建复杂解决方案的基本概念。如前所述， ECMA-262 通过叫做 ECMAScript 的“伪语言”为我们描述了 JavaScript 的所有这些基本概念。

## 语法

> 语法，简单的讲就是，一个规则，某种程序语言使用的规则。

ECMAScript 的语法大量借鉴了 C 及其他类 C 语言(如 Java 和 Perl)的语法。

### 区分大小写

要理解的第一个概念就是 ECMAScript 中的一切(变量、函数名和操作符)都区分大小写。这也就 意味着，变量名 test 和变量名 Test 分别表示两个不同的变量，而函数名不能使用 typeof，因为它 是一个关键字，但 typeOf 则完全可以是一个有效的函数名。

### 标识符

标识符（identifier），就是指变量、函数、属性的名字，或者函数的参数。

标识符有一套命名规则，不符合规则的就是非法标识符。JavaScript引擎遇到非法标识符，就会报错。

简单说，标识符命名规则如下：

- 第一个字符，可以是任意Unicode字母（包括英文字母和其他语言的字母），以及美元符号（`$`）和下划线（`_`）。
- 第二个字符及后面的字符，除了Unicode字母、美元符号和下划线，还可以用数字`0-9`。

下面这些都是合法的标识符。

```javascript
arg0
_tmp
$elem
π
```

下面这些则是不合法的标识符。

```javascript
1a  // 第一个字符不能是数字
23  // 同上
***  // 标识符不能包含星号
a+b  // 标识符不能包含加号
-d  // 标识符不能包含减号或连词线
```

**中文是合法的标识符，可以用作变量名。**

<p class="tip">标识符中的字母也可以包含扩展的 ASCII 或 Unicode 字母字符(如 À 和 Æ)，但我们不推荐这样做。</p>

按照惯例，ECMAScript 标识符采用驼峰大小写格式，也就是第一个字母小写，剩下的每个单词的 首字母大写，例如:`firstSecond`

虽然没有谁强制要求必须采用这种格式，但为了与 ECMAScript 内置的函数和对象命名格式保持一 致，可以将其当作一种最佳实践。

> JavaScript有一些保留字，不能用作标识符：arguments、break、case、catch、class、const、continue、debugger、default、delete、do、else、enum、eval、export、extends、false、finally、for、function、if、implements、import、in、instanceof、interface、let、new、null、package、private、protected、public、return、static、super、switch、this、throw、true、try、typeof、var、void、while、with、yield。

另外，还有三个词虽然不是保留字，但是因为具有特别含义，也不应该用作标识符：`Infinity`、`NaN`、`undefined`。

### 注释

源码中被JavaScript引擎忽略的部分就叫做注释，它的作用是对代码进行解释。Javascript提供两种注释：一种是单行注释，用//起头；另一种是多行注释，放在/\* 和 \*/之间。

```javascript
// 这是单行注释

/*
 这是
 多行
 注释
*/

/*
* 这是一个多行 
* (块级)注释 
*/

```

虽然上面第三种注释中的第二和第三行都以一个星号开头，但这不是必需的。之所以添加那两个星号，纯粹是为了提高注释的可读性(这种格式在企业级应用中用得比较多)。

此外，由于历史上JavaScript兼容HTML代码的注释，所以`<!--`和`-->`也被视为单行注释。

```javascript
x = 1; <!-- x = 2;
--> x = 3;
```

上面代码中，只有`x = 1`会执行，其他的部分都被注释掉了。

**需要注意的是，`-->`只有在行首，才会被当成单行注释，否则就是一个运算符。**

```javascript
function countdown(n) {
  while (n --> 0) console.log(n);
}
countdown(3)
// 2
// 1
// 0
```

上面代码中，`n --> 0`实际上会当作`n-- > 0`，因此输出2、1、0。

### 严格模式

ECMAScript 5 引入了严格模式(strict mode)的概念。严格模式是为 JavaScript 定义了一种不同的 解析与执行模型。在严格模式下，ECMAScript 3 中的一些不确定的行为将得到处理，而且对某些不安全 的操作也会抛出错误。要在整个脚本中启用严格模式，可以在顶部添加如下代码:
``` js
"use strict";
```

这行代码看起来像是字符串，而且也没有赋值给任何变量，但其实它是一个编译指示(pragma)， 用于告诉支持的 JavaScript 引擎切换到严格模式。这是为不破坏 ECMAScript 3 语法而特意选定的语法。

在函数内部的上方包含这条编译指示，也可以指定函数在严格模式下执行:

```js
  function doSomething(){
    "use strict";
    //函数体 
  }  
```

严格模式下，JavaScript 的执行结果会有很大不同，支持严格模式的浏览器包括 IE10+、Firefox 4+、Safari 5.1+、Opera 12+和 Chrome。

### 语句

> ECMAScript 中的语句以一个分号结尾;如果省略分号，则由解析器确定语句的结尾

JavaScript程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。

语句（statement）是为了完成某种任务而进行的操作，比如下面就是一行赋值语句：

```javascript
var a = 1 + 3;
```

这条语句先用`var`命令，声明了变量`a`，然后将`1 + 3`的运算结果赋值给变量`a`。

`1 + 3`叫做表达式（expression），指一个为了得到返回值的计算式。语句和表达式的区别在于，前者主要为了进行某种操作，一般情况下不需要返回值；后者则是为了得到返回值，一定会返回一个值。

凡是JavaScript语言中预期为值的地方，都可以使用表达式。比如，赋值语句的等号右边，预期是一个值，因此可以放置各种表达式。一条语句可以包含多个表达式。

语句以分号结尾，一个分号就表示一个语句结束。多个语句可以写在一行内。

```javascript
var a = 1 + 3 ; var b = 'abc';
```

分号前面可以没有任何内容，JavaScript引擎将其视为空语句。

```javascript
;;;
```

上面的代码就表示3个空语句。

表达式不需要分号结尾。一旦在表达式后面添加分号，则JavaScript引擎就将表达式视为语句，这样会产生一些没有任何意义的语句。

```javascript
1 + 3;
'abc';
```

上面两行语句有返回值，但是没有任何意义，因为只是返回一个单纯的值，没有任何其他操作。

可以使用 C 风格的语法把多条语句组合到一个代码块中，即代码块以左花括号({)开头，以右花 括号(})结尾:

``` js
    if (test){
        test = false;
        alert(test);
    }
```

虽然条件控制语句(如 if 语句)只在执行多条语句的情况下才要求使用代码块，但最佳实践是始 终在控制语句中使用代码块——即使代码块中只有一条语句，例如:

``` js
    if (test)
        alert(test); // 有效但容易出错，不要使用 
    if (test){
        alert(test); // 推荐使用
    }
```

在控制语句中使用代码块可以让编码意图更加清晰，而且也能降低修改代码时出错的几率。

## 关键字和保留字

ECMA-262 描述了一组具有特定用途的关键字，这些关键字可用于表示控制语句的开始或结束，或 者用于执行特定操作等。按照规则，关键字也是语言保留的，不能用作标识符。以下就是 ECMAScript 的全部关键字(带*号上标的是第 5 版新增的关键字):

```
break case catch continue debugger* default delete do instanceof else new finally return for switch function this if throw in try typeof var void while with
```

ECMA-262 还描述了另外一组不能用作标识符的保留字。尽管保留字在这门语言中还没有任何特定 的用途，但它们有可能在将来被用作关键字。以下是 ECMA-262 第 3 版定义的全部保留字:

```
abstract boolean byte char class const debugger double enum export extends final float goto implements import int interface long native package private protected public short static super 12 synchronized throws transient volatile
```

第 5 版把在非严格模式下运行时的保留字缩减为下列这些:

```
class enum extends super const export import
```

在严格模式下，第 5 版还对以下保留字施加了限制:

```
implements interface let package private protected public static yield
```

注意，let 和 yield 是第 5 版新增的保留字;其他保留字都是第 3 版定义的。为了最大程度地保 证兼容性，建议读者将第 3 版定义的保留字外加 let 和 yield 作为编程时的参考。
在实现 ECMAScript 3 的 JavaScript 引擎中使用关键字作标识符，会导致“Identifier Expected”错误。 而使用保留字作标识符可能会也可能不会导致相同的错误，具体取决于特定的引擎。

第 5 版对使用关键字和保留字的规则进行了少许修改。关键字和保留字虽然仍然不能作为标识符使 用，但现在可以用作对象的属性名。一般来说，最好都不要使用关键字和保留字作为标识符和属性名， 以便与将来的 ECMAScript 版本兼容。

除了上面列出的保留字和关键字，ECMA-262 第 5 版对 eval 和 arguments 还施加了限制。在严 格模式下，这两个名字也不能作为标识符或属性名，否则会抛出错误。

## 变量

### 概念

ECMAScript 的变量是松散类型的，所谓松散类型就是可以用来保存任何类型的数据。换句话说， 每个变量仅仅是一个用于保存值的占位符而已。定义变量时要使用 var 操作符(注意 var 是一个关键 字)，后跟变量名(即一个标识符)

变量是对“值”的引用，使用变量等同于引用一个值。每一个变量都有一个变量名。

```javascript
var a = 1;
```

上面的代码先声明变量`a`，然后在变量`a`与数值1之间建立引用关系，也称为将数值1“赋值”给变量`a`。以后，引用变量`a`就会得到数值1。最前面的`var`，是变量声明命令。它表示通知解释引擎，要创建一个变量`a`。

变量的声明和赋值，是分开的两个步骤，上面的代码将它们合在了一起，实际的步骤是下面这样。

```javascript
var a;
a = 1;
```

如果只是声明变量而没有赋值，则该变量的值是`undefined`。`undefined`是一个JavaScript关键字，表示“无定义”。

```javascript
var a;
a // undefined
```

如果变量赋值的时候，忘了写`var`命令，这条语句也是有效的。

```javascript
var a = 1;
// 基本等同
a = 1;
```

但是，不写`var`的做法，不利于表达意图，而且容易不知不觉地创建全局变量，所以建议总是使用`var`命令声明变量。

> 严格地说，`var a = 1` 与 `a = 1`，这两条语句的效果不完全一样，主要体现在`delete`命令无法删除前者。不过，绝大多数情况下，这种差异是可以忽略的。

如果一个变量没有声明就直接使用，JavaScript会报错，告诉你变量未定义。

```javascript
x
// ReferenceError: x is not defined
```

上面代码直接使用变量`x`，系统就报错，告诉你变量`x`没有声明。

可以在同一条`var`命令中声明多个变量。

```javascript
var a, b;
```

JavaScript 是一种动态类型语言，也就是说，变量的类型没有限制，可以赋予各种类型的值。

```javascript
var a = 1;
a = 'hello';
```

上面代码中，变量`a`起先被赋值为一个数值，后来又被重新赋值为一个字符串。第二次赋值的时候，因为变量`a`已经存在，所以不需要使用`var`命令。

如果使用`var`重新声明一个已经存在的变量，是无效的。

```javascript
var x = 1;
var x;
x // 1
```

上面代码中，变量`x`声明了两次，第二次声明是无效的。

但是，如果第二次声明的同时还赋值了，则会覆盖掉前面的值。

```javascript
var x = 1;
var x = 2;

// 等同于

var x = 1;
var x;
x = 2;
```

> 虽然省略 var 操作符可以定义全局变量，但这也不是我们推荐的做法。因为在局 部作用域中定义的全局变量很难维护，而且如果有意地忽略了 var 操作符，也会由于 相应变量不会马上就有定义而导致不必要的混乱。给未经声明的变量赋值在严格模式 下会导致抛出 ReferenceError 错误。

### 变量提升

JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

```javascript
console.log(a);
var a = 1;
```

上面代码首先使用`console.log`方法，在控制台（console）显示变量a的值。这时变量`a`还没有声明和赋值，所以这是一种错误的做法，但是实际上不会报错。因为存在变量提升，真正运行的是下面的代码。

```javascript
var a;
console.log(a);
a = 1;
```

最后的结果是显示`undefined`，表示变量`a`已声明，但还未赋值。

请注意，变量提升只对`var`命令声明的变量有效，如果一个变量不是用`var`命令声明的，就不会发生变量提升。

```javascript
console.log(b);
b = 1;
```

上面的语句将会报错，提示“ReferenceError: b is not defined”，即变量`b`未声明，这是因为`b`不是用`var`命令声明的，JavaScript引擎不会将其提升，而只是视为对顶层对象的`b`属性的赋值。

> 以下摘抄自你不懂得JavaScript（中卷）第一，二章

## 类型

大多数开发者认为，像 JavaScript 这样的动态语言是没有类型 (type)的。让我们来看看 ES5.1 [规范](http://www.ecma- international.org/ecma-262/5.1/)对此是如何界定的:

ECMAScript 语言中所有的值都有一个对应的语言类型。ECMAScript 语言类型包括 Undefined、Null、Boolean、 String、Number 和 Object。

对语言引擎和开发人员来说，类型 是值的内部特征，它定义了值的行为， 以使其区别于其他值。

### 内置类型

JavaScript 有七种内置类型:

* 空值(null )
* 未定义(undefined )
* 布尔值(boolean )
* 数字(number )
* 字符串(string )
* 对象(object )
* 符号(symbol ，ES6 中新增)

除对象之外，其他统称为“基本类型”。

通常，我们将数值、字符串、布尔值称为原始类型（primitive type）的值，即它们是最基本的数据类型，不能再细分了。而将对象称为合成类型（complex type）的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。至于`undefined`和`null`，一般将它们看成两个特殊值。

对象又可以分成三个子类型。

- 狭义的对象（object）
- 数组（array）
- 函数（function）

狭义的对象和数组是两种不同的数据组合方式，而函数其实是处理数据的方法。JavaScript把函数当成一种数据类型，可以像其他类型的数据一样，进行赋值和传递，这为编程带来了很大的灵活性，体现了JavaScript作为“函数式语言”的本质。

这里需要明确的是，JavaScript的所有数据，都可以视为广义的对象。不仅数组和函数属于对象，就连原始类型的数据（数值、字符串、布尔值）也可以用对象方式调用。为了避免混淆，此后除非特别声明，本教程的”对象“都特指狭义的对象。

>function (函数)也是 JavaScript 的一个内置类型。然而查阅规范就会知道，它实际上是 object 的一个“子类 型”。具体来说，函数是“可调用对象”，它有一个内部属性 [[Call]] ，该属性使其可以被调用。函数不仅是对象，还可以拥有属性。

本教程将详细介绍所有的数据类型。`undefined`和`null`两个特殊值和布尔类型Boolean比较简单，将在本节介绍，其他类型将各自有单独的一节。

### 值和类型

JavaScript 中的变量是没有类型的，只有值才有 。变量可以随时持有任何类型的值。

换个角度来理解就是，JavaScript 不做“类型强制”;也就是说，语言引擎不要求变量 总是持有与其初始值同类型 的值。一个变 量可以现在被赋值为字符串类型值，随后又被赋值为数字类型值。

在对变量执行 typeof 操作时，得到的结果并不是该变量的类型，而是该变量持有的值的类型，因为 JavaScript 中的变量没有类型。

### undefined 和 undeclared

变量在未持有值的时候为 undefined。此时 typeof 返回 "undefined"

大多数开发者倾向于将 undefined 等同于 undeclared（未声明），但在 JavaScript 中它们完全是两回事。

已在作用域中声明但还没有赋值的变量，是 undefined 的。相反，还没有在作用域中声明 过的变量，是 undeclared 的。

```js
var a;
a; // undefined
b; // ReferenceError: b is not defined
```

浏览器对这类情况的处理很让人抓狂。上例中，“b is not defined”容易让人误以为是“b is undefined”。这里再强调一遍，“undefined”和“is not defined”是两码事。此时如果浏览器 报错成“b is not found”或者“b is not declared”会更准确。

更让人抓狂的是 typeof 处理 undeclared 变量的方式。例如：

```js
var a;
typeof a; // "undefined"
typeof b; // "undefined"
```

对于 undeclared（或者 not defined）变量， typeof 照样返回 "undefined"。请注意虽然 b 是 一个 undeclared 变量，但 typeof b 并没有报错。这是因为 typeof 有一个特殊的安全防范 机制。

> 很多开发人员认为全局命名空间中不应该有变量存在，所有东西都应该被封 装到模块和私有 / 独立的命名空间中。理论上这样没错，却不切实际。然而 这仍不失为一个值得为之努力奋斗的目标。好在 ES6 中加入了对模块的支 持，这使我们又向目标迈近了一步。

### typeof 运算符

JavaScript有三种方法，可以确定一个值到底是什么类型。

- `typeof`运算符
- `instanceof`运算符
- `Object.prototype.toString`方法

`instanceof`运算符和`Object.prototype.toString`方法，将在后文相关章节介绍。这里着重介绍`typeof`运算符。

`typeof`运算符可以返回一个值的数据类型，可能有以下结果。

**（1）原始类型**

数值、字符串、布尔值分别返回`number`、`string`、`boolean`。

```javascript
typeof 123 // "number"
typeof '123' // "string"
typeof false // "boolean"
```

**（2）函数**

函数返回`function`。

```javascript
function f() {}
typeof f
// "function"
```

**（3）undefined**

`undefined`返回`undefined`。

```javascript
typeof undefined
// "undefined"
```

利用这一点，typeof可以用来检查一个没有声明的变量，而不报错。

```javascript
v
// ReferenceError: v is not defined

typeof v
// "undefined"
```

上面代码中，变量`v`没有用`var`命令声明，直接使用就会报错。但是，放在`typeof`后面，就不报错了，而是返回`undefined`。

实际编程中，这个特点通常用在判断语句。

```javascript
// 错误的写法
if (v) {
  // ...
}
// ReferenceError: v is not defined

// 正确的写法
if (typeof v === "undefined") {
  // ...
}
```

**（4）其他**

除此以外，其他情况都返回`object`。

```javascript
typeof window // "object"
typeof {} // "object"
typeof [] // "object"
typeof null // "object"
```

从上面代码可以看到，空数组（`[]`）的类型也是`object`，这表示在JavaScript内部，数组本质上只是一种特殊的对象。

另外，`null`的类型也是`object`，这是由于历史原因造成的。1995年JavaScript语言的第一版，所有值都设计成32位，其中最低的3位用来表述数据类型，`object`对应的值是`000`。当时，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），完全没考虑`null`，只把它当作`object`的一种特殊值，32位全部为0。这是`typeof null`返回`object`的根本原因。

为了兼容以前的代码，后来就没法修改了。这并不是说`null`就属于对象，本质上`null`是一个类似于`undefined`的特殊值。

既然`typeof`对数组（array）和对象（object）的显示结果都是`object`，那么怎么区分它们呢？`instanceof`运算符可以做到。

```javascript
var o = {};
var a = [];

o instanceof Array // false
a instanceof Array // true
```

`instanceof`运算符的详细解释，请见《面向对象编程》一章。

> 以下引自JavaScript高级程序 3.4.1

鉴于 ECMAScript 是松散类型的，因此需要有一种手段来检测给定变量的数据类型——typeof 就 是负责提供这方面信息的操作符。对一个值使用 typeof 操作符可能返回下列某个字符串：

- "undefined"——如果这个值未定义；
- "boolean"——如果这个值是布尔值；
- "string"——如果这个值是字符串；
- "undefined"——如果这个值未定义；
- "boolean"——如果这个值是布尔值；
- "string"——如果这个值是字符串；
- "number"——如果这个值是数值；
- "object"——如果这个值是对象或 null；
- "function"——如果这个值是函数。

下面是几个使用 typeof 操作符的例子：

``` js
var message = "some string";
alert(typeof message); // "string"
alert(typeof(message)); // "string"
alert(typeof 95); // "number"
```

这几个例子说明， typeof 操作符的操作数可以是变量（message），也可以是数值字面量。注意， typeof 是一个操作符而不是函数，因此例子中的圆括号尽管可以使用，但不是必需的。

> 从技术角度讲，函数在 ECMAScript 中是对象，不是一种数据类型。然而，函数也 确实有一些特殊的属性，因此通过 typeof 操作符来区分函数和其他对象是有必要的。

> 以下引自你不知道的JavaScript 1.3.2

#### typeof Undeclared

由于typeof undefined 及 Undeclared 均 返回 undefined

```js
var a;
typeof a; // "undefined"
typeof b; // "undefined
```

请注意虽然 b 是 一个 undeclared 变量，但 typeof b 并没有报错。这是因为 typeof 有一个特殊的安全防范 机制

该安全防范机制对在浏览器中运行的 JavaScript 代码来说还是很有帮助的，因为多个脚本 文件会在共享的全局命名空间中加载变量。

举个简单的例子，在程序中使用全局变量 DEBUG 作为“调试模式”的开关。在输出调试信 息到控制台之前，我们会检查 DEBUG 变量是否已被声明。顶层的全局变量声明 var DEBUG = true 只在 debug.js 文件中才有，而该文件只在开发和测试时才被加载到浏览器，在生产环 境中不予加载。

问题是如何在程序中检查全局变量 DEBUG 才不会出现 ReferenceError 错误。这时 typeof 的 安全防范机制就成了我们的好帮手：

```js
// 这样会抛出错误
if (DEBUG) {
  console.log( "Debugging is starting" );
}
// 这样是安全的
if (typeof DEBUG !== "undefined") {
  console.log( "Debugging is starting" );
}
```

这不仅对用户定义的变量（比如 DEBUG）有用，对内建的 API 也有帮助

```js
if (typeof atob === "undefined") {
  atob = function() { /*..*/ };
}
```

> 如果要为某个缺失的功能写 polyfill（即衬垫代码或者补充代码，用来补充 当前运行环境中缺失的功能），一般不会用 var atob 来声明变量 atob。如 果在 if 语句中使用 var atob，声明会被提升（hoisted，参见《你不知道的 JavaScript（上卷）》 1 中的“作用域和闭包”部分）到作用域（即当前脚本或 函数的作用域）的最顶层，即使 if 条件不成立也是如此（因为 atob 全局变 量已经存在）。在有些浏览器中，对于一些特殊的内建全局变量（通常称为 “宿主对象”， host object），这样的重复声明会报错。去掉 var 则可以防止声 明被提升。

还有一种不用通过 typeof 的安全防范机制的方法，就是检查所有全局变量是否是全局对象 的属性，浏览器中的全局对象是 window。所以前面的例子也可以这样来实现：

```js
if (window.DEBUG) {
// ..
}
if (!window.atob) {
// ..
}
```

与 undeclared 变量不同，访问不存在的对象属性（甚至是在全局对象 window 上）不会产生 ReferenceError 错误

一些开发人员不喜欢通过 window 来访问全局对象，尤其当代码需要运行在多种 JavaScript 环境中时（不仅仅是浏览器，还有服务器端，如 node.js 等），因为此时全局对象并非总是 window 。

从技术角度来说， typeof 的安全防范机制对于非全局变量也很管用，虽然这种情况并不多 见，也有一些开发人员不大愿意这样做。如果想让别人在他们的程序或模块中复制粘贴你 的代码，就需要检查你用到的变量是否已经在宿主程序中定义过：

```js
function doSomethingCool() {
  var helper = (typeof FeatureXYZ !== "undefined") ? FeatureXYZ : function() { /*.. default feature ..*/ };
  var val = helper();
  // ..
}
```

其他模块和程序引入 doSomethingCool() 时， doSomethingCool() 会检查 FeatureXYZ 变量是 否已经在宿主程序中定义过；如果是，就用现成的，否则就自己定义：

```js
// 一个立即执行函数表达式（IIFE，参见《你不知道的JavaScript（上卷）》“作用域和闭包”
// 部分的3.3.2节）
(function () {
    function FeatureXYZ() { /*.. my XYZ feature ..*/ }
    // 包含doSomethingCool(..)
    function doSomethingCool() {
        var helper =
            (typeof FeatureXYZ !== "undefined") ?
                FeatureXYZ :
                function () { /*.. default feature ..*/ };
        var val = helper();
        // ..
    }
    doSomethingCool();
})();
```

这里， FeatureXYZ 并不是一个全局变量，但我们还是可以使用 typeof 的安全防范机制来做 检查，因为这里没有全局对象可用（像前面提到的 window.___）。

还有一些人喜欢使用“依赖注入”（dependency injection）设计模式，就是将依赖通过参数 显式地传递到函数中，如：

```js
function doSomethingCool(FeatureXYZ) {
    var helper = FeatureXYZ ||
        function () { /*.. default feature ..*/ };
    var val = helper();
    // ..
}
```

> 以下为[阮一峰的JavaScript教程中数组一章](http://javascript.ruanyifeng.com/grammar/array.html)及你不知道的JavaScript 第二章的整合

## 数组

### 数组的定义

数组（array）是按次序排列的一组值。每个值的位置都有编号（从0开始），整个数组用方括号表示。

```javascript
var arr = ['a', 'b', 'c'];
```

上面代码中的`a`、`b`、`c`就构成一个数组，两端的方括号是数组的标志。`a`是0号位置，`b`是1号位置，`c`是2号位置。

除了在定义时赋值，数组也可以先定义后赋值。

```javascript
var arr = [];

arr[0] = 'a';
arr[1] = 'b';
arr[2] = 'c';
```

任何类型的数据，都可以放入数组。

```javascript
var arr = [
  {a: 1},
  [1, 2, 3],
  function() {return true;}
];

arr[0] // Object {a: 1}
arr[1] // [1, 2, 3]
arr[2] // function (){return true;}
```

上面数组`arr`的3个成员依次是对象、数组、函数。

如果数组的元素还是数组，就形成了多维数组。

```javascript
var a = [[1, 2], [3, 4]];
a[0][1] // 2
a[1][1] // 4
```

### 数组的本质

本质上，数组属于一种特殊的对象。`typeof`运算符会返回数组的类型是`object`。

```javascript
typeof [1, 2, 3] // "object"
```

上面代码表明，`typeof`运算符认为数组的类型就是对象。

数组的特殊性体现在，它的键名是按次序排列的一组整数（0，1，2...）。

```javascript
var arr = ['a', 'b', 'c'];

Object.keys(arr)
// ["0", "1", "2"]
```

上面代码中，`Object.keys`方法返回数组的所有键名。可以看到数组的键名就是整数0、1、2。

由于数组成员的键名是固定的，因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名。

> JavaScript语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串。

```javascript
var arr = ['a', 'b', 'c'];

arr['0'] // 'a'
arr[0] // 'a'
```

上面代码分别用数值和字符串作为键名，结果都能读取数组。原因是数值键名被自动转为了字符串。

需要注意的是，这一条在赋值时也成立。如果一个值可以被转换为整数，则以该值为键名，等于以对应的整数为键名。

```javascript
var a = [];

a['1000'] = 'abc';
a[1000] // 'abc'

a[1.00] = 6;
a[1] // 6
```

上面代码表明，由于字符串“1000”和浮点数1.00都可以转换为整数，所以视同为整数键赋值。

> 对象有两种读取成员的方法：“点”结构（`object.key`）和方括号结构（`object[key]`）。但是，对于数值的键名，不能使用点结构。

```javascript
var arr = [1, 2, 3];
arr.0 // SyntaxError
```

> 上面代码中，`arr.0`的写法不合法，因为单独的数值不能作为标识符（identifier）。所以，数组成员只能用方括号`arr[0]`表示（方括号是运算符，可以接受数值）。

### length属性

数组的`length`属性，返回数组的成员数量。

使用 delete 运算符可以将单元从数组中删除，但是请注意，单元删除后，数 组的 length 属性并不会发生变化。

```javascript
['a', 'b', 'c'].length // 3
```

JavaScript使用一个32位整数，保存数组的元素个数。这意味着，数组成员最多只有4294967295个（2<sup>32</sup> - 1）个，也就是说`length`属性的最大值就是4294967295。

只要是数组，就一定有`length`属性。该属性是一个动态的值，等于键名中的最大整数加上`1`。

```javascript
var arr = ['a', 'b'];
arr.length // 2

arr[2] = 'c';
arr.length // 3

arr[9] = 'd';
arr.length // 10

arr[1000] = 'e';
arr.length // 1001
```

上面代码表示，数组的数字键不需要连续，`length`属性的值总是比最大的那个整数键大`1`。另外，这也表明数组是一种动态的数据结构，可以随时增减数组的成员。

`length`属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员会自动减少到`length`设置的值。

```javascript
var arr = [ 'a', 'b', 'c' ];
arr.length // 3

arr.length = 2;
arr // ["a", "b"]
```

上面代码表示，当数组的`length`属性设为2（即最大的整数键只能是1）那么整数键2（值为`c`）就已经不在数组中了，被自动删除了。

将数组清空的一个有效方法，就是将`length`属性设为0。

```javascript
var arr = [ 'a', 'b', 'c' ];

arr.length = 0;
arr // []
```

如果人为设置`length`大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位。

```javascript
var a = ['a'];

a.length = 3;
a[1] // undefined
```

上面代码表示，当`length`属性设为大于数组个数时，读取新增的位置都会返回`undefined`。

如果人为设置`length`为不合法的值，JavaScript会报错。

```javascript
// 设置负值
[].length = -1
// RangeError: Invalid array length

// 数组元素个数大于等于2的32次方
[].length = Math.pow(2, 32)
// RangeError: Invalid array length

// 设置字符串
[].length = 'abc'
// RangeError: Invalid array length
```

值得注意的是，由于数组本质上是对象的一种，所以我们可以为数组添加属性，但是这不影响`length`属性的值。

```javascript
var a = [];

a['p'] = 'abc';
a.length // 0

a[2.1] = 'abc';
a.length // 0
```

上面代码将数组的键分别设为字符串和小数，结果都不影响`length`属性。因为，`length`属性的值就是等于最大的数字键加1，而这个数组没有整数键，所以`length`属性保持为0。

如果数组的键名是添加超出范围的数值，该键名会自动转为字符串。

```javascript
var arr = [];
arr[-1] = 'a';
arr[Math.pow(2, 32)] = 'b';

arr.length // 0
arr[-1] // "a"
arr[4294967296] // "b"
```

上面代码中，我们为数组`arr`添加了两个不合法的数字键，结果`length`属性没有发生变化。这些数字键都变成了字符串键名。最后两行之所以会取到值，是因为取键值时，数字键名会默认转为字符串。

### 类似数组的对象

如果一个对象的所有键名都是正整数或零，并且有`length`属性，那么这个对象就很像数组，语法上称为“类似数组的对象”（array-like object）。

有时需要将类数组（一组通过数字索引的值）转换为真正的数组，这一般通过数组工具函有时需要将类数组（一组通过数字索引的值）转换为真正的数组，这一般通过数组工具函

例如，一些 DOM 查询操作会返回 DOM 元素列表，它们并非真正意义上的数组，但十分 类似。另一个例子是通过 arguments 对象（类数组）将函数的参数当作列表来访问（从 ES6 开始已废止）

```javascript
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

obj[0] // 'a'
obj[1] // 'b'
obj.length // 3
obj.push('d') // TypeError: obj.push is not a function
```

上面代码中，对象`obj`就是一个类似数组的对象。

但是，“类似数组的对象”并不是数组，因为它们不具备数组特有的方法。上面例子中，`obj`对象没有数组的`push`方法，使用该方法就会报错。

> “类似数组的对象”的根本特征，就是具有`length`属性。只要有`length`属性，就可以认为这个对象类似于数组。但是有一个问题，这种`length`属性不是动态值，不会随着成员的变化而变化。

```javascript
var obj = {
  length: 0
};
obj[3] = 'd';
obj.length // 0
```

上面代码为对象`obj`添加了一个数字键，但是`length`属性没变。这就说明了`obj`不是数组。

典型的“类似数组的对象”是函数的`arguments`对象，以及大多数 DOM 元素集，还有字符串。

```javascript
// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');

arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false

// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false
```

数组的`slice`方法可以将“类似数组的对象”变成真正的数组。

```javascript
var arr = Array.prototype.slice.call(arrayLike);
```

除了转为真正的数组，“类似数组的对象”还有一个办法可以使用数组的方法，就是通过`call()`把数组的方法放到对象上面。

```javascript
function print(value, index) {
  console.log(index + ' : ' + value);
}

Array.prototype.forEach.call(arrayLike, print);
```

上面代码中，`arrayLike`代表一个类似数组的对象，本来是不可以使用数组的`forEach()`方法的，但是通过`call()`，可以把`forEach()`嫁接到`arrayLike`上面调用。

下面的例子就是通过这种方法，在`arguments`对象上面调用`forEach`方法。

```javascript
// forEach 方法
function logArgs() {
  Array.prototype.forEach.call(arguments, function (elem, i) {
    console.log(i+'. '+elem);
  });
}

// 等同于 for 循环
function logArgs() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(i + '. ' + arguments[i]);
  }
}
```

字符串也是类似数组的对象，所以也可以用`Array.prototype.forEach.call`遍历。

```javascript
Array.prototype.forEach.call('abc', function (chr) {
  console.log(chr);
});
// a
// b
// c
```

> 注意，这种方法比直接使用数组原生的`forEach`要慢，所以最好还是先将“类似数组的对象”转为真正的数组，然后再直接调用数组的`forEach`方法。

```javascript
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
  console.log(chr);
});
// a
// b
// c
```

### 数组的空位

当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）。

```javascript
var a = [1, , 1];
a.length // 3
```

上面代码表明，数组的空位不影响`length`属性。

需要注意的是，如果最后一个元素后面有逗号，并不会产生空位。也就是说，有没有这个逗号，结果都是一样的。

```javascript
var a = [1, 2, 3,];

a.length // 3
a // [1, 2, 3]
```

上面代码中，数组最后一个成员后面有一个逗号，这不影响`length`属性的值，与没有这个逗号时效果一样。

数组的空位是可以读取的，返回`undefined`。

```javascript
var a = [, , ,];
a[1] // undefined
```

使用`delete`命令删除一个数组成员，会形成空位，并且不会影响`length`属性。

```javascript
var a = [1, 2, 3];
delete a[1];

a[1] // undefined
a.length // 3
```

上面代码用`delete`命令删除了数组的第二个元素，这个位置就形成了空位，但是对`length`属性没有影响。也就是说，`length`属性不过滤空位。所以，使用`length`属性进行数组遍历，一定要非常小心。

数组的某个位置是空位，与某个位置是`undefined`，是不一样的。如果是空位，使用数组的`forEach`方法、`for...in`结构、以及`Object.keys`方法进行遍历，空位都会被跳过。

```javascript
var a = [, , ,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出

for (var i in a) {
  console.log(i);
}
// 不产生任何输出

Object.keys(a)
// []
```

如果某个位置是`undefined`，遍历的时候就不会被跳过。

```javascript
var a = [undefined, undefined, undefined];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined

for (var i in a) {
  console.log(i);
}
// 0
// 1
// 2

Object.keys(a)
// ['0', '1', '2']
```

这就是说，空位就是数组没有这个元素，所以不会被遍历到，而`undefined`则表示数组有这个元素，值是`undefined`，所以遍历不会跳过。

在创建“稀疏”数组（sparse array，即含有空白或空缺单元的数组）时要特别注意：

```js
var a = [ ];
a[0] = 1;
// 此处没有设置a[1]单元
a[2] = [ 3 ];
a[1]; // undefined
a.length; // 3
```

`a[1]` 的值为 undefined，但这与将其显式赋值为 `undefined（a[1] = undefined）`还是 有所区别。

```js
var a = new Array( 3 );
var b = [ undefined, undefined, undefined ];
var c = [];
c.length = 3;
a;
b;
c;
```

我们可以创建包含空单元的数组，如上例中的 c。只要将 length 属性设置为 超过实际单元数的值，就能隐式地制造出空单元。另外还可以通过 delete b[1] 在数组 b 中制造出一个空单元。

更糟糕的是，上例中 a 和 b 的行为有时相同，有时又大相径庭：

```js
a.join( "-" ); // "--"
b.join( "-" ); // "--"
a.map(function(v,i){ return i; }); // [ undefined x 3 ]
b.map(function(v,i){ return i; }); // [ 0, 1, 2 ]
```

a.map(..) 之所以执行失败，是因为数组中并不存在任何单元，所以 map(..) 无从遍历。而
join(..) 却不一样，它的具体实现可参考下面的代码：

```js
function fakeJoin(arr, connector) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
        if (i > 0) {
            str += connector;
        }
        if (arr[i] !== undefined) {
            str += arr[i];
        }
    }
    return str;
}
var a = new Array(3);
fakeJoin(a, "-"); // "--"
```

从中可以看出， join(..) 首先假定数组不为空，然后通过 length 属性值来遍历其中的元 素。而 map(..) 并不做这样的假定，因此结果也往往在预期之外，并可能导致失败。

我们可以通过下述方式来创建包含 undefined 单元（而非“空单元”）的数组：

```js
var a = Array.apply( null, { length: 3 } );
a; // [ undefined, undefined, undefined ]
```

apply(..) 是一个工具函数，适用于所有函数对象，它会以一种特殊的方式来调用传递给 它的函数。

Array.apply(..) 调用 Array(..) 函数，并且将 { length: 3 } 作为函数的参数

假设在 apply(..) 内部该数组参数名为 arr， for 循环就会这样来遍历数组： arr[0]、 arr[1]、 arr[2]。 然 而， 由 于 { length: 3 } 中 并 不 存 在 这 些 属 性， 所 以 返 回 值 为 undefined 。

永远不要创建和使用空单元数组。

> [阮一峰 String](http://javascript.ruanyifeng.com/grammar/string.html) 与 你不知道的JavaScript整合

## String

### 定义

字符串就是零个或多个排在一起的字符，放在单引号或双引号之中。

```javascript
'abc'
"abc"
```

单引号字符串的内部，可以使用双引号。双引号字符串的内部，可以使用单引号。

```javascript
'key = "value"'
"It's a long journey"
```

上面两个都是合法的字符串。

如果要在单引号字符串的内部，使用单引号（或者在双引号字符串的内部，使用双引号），就必须在内部的单引号（或者双引号）前面加上反斜杠，用来转义。

```javascript
'Did she say \'Hello\'?'
// "Did she say 'Hello'?"

"Did she say \"Hello\"?"
// "Did she say "Hello"?"
```

由于HTML语言的属性值使用双引号，所以很多项目约定JavaScript语言的字符串只使用单引号，本教程就遵守这个约定。当然，只使用双引号也完全可以。重要的是，坚持使用一种风格，不要两种风格混合。

字符串默认只能写在一行内，分成多行将会报错。

```javascript
'a
b
c'
// SyntaxError: Unexpected token ILLEGAL
```

上面代码将一个字符串分成三行，JavaScript就会报错。

如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。

```javascript
var longString = "Long \
long \
long \
string";

longString
// "Long long long string"
```

上面代码表示，加了反斜杠以后，原来写在一行的字符串，可以分成多行书写。但是，输出的时候还是单行，效果与写在同一行完全一样。注意，反斜杠的后面必须是换行符，而不能有其他字符（比如空格），否则会报错。

连接运算符（`+`）可以连接多个单行字符串，将长字符串拆成多行书写，输出的时候也是单行。

```javascript
var longString = 'Long '
  + 'long '
  + 'long '
  + 'string';
```

如果想输出多行字符串，有一种利用多行注释的变通方法。

```javascript
(function () { /*
line 1
line 2
line 3
*/}).toString().split('\n').slice(1, -1).join('\n')
// "line 1
// line 2
// line 3"
```

上面的例子中，输出的字符串就是多行。

### 转义

> String 数据类型包含一些特殊的字符字面量，也叫转义序列，用于表示非打印字符，或者具有其 他用途的字符。

这些字符字面量可以出现在字符串中的任意位置，而且也将被作为一个字符来解析

反斜杠（\）在字符串内有特殊含义，用来表示一些特殊字符，所以又称为转义符。

需要用反斜杠转义的特殊字符，主要有下面这些：

- `\0` null（\u0000）
- `\b` 后退键（\u0008）
- `\f` 换页符（\u000C）
- `\n` 换行符（\u000A）
- `\r` 回车键（\u000D）
- `\t` 制表符（\u0009）
- `\v` 垂直制表符（\u000B）
- `\'` 单引号（\u0027）
- `\"` 双引号（\u0022）
- \\ 反斜杠（\u005C）

上面这些字符前面加上反斜杠，都表示特殊含义。

```javascript
console.log('1\n2')
// 1
// 2
```

上面代码中，`\n`表示换行，输出的时候就分成了两行。

反斜杠还有三种特殊用法。

（1）`\HHH`

反斜杠后面紧跟三个八进制数（`000`到`377`），代表一个字符。`HHH`对应该字符的Unicode码点，比如`\251`表示版权符号。显然，这种方法只能输出256种字符。

（2）`\xHH`

`\x`后面紧跟两个十六进制数（`00`到`FF`），代表一个字符。`HH`对应该字符的Unicode码点，比如`\xA9`表示版权符号。这种方法也只能输出256种字符。

（3）`\uXXXX`

`\u`后面紧跟四个十六进制数（`0000`到`FFFF`），代表一个字符。`HHHH`对应该字符的Unicode码点，比如`\u00A9`表示版权符号。

下面是这三种字符特殊写法的例子。

```javascript
'\251' // "©"
'\xA9' // "©"
'\u00A9' // "©"

'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
```

如果在非特殊字符前面使用反斜杠，则反斜杠会被省略。

```javascript
'\a'
// "a"
```

上面代码中，`a`是一个正常字符，前面加反斜杠没有特殊含义，反斜杠会被自动省略。

如果字符串的正常内容之中，需要包含反斜杠，则反斜杠前面需要再加一个反斜杠，用来对自身转义。

```javascript
"Prev \\ Next"
// "Prev \ Next"
```

### 字符串与数组

JavaScript 中字符串是不可变的，而数组是可变的。并且 a[1] 在 JavaScript 中并非总是合 法语法，在老版本的 IE 中就不被允许（现在可以了）。 正确的方法应该是 a.charAt(1)。

字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符 串。而数组的成员函数都是在其原始值上进行操作。

```js
var a = "foo";
var b = ["f","o","o"];
a[1]
```

另一个不同点在于字符串反转（JavaScript 面试常见问题）。数组有一个字符串没有的可变更成员函数 reverse()：

```js
a.reverse; // undefined
b.reverse(); // ["!","o","O","f"]
b; // ["f","O","o","!"]
```

可惜我们无法“借用”数组的可变更成员函数，因为字符串是不可变的：

```js
Array.prototype.reverse.call(a);
// 返回值仍然是字符串"foo"的一个封装对象
一个变通（破解）的办法是先将字符串转换为数组，待处理完后再将结果转换回字符串：
var c = a
    // 将a的值转换为字符数组
    .split("")
    // 将数组中的字符进行倒转
    .reverse()
    // 将数组中的字符拼接回字符串
    .join("");
c; // "oof"
```

这种方法的确简单粗暴，但对简单的字符串却完全适用。

> 请注意！上述方法对于包含复杂字符（Unicode，如星号、多字节字符等）的 字符串并不适用。这时则需要功能更加完备、能够处理 Unicode 的工具库。 可以参考 Mathias Bynen 的 [Esrever](https://github.com/mathiasbynents/esrever)。

字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从0开始）。

如果需要经常以字符数组的方式来处理字符串的话，倒不如直接使用数组。这样就不用在 字符串和数组之间来回折腾。可以在需要时使用 join("") 将字符数组转换为字符串。

```javascript
var s = 'hello';
s[0] // "h"
s[1] // "e"
s[4] // "o"

// 直接对字符串使用方括号运算符
'hello'[1] // "e"
```

如果方括号中的数字超过字符串的长度，或者方括号中根本不是数字，则返回`undefined`。

```javascript
'abc'[3] // undefined
'abc'[-1] // undefined
'abc'['x'] // undefined
```

但是，字符串与数组的相似性仅此而已。实际上，无法改变字符串之中的单个字符。

```javascript
var s = 'hello';

delete s[0];
s // "hello"

s[1] = 'a';
s // "hello"

s[5] = '!';
s // "hello"
```

> 上面代码表示，字符串内部的单个字符无法改变和增删，这些操作会默默地失败。 字符串也无法直接使用数组的方法，必须通过`call`方法间接使用。

```javascript
var s = 'hello';

s.join(' ') // TypeError: s.join is not a function

Array.prototype.join.call(s, ' ') // "h e l l o"
```

上面代码中，如果直接对字符串使用数组的`join`方法，会报错不存在该方法。但是，可以通过`call`方法，间接对字符串使用`join`方法。

> 不过，由于字符串是只读的，那些会改变原数组的方法，比如`push()`、`sort()`、`reverse()`、`splice()`都对字符串无效，只有将字符串显式转为数组后才能使用，参见数组部分。

### length属性

`length`属性返回字符串的长度，该属性也是无法改变的。

```javascript
var s = 'hello';
s.length // 5

s.length = 3;
s.length // 5

s.length = 7;
s.length // 5
```

上面代码表示字符串的`length`属性无法改变，但是不会报错。

### 字符集

JavaScript使用Unicode字符集。也就是说，在JavaScript引擎内部，所有字符都用Unicode表示。

JavaScript不仅以Unicode储存字符，还允许直接在程序中使用Unicode编号表示字符，即将字符写成`\uxxxx`的形式，其中`xxxx`代表该字符的Unicode编码。比如，`\u00A9`代表版权符号。

```javascript
var s = '\u00A9';
s // "©"
```

解析代码的时候，JavaScript会自动识别一个字符是字面形式表示，还是Unicode形式表示。输出给用户的时候，所有字符都会转成字面形式。

```javascript
var f\u006F\u006F = 'abc';
foo // "abc"
```

上面代码中，第一行的变量名`foo`是Unicode形式表示，第二行是字面形式表示。JavaScript会自动识别。

> 我们还需要知道，每个字符在JavaScript内部都是以16位（即2个字节）的UTF-16格式储存。也就是说，JavaScript的单位字符长度固定为16位长度，即2个字节。

但是，UTF-16有两种长度：对于`U+0000`到`U+FFFF`之间的字符，长度为16位（即2个字节）；对于`U+10000`到`U+10FFFF`之间的字符，长度为32位（即4个字节），而且前两个字节在`0xD800`到`0xDBFF`之间，后两个字节在`0xDC00`到`0xDFFF`之间。举例来说，`U+1D306`对应的字符为`𝌆，`它写成UTF-16就是`0xD834 0xDF06`。浏览器会正确将这四个字节识别为一个字符，但是JavaScript内部的字符长度总是固定为16位，会把这四个字节视为两个字符。

```javascript
var s = '\uD834\uDF06';

s // "𝌆"
s.length // 2
/^.$/.test(s) // false
s.charAt(0) // ""
s.charAt(1) // ""
s.charCodeAt(0) // 55348
s.charCodeAt(1) // 57094
```

上面代码说明，对于于`U+10000`到`U+10FFFF`之间的字符，JavaScript总是视为两个字符（字符的`length`属性为2），用来匹配单个字符的正则表达式会失败（JavaScript认为这里不止一个字符），`charAt`方法无法返回单个字符，`charCodeAt`方法返回每个字节对应的十进制值。

所以处理的时候，必须把这一点考虑在内。对于4个字节的Unicode字符，假定`C`是字符的Unicode编号，`H`是前两个字节，`L`是后两个字节，则它们之间的换算关系如下。

```javascript
// 将大于U+FFFF的字符，从Unicode转为UTF-16
H = Math.floor((C - 0x10000) / 0x400) + 0xD800
L = (C - 0x10000) % 0x400 + 0xDC00

// 将大于U+FFFF的字符，从UTF-16转为Unicode
C = (H - 0xD800) * 0x400 + L - 0xDC00 + 0x10000
```

下面的正则表达式可以识别所有UTF-16字符。

```javascript
([\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF])
```

由于JavaScript引擎（严格说是ES5规格）不能自动识别辅助平面（编号大于0xFFFF）的Unicode字符，导致所有字符串处理函数遇到这类字符，都会产生错误的结果（详见《标准库》一章的`String`对象章节）。如果要完成字符串相关操作，就必须判断字符是否落在`0xD800`到`0xDFFF`这个区间。

下面是能够正确处理字符串遍历的函数。

```javascript
function getSymbols(string) {
  var length = string.length;
  var index = -1;
  var output = [];
  var character;
  var charCode;
  while (++index < length) {
    character = string.charAt(index);
    charCode = character.charCodeAt(0);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      output.push(character + string.charAt(++index));
    } else {
      output.push(character);
    }
  }
  return output;
}

var symbols = getSymbols('𝌆');

symbols.forEach(function(symbol) {
  // ...
});
```

替换（`String.prototype.replace`）、截取子字符串（`String.prototype.substring`, `String.prototype.slice`）等其他字符串操作，都必须做类似的处理。

### Base64转码

Base64是一种编码方法，可以将任意字符转成可打印字符。使用这种编码方法，主要不是为了加密，而是为了不出现特殊字符，简化程序的处理。

JavaScript原生提供两个Base64相关方法。

- btoa()：字符串或二进制值转为Base64编码
- atob()：Base64编码转为原来的编码

```javascript
var string = 'Hello World!';
btoa(string) // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh') // "Hello World!"
```

这两个方法不适合非ASCII码的字符，会报错。

```javascript
btoa('你好')
// Uncaught DOMException: The string to be encoded contains characters outside of the Latin1 range.
```

要将非ASCII码字符转为Base64编码，必须中间插入一个转码环节，再使用这两个方法。

```javascript
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```

> 引自高程 3.4.6

###  转换为字符串

要把一个值转换为一个字符串有两种方式。第一种是使用几乎每个值都有的 toString()方法。这个方法唯一要做的就是返回相应值的字符串表现。

```js
var age = 11;
var ageAsString = age.toString(); // 字符串"11"
var found = true;
var foundAsString = found.toString(); // 字符串"true"
```

数值、布尔值、对象和字符串值（没错，每个字符串也都有一个 toString()方法，该方法返回字 符串的一个副本）都有 toString()方法。但 null 和 undefined 值没有这个方法。

多数情况下，调用 toString()方法不必传递参数。但是，在调用数值的 toString()方法时，可 以传递一个参数：输出数值的基数。默认情况下， toString()方法以十进制格式返回数值的字符串表 示。而通过传递基数， toString()可以输出以二进制、八进制、十六进制，乃至其他任意有效进制格 式表示的字符串值。下面给出几个例子：

```js
var num = 10;
alert(num.toString()); // "10"
alert(num.toString(2)); // "1010"
alert(num.toString(8)); // "12"
alert(num.toString(10)); // "10"
alert(num.toString(16)); // "a"
```

在不知道要转换的值是不是 null 或 undefined 的情况下，还可以使用转型函数 String()，这个 函数能够将任何类型的值转换为字符串。 String()函数遵循下列转换规则：

- 如果值有 toString()方法，则调用该方法（没有参数）并返回相应的结果；
- 如果值是 null，则返回"null"；
- 如果值是 undefined，则返回"undefined"。

```js
var value1 = 10;
var value2 = true;
var value3 = null;
var value4;
alert(String(value1)); // "10"
alert(String(value2)); // "true"
alert(String(value3)); // "null"
alert(String(value4)); // "undefined"
```

这里先后转换了 4 个值：数值、布尔值、 null 和 undefined。数值和布尔值的转换结果与调用 toString()方法得到的结果相同。因为 null 和 undefined 没有 toString()方法，所以 String() 函数就返回了这两个值的字面量。

## Number

### 整数和浮点数

JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，`1`与`1.0`是相同的，是同一个数。

```javascript
1 === 1.0 // true
```

这就是说，JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数）。容易造成混淆的是，某些运算只有整数才能完成，此时 JavaScript 会自动把64位浮点数，转成32位整数，然后再进行运算，参见《运算符》一节的”位运算“部分。

由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。

```javascript
0.1 + 0.2 === 0.3
// false

0.3 / 0.1
// 2.9999999999999996

(0.3 - 0.2) === (0.2 - 0.1)
// false
```

### 数值精度

根据国际标准 IEEE 754，JavaScript 浮点数的64个二进制位，从最左边开始，是这样组成的。

- 第1位：符号位，`0`表示正数，`1`表示负数
- 第2位到第12位：指数部分
- 第13位到第64位：小数部分（即有效数字）

符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度。

IEEE 754 规定，有效数字第一位默认总是1，不保存在64位浮点数之中。也就是说，有效数字总是`1.xx...xx`的形式，其中`xx..xx`的部分保存在64位浮点数之中，最长可能为52位。因此，JavaScript 提供的有效数字最长为53个二进制位。

```
(-1)^符号位 * 1.xx...xx * 2^指数位
```

上面公式是一个数在 JavaScript 内部实际的表示形式。

精度最多只能到53个二进制位，这意味着，绝对值小于2的53次方的整数，即-(2<sup>53</sup>-1)到2<sup>53</sup>-1，都可以精确表示。

```javascript
Math.pow(2, 53)
// 9007199254740992

Math.pow(2, 53) + 1
// 9007199254740992

Math.pow(2, 53) + 2
// 9007199254740994

Math.pow(2, 53) + 3
// 9007199254740996

Math.pow(2, 53) + 4
// 9007199254740996
```

从上面示例可以看到，大于2的53次方以后，整数运算的结果开始出现错误。所以，大于等于2的53次方的数值，都无法保持精度。

```javascript
Math.pow(2, 53)
// 9007199254740992

// 多出的三个有效数字，将无法保存
9007199254740992111
// 9007199254740992000
```

上面示例表明，大于2的53次方以后，多出来的有效数字（最后三位的`111`）都会无法保存，变成0。

### 数值范围

根据标准，64位浮点数的指数部分的长度是11个二进制位，意味着指数部分的最大值是2047（2的11次方减1）。也就是说，64位浮点数的指数部分的值最大为2047，分出一半表示负数，则 JavaScript 能够表示的数值范围为2<sup>1024</sup>到2<sup>-1023</sup>（开区间），超出这个范围的数无法表示。

如果指数部分等于或超过最大正值1024，JavaScript 会返回`Infinity`（关于`Infinity`的介绍参见下文），这称为“正向溢出”；如果等于或超过最小负值-1023（即非常接近0），JavaScript 会直接把这个数转为0，这称为“负向溢出”。

```javascript
var x = 0.5;

for(var i = 0; i < 25; i++) {
  x = x * x;
}

x // 0
```

上面代码对`0.5`连续做25次平方，由于最后结果太接近0，超出了可表示的范围，JavaScript 就直接将其转为0。

至于具体的最大值和最小值，JavaScript 提供`Number`对象的`MAX_VALUE`和`MIN_VALUE`属性表示（参见《Number 对象》一节）。

```javascript
Number.MAX_VALUE // 1.7976931348623157e+308
Number.MIN_VALUE // 5e-324
```

### 数值的表示法

Number 类型应该是 ECMAScript 中最令人关注的数据类型了，这种类型使用 IEEE754 格式来表示 整数和浮点数值（浮点数值在某些语言中也被称为双精度数值）。为支持各种数值类型， ECMA-262 定 义了不同的数值字面量格式。

JavaScript 的数值有多种表示方法，可以用字面形式直接表示，比如`35`（十进制）和`0xFF`（十六进制）。

数值也可以采用科学计数法表示，下面是几个科学计数法的例子。

```javascript
123e3 // 123000
123e-3 // 0.123
-3.1E+12
.1e-23
```

科学计数法允许字母`e`或`E`的后面，跟着一个整数，表示这个数值的指数部分。

以下两种情况，JavaScript 会自动将数值转为科学计数法表示，其他情况都采用字面形式直接表示。

**（1）小数点前的数字多于21位。**

```javascript
1234567890123456789012
// 1.2345678901234568e+21

123456789012345678901
// 123456789012345680000
```

**（2）小数点后的零多于5个。**

```javascript
// 小数点后紧跟5个以上的零，
// 就自动转为科学计数法
0.0000003 // 3e-7

// 否则，就保持原来的字面形式
0.000003 // 0.000003
```

在进行算术计算时，所有以八进制和十六进制表示的数值最终都将被转换成十进制数值。

### 数值的进制

使用字面量（literal）时，JavaScript 对整数提供四种进制的表示方法：十进制、十六进制、八进制、2进制。

- 十进制：没有前导0的数值。
- 八进制：有前缀`0o`或`0O`的数值，或者有前导0、且只用到0-7的八个阿拉伯数字的数值。
- 十六进制：有前缀`0x`或`0X`的数值。
- 二进制：有前缀`0b`或`0B`的数值。

默认情况下，JavaScript 内部会自动将八进制、十六进制、二进制转为十进制。下面是一些例子。

```javascript
0xff // 255
0o377 // 255
0b11 // 3
```

如果八进制、十六进制、二进制的数值里面，出现不属于该进制的数字，就会报错。

```javascript
0xzz // 报错
0o88 // 报错
0b22 // 报错
```

上面代码中，十六进制出现了字母`z`、八进制出现数字`8`、二进制出现数字`2`，因此报错。

通常来说，有前导0的数值会被视为八进制，但是如果前导0后面有数字`8`和`9`，则该数值被视为十进制。

```javascript
0888 // 888
0777 // 511
```

前导0表示八进制，处理时很容易造成混乱。ES5的严格模式和ES6，已经废除了这种表示法，但是浏览器目前还支持。

### 特殊数值

JavaScript提供几个特殊的数值。

### 正零和负零

前面说过，JavaScript 的64位浮点数之中，有一个二进制位是符号位。这意味着，任何一个数都有一个对应的负值，就连`0`也不例外。

在JavaScript内部，实际上存在2个`0`：一个是`+0`，一个是`-0`。它们是等价的。

```javascript
-0 === +0 // true
0 === -0 // true
0 === +0 // true
```

几乎所有场合，正零和负零都会被当作正常的`0`。

```javascript
+0 // 0
-0 // 0
(-0).toString() // '0'
(+0).toString() // '0'
```

唯一有区别的场合是，`+0`或`-0`当作分母，返回的值是不相等的。

```javascript
(1 / +0) === (1 / -0) // false
```

上面代码之所以出现这样结果，是因为除以正零得到`+Infinity`，除以负零得到`-Infinity`，这两者是不相等的（关于`Infinity`详见后文）。

### NaN

**（1）含义**

`NaN`是 JavaScript 的特殊值，表示“非数字”（Not a Number），主要出现在将字符串解析成数字出错的场合。

```javascript
5 - 'x' // NaN
```

上面代码运行时，会自动将字符串`x`转为数值，但是由于`x`不是数值，所以最后得到结果为`NaN`，表示它是“非数字”（`NaN`）。

另外，一些数学函数的运算结果会出现`NaN`。

```javascript
Math.acos(2) // NaN
Math.log(-1) // NaN
Math.sqrt(-1) // NaN
```

`0`除以`0`也会得到`NaN`。

```javascript
0 / 0 // NaN
```

需要注意的是，`NaN`不是一种独立的数据类型，而是一种特殊数值，它的数据类型依然属于`Number`，使用`typeof`运算符可以看得很清楚。

```javascript
typeof NaN // 'number'
```

**（2）运算规则**

`NaN`不等于任何值，包括它本身。

```javascript
NaN === NaN // false
```

由于数组的`indexOf`方法，内部使用的是严格相等运算符，所以该方法对`NaN`不成立。

```javascript
[NaN].indexOf(NaN) // -1
```

`NaN`在布尔运算时被当作`false`。

```javascript
Boolean(NaN) // false
```

`NaN`与任何数（包括它自己）的运算，得到的都是`NaN`。

```javascript
NaN + 32 // NaN
NaN - 32 // NaN
NaN * 32 // NaN
NaN / 32 // NaN
```

**（3）判断NaN的方法**

`isNaN`方法可以用来判断一个值是否为`NaN`。

```javascript
isNaN(NaN) // true
isNaN(123) // false
```

但是，`isNaN`只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成`NaN`，所以最后返回`true`，这一点要特别引起注意。也就是说，`isNaN`为`true`的值，有可能不是`NaN`，而是一个字符串。

```javascript
isNaN('Hello') // true
// 相当于
isNaN(Number('Hello')) // true
```

出于同样的原因，对于对象和数组，`isNaN`也返回`true`。

```javascript
isNaN({}) // true
// 等同于
isNaN(Number({})) // true

isNaN(['xzy']) // true
// 等同于
isNaN(Number(['xzy'])) // true
```

但是，对于空数组和只有一个数值成员的数组，`isNaN`返回`false`。

```javascript
isNaN([]) // false
isNaN([123]) // false
isNaN(['123']) // false
```

上面代码之所以返回`false`，原因是这些数组能被`Number`函数转成数值，请参见《数据类型转换》一节。

因此，使用`isNaN`之前，最好判断一下数据类型。

```javascript
function myIsNaN(value) {
  return typeof value === 'number' && isNaN(value);
}
```

判断`NaN`更可靠的方法是，利用`NaN`是JavaScript之中唯一不等于自身的值这个特点，进行判断。

```javascript
function myIsNaN(value) {
  return value !== value;
}
```

### Infinity

**（1）定义**

`Infinity`表示“无穷”，用来表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是非0数值除以0，得到`Infinity`。

```javascript
// 场景一
Math.pow(2, Math.pow(2, 100))
// Infinity

// 场景二
0 / 0 // NaN
1 / 0 // Infinity
```

上面代码中，第一个场景是一个表达式的计算结果太大，超出了JavaScript能够表示的范围，因此返回`Infinity`。第二个场景是`0`除以`0`会得到`NaN`，而非0数值除以`0`，会返回`Infinity`。

`Infinity`有正负之分，`Infinity`表示正的无穷，`-Infinity`表示负的无穷。

```javascript
Infinity === -Infinity // false

1 / -0 // -Infinity
-1 / -0 // Infinity
```

上面代码中，非零正数除以`-0`，会得到`-Infinity`，负数除以`-0`，会得到`Infinity`。

由于数值正向溢出（overflow）、负向溢出（underflow）和被`0`除，JavaScript都不报错，而是返回`Infinity`，所以单纯的数学运算几乎没有可能抛出错误。

`Infinity`大于一切数值（除了`NaN`），`-Infinity`小于一切数值（除了`NaN`）。

```javascript
Infinity > 1000 // true
-Infinity < -1000 // true
```

`Infinity`与`NaN`比较，总是返回`false`。

```javascript
Infinity > NaN // false
-Infinity > NaN // false

Infinity < NaN // false
-Infinity < NaN // false
```

**（2）运算规则**

`Infinity`的四则运算，符合无穷的数学计算规则。

```javascript
5 * Infinity // Infinity
5 - Infinity // -Infinity
Infinity / 5 // Infinity
5 / Infinity // 0
```

0乘以`Infinity`，返回`NaN`；0除以`Infinity`，返回`0`；`Infinity`除以0，返回`Infinity`。

```javascript
0 * Infinity // NaN
0 / Infinity // 0
Infinity / 0 // Infinity
```

`Infinity`与`null`计算时，`null`会转成0，等同于与`0`的计算。

```javascript
null * Infinity // NaN
null / Infinity // 0
Infinity / null // Infinity
```

`Infinity`与`undefined`计算，返回的都是`NaN`。

```javascript
undefined + Infinity // NaN
undefined - Infinity // NaN
undefined * Infinity // NaN
undefined / Infinity // NaN
Infinity / undefined // NaN
```

`Infinity`加上或乘以`Infinity`，返回的还是`Infinity`。

```javascript
Infinity + Infinity // Infinity
Infinity * Infinity // Infinity
```

`Infinity`减去或除以`Infinity`，得到`NaN`。

```javascript
Infinity - Infinity // NaN
Infinity / Infinity // NaN
```

**（3）isFinite函数**

`isFinite`函数返回一个布尔值，检查某个值是不是正常数值，而不是`Infinity`。

```javascript
isFinite(Infinity) // false
isFinite(-1) // true
isFinite(true) // true
isFinite(NaN) // false
```

上面代码表示，如果对`NaN`使用`isFinite`函数，也返回`false`，表示`NaN`不是一个正常值。

### 数值转换

有 3 个函数可以把非数值转换为数值： Number()、 parseInt()和 parseFloat()。第一个函数， 即转型函数 Number()可以用于任何数据类型，而另两个函数则专门用于把字符串转换成数值。这 3 个 函数对于同样的输入会有返回不同的结果。

### Number()

Number()函数的转换规则如下。

- 如果是 Boolean 值， true 和 false 将分别被转换为 1 和 0。
- 如果是数字值，只是简单的传入和返回。
- 如果是 null 值，返回 0。
- 如果是 undefined，返回 NaN。
- 如果是字符串，遵循下列规则：

  - 如果字符串中只包含数字（包括前面带正号或负号的情况），则将其转换为十进制数值，即"1" 会变成 1， "123"会变成 123，而"011"会变成 11（注意：前导的零被忽略了）；
  - 如果字符串中包含有效的浮点格式，如"1.1"，则将其转换为对应的浮点数值（同样，也会忽 略前导零）；
  - 如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整 数值；
  - 如果字符串是空的（不包含任何字符），则将其转换为 0；
  - 如果字符串中包含除上述格式之外的字符，则将其转换为 NaN。

- 如果是对象，则调用对象的 valueOf()方法，然后依照前面的规则转换返回的值。如果转换 的结果是 NaN，则调用对象的 toString()方法，然后再次依照前面的规则转换返回的字符 串值。

根据这么多的规则使用 Number()把各种数据类型转换为数值确实有点复杂。下面还是给出几个具
体的例子吧

```js
var num1 = Number("Hello world!"); //NaN
var num2 = Number(""); //0
var num3 = Number("000011"); //11
var num4 = Number(true); //1
```

首先，字符串"Hello world!"会被转换为 NaN，因为其中不包含任何有意义的数字值。空字符串 会被转换为 0。字符串"000011"会被转换为 11，因为忽略了其前导的零。最后， true 值被转换为 1。

### parseInt()

由于 Number()函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是 parseInt()函数。 parseInt()函数在转换字符串时，更多的是看其是否符合数值模式。它会忽略字 符串前面的空格，直至找到第一个非空格字符。如果第一个字符不是数字字符或者负号， parseInt() 就会返回 NaN；也就是说，用 parseInt()转换空字符串会返回 NaN（Number()对空字符返回 0）。

如 果第一个字符是数字字符， parseInt()会继续解析第二个字符，直到解析完所有后续字符或者遇到了 一个非数字字符。例如， "1234blue"会被转换为 1234，因为"blue"会被完全忽略。类似地， "22.5" 会被转换为 22，因为小数点并不是有效的数字字符

如果字符串中的第一个字符是数字字符， parseInt()也能够识别出各种整数格式（即前面讨论的 十进制、八进制和十六进制数）。也就是说，如果字符串以"0x"开头且后跟数字字符，就会将其当作一 个十六进制整数；如果字符串以"0"开头且后跟数字字符，则会将其当作一个八进制数来解析。

**（1）基本用法**

`parseInt`方法用于将字符串转为整数。

```javascript
parseInt('123') // 123
```

如果字符串头部有空格，空格会被自动去除。

```javascript
parseInt('   81') // 81
```

如果`parseInt`的参数不是字符串，则会先转为字符串再转换。

```javascript
parseInt(1.23) // 1
// 等同于
parseInt('1.23') // 1
```

字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。

```javascript
parseInt('8a') // 8
parseInt('12**') // 12
parseInt('12.34') // 12
parseInt('15e2') // 15
parseInt('15px') // 15
```

上面代码中，`parseInt`的参数都是字符串，结果只返回字符串头部可以转为数字的部分。

如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回`NaN`。

```javascript
parseInt('abc') // NaN
parseInt('.3') // NaN
parseInt('') // NaN
parseInt('+') // NaN
parseInt('+1') // 1
```

`parseInt`的返回值只有两种可能，不是一个十进制整数，就是`NaN`。

如果字符串以`0x`或`0X`开头，`parseInt`会将其按照十六进制数解析。

```javascript
parseInt('0x10') // 16
```

如果字符串以`0`开头，将其按照10进制解析。

```javascript
parseInt('011') // 11
```

对于那些会自动转为科学计数法的数字，`parseInt`会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果。

```javascript
parseInt(1000000000000000000000.5) // 1
// 等同于
parseInt('1e+21') // 1

parseInt(0.0000008) // 8
// 等同于
parseInt('8e-7') // 8
```

**（2）进制转换**

`parseInt`方法还可以接受第二个参数（2到36之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，`parseInt`的第二个参数为10，即默认是十进制转十进制。

```javascript
parseInt('1000') // 1000
// 等同于
parseInt('1000', 10) // 1000
```

下面是转换指定进制的数的例子。

```javascript
parseInt('1000', 2) // 8
parseInt('1000', 6) // 216
parseInt('1000', 8) // 512
```

上面代码中，二进制、六进制、八进制的`1000`，分别等于十进制的8、216和512。这意味着，可以用`parseInt`方法进行进制的转换。

如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在2到36之间，才能得到有意义的结果，超出这个范围，则返回`NaN`。如果第二个参数是`0`、`undefined`和`null`，则直接忽略。

```javascript
parseInt('10', 37) // NaN
parseInt('10', 1) // NaN
parseInt('10', 0) // 10
parseInt('10', null) // 10
parseInt('10', undefined) // 10
```

如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回`NaN`。

```javascript
parseInt('1546', 2) // 1
parseInt('546', 2) // NaN
```

上面代码中，对于二进制来说，`1`是有意义的字符，`5`、`4`、`6`都是无意义的字符，所以第一行返回1，第二行返回`NaN`。

前面说过，如果`parseInt`的第一个参数不是字符串，会被先转为字符串。这会导致一些令人意外的结果。

```javascript
parseInt(0x11, 36) // 43
// 等同于
parseInt(String(0x11), 36)
parseInt('17', 36)
```

上面代码中，十六进制的`0x11`会被先转为十进制的17，再转为字符串。然后，再用36进制解读字符串`17`，最后返回结果`43`。

这种处理方式，对于八进制的前缀0，尤其需要注意。

```javascript
parseInt(011, 2) // NaN
// 等同于
parseInt(String(011), 2)

parseInt('011', 2) // 3
```

上面代码中，第一行的`011`会被先转为字符串`9`，因为`9`不是二进制的有效字符，所以返回`NaN`。第二行的字符串`011`，会被当作二进制处理，返回3。

ES5不再允许将带有前缀0的数字视为八进制数，而是要求忽略这个`0`。但是，为了保证兼容性，大部分浏览器并没有部署这一条规定。

### parseFloat()

`parseFloat`方法用于将一个字符串转为浮点数。

```javascript
parseFloat('3.14') // 3.14
```

如果字符串符合科学计数法，则会进行相应的转换。

```javascript
parseFloat('314e-2') // 3.14
parseFloat('0.0314E+2') // 3.14
```

如果字符串包含不能转为浮点数的字符，则不再进行往后转换，返回已经转好的部分。

```javascript
parseFloat('3.14more non-digit characters') // 3.14
```

`parseFloat`方法会自动过滤字符串前导的空格。

```javascript
parseFloat('\t\v\r12.34\n ') // 12.34
```

如果参数不是字符串，或者字符串的第一个字符不能转化为浮点数，则返回`NaN`。

```javascript
parseFloat([]) // NaN
parseFloat('FF2') // NaN
parseFloat('') // NaN
```

上面代码中，尤其值得注意，`parseFloat`会将空字符串转为`NaN`。

这些特点使得`parseFloat`的转换结果不同于`Number`函数。

```javascript
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```

## Boolean

Boolean 类型是 ECMAScript 中使用得最多的一种类型，该类型只有两个字面值： true 和 false。

这两个值与数字值不是一回事，因此 true 不一定等于 1，而 false 也不一定等于 0。以下是为变量赋 Boolean 类型值的例子：

```js
var found = true;
var lost = false;
```

需要注意的是，Boolean 类型的字面值 true 和 false 是区分大小写的。也就是说，True 和 False （以及其他的混合大小写形式）都不是 Boolean 值，只是标识符。

虽然 Boolean 类型的字面值只有两个，但 ECMAScript 中所有类型的值都有与这两个 Boolean 值 等价的值。要将一个值转换为其对应的 Boolean 值，可以调用转型函数 Boolean()，如下例所示：

```js
var message = "Hello world!";
var messageAsBoolean = Boolean(message);
```

在这个例子中，字符串 message 被转换成了一个 Boolean 值， 该值被保存在 messageAsBoolean 变量中。可以对任何数据类型的值调用 Boolean()函数，而且总会返回一个 Boolean 值。至于返回的 这个值是 true 还是 false，取决于要转换值的数据类型及其实际值。下表给出了各种数据类型及其对 应的转换规则。

| 数据类型      | 转换为true的值      | 转换为false的值            |
|-----------|----------------|-----------------------|
| Boolean   | true           | false                 |
| String    | 任何非空字符串        | ""（空字符串）              |
| Number    | 任何非零数字值（包括无穷大） | 0和NaN（参见本章后面有关NaN的内容） |
| Object    | 任何对象           | null                  |
| Undefined | n/a            | undefined             |

## undefined 和 null

undefined 类型只有一个值，即 undefined。 null 类型也只有一个值，即 null。它们的名 称既是类型也是值。

undefined 和 null 常被用来表示“空的”值或“不是值”的值。二者之间有一些细微的差
别。例如：

- null 指空值（empty value）
- undefined 指没有值（missing value）

或者：

- undefined 指从未赋值
- null 指曾赋过值，但是目前没有值

null 是一个特殊关键字，不是标识符，我们不能将其当作变量来使用和赋值。然而 undefined 却是一个标识符，可以被当作变量来使用和赋值。

### Undefined

> 一般而言，不存在需要显式地把一个变量设置为 undefined 值的情况。字面值 undefined 的主要目的是用于比较，而 ECMA-262 第 3 版之前的版本中并没有规定 这个值。第 3 版引入这个值是为了正式区分空对象指针与未经初始化的变量。

> n/a（或 N/A），是 not applicable 的缩写，意思是“不适用”

即便未初始化的变量会自动被赋予 undefined 值，但显式地初始化变量依然是 明智的选择。如果能够做到这一点，那么当 typeof 操作符返回"undefined"值时， 我们就知道被检测的变量还没有被声明，而不是尚未初始化。

### null

如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为 null 而不是其他值。这样 一来，只要直接检查 null 值就可以知道相应的变量是否已经保存了一个对象的引用，如下面的例子 所示：

```js
if (car != null) {
    // 对 car 对象执行某些操作
}
实际上， undefined 值是派生自 null 值的，因此 ECMA- 262 规定对它们的相等性测试要返回 true：
alert(null == undefined); //true
```

这里，位于 null 和 undefined 之间的相等操作符（==）总是返回 true，不过要注意的是，这个 操作符出于比较的目的会转换其操作数（本章后面将详细介绍相关内容）。

尽管 null 和 undefined 有这样的关系，但它们的用途完全不同。如前所述，无论在什么情况下 都没有必要把一个变量的值显式地设置为 undefined，可是同样的规则对 null 却不适用。换句话说， 只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存 null 值。这样做不仅可以 体现 null 作为空对象指针的惯例，而且也有助于进一步区分 null 和 undefined。