<img src="https://github.com/blinkjs/blink/blob/master/artwork/blink_256_nobg.png?raw=true" width="256" height="256" alt="blink" align="right">

Blink converts [Node.js](http://nodejs.org/) modules into CSS.

[![Build Status](https://secure.travis-ci.org/blinkjs/blink.svg)](http://travis-ci.org/blinkjs/blink)
[![Dependency Status](https://david-dm.org/blinkjs/blink.svg)](https://david-dm.org/blinkjs/blink)
[![NPM version](https://badge.fury.io/js/blink.svg)](http://badge.fury.io/js/blink)

[![Views](https://sourcegraph.com/api/repos/github.com/blinkjs/blink/counters/views-24h.png)](https://sourcegraph.com/github.com/blinkjs/blink)
[![Code Climate](https://codeclimate.com/github/blinkjs/blink/badges/gpa.svg)](https://codeclimate.com/github/blinkjs/blink)
[![Test Coverage](https://codeclimate.com/github/blinkjs/blink/badges/coverage.svg)](https://codeclimate.com/github/blinkjs/blink)

[![NPM](https://nodei.co/npm/blink.svg?downloads=true)](https://nodei.co/npm/blink/)


## Introduction

If you landed here, you're probably a front-end web developer of some kind. You know how to write JavaScript. You might even have a favorite CSS preprocessor. Sure, they allow you to write [variables](http://sass-lang.com/guide#topic-2) and [functions](http://sass-lang.com/guide#topic-6) in some form or another, but they also require that you learn their [domain-specific language](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax) (DSL), which often falls short of a full-blown language. You scour their documentation, struggling to find solutions to problems you already know how to solve in JavaScript. We keep looking for ways to introduce logic into our CSS, so why not just use JavaScript?

Blink doesn't need to do anything special to support functions, because blink runs actual JavaScript. This means the equivalent of [Sass](http://sass-lang.com/) [mixins](http://sass-lang.com/guide#topic-6) can be achieved in blink by means of a function that returns any number of CSS declarations. In blink, these are implemented as [overrides](#overrides). For example, the [fill override](#fill) allows you to add `{ fill: true }` to your rule body, which, in turn, generates 5 CSS declarations to fill its relative or absolute container.

Blink follows the Single Responsibility Principle (SRP), which means it doesn't try to do too much. As such, you are encouraged to combine blink with other tools to achieve the best result. For example, use [Autoprefixer](https://github.com/postcss/autoprefixer) to add vendor prefixes and [Spritesmith](https://github.com/Ensighten/spritesmith) to generate sprites, which can then be implemented directly in blink. There are a plethora of Node modules you can leverage.

Blink is just getting started, so stay tuned for any updates.


## Features

- [100% code coverage](https://codeclimate.com/github/blinkjs/blink)
- [4.0 Code Climate GPA](https://codeclimate.com/github/blinkjs/blink)
- [Runs on Node](#runs-on-node)
- [Gulp plugin](#gulp-plugin)
- [Grunt plugin](https://github.com/blinkjs/grunt-blink)
- [Middleware](https://github.com/blinkjs/blink-middleware)
- [OOCSS with BEM Syntax](#oocss-with-bem)
- [Rules](#rules)
- [Mixins](#mixins)
- [Overrides](#overrides)
- [Responders](#responders)
- [Plugins](#plugins)
- [TypeScript Source](#typescript-source)
- [CLI](https://github.com/blinkjs/blink-cli)
- [API](https://github.com/blinkjs/blink/blob/master/dist/d.ts/lib/blink.d.ts)


## Getting started


### Installation
- [Node](#library-usage)
- [In the browser](#in-the-browser)


### Example

At its simplest, blink lets you write CSS with a simple [object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Using_object_initializers). This object needs to be exported with either `module.exports` in Node or just `exports` in the browser. Here's a quick and dirty example:

```js
exports = {
  foo: {
    bar: 'baz'
  }
};
```

This would generate the following CSS:

```css
foo {
  bar: baz;
}
```

From here, you'll want look at [the full list of features](#features) for a comprehensive overview of what-all blink has to offer.


### Runs on Node

Unlike most CSS preprocessors out there, blink does not transpile a [DSL](http://en.wikipedia.org/wiki/Domain-specific_language) into CSS. Blink code gets compiled directly as a [Node](http://nodejs.org/) module, giving you access to all JavaScript syntax for free. This, of course, includes variables and functions, as well as [file I/O](http://nodejs.org/api/fs.html). The possibilities are endless.


### Gulp plugin

Blink exposes a plugin method, which is, itself, a gulp plugin. As with any gulp plugin, files can be piped to other [gulp plugins](http://gulpjs.com/plugins/) before being written to their final destination. Blink supports [vinyl](https://github.com/wearefractal/vinyl) files in buffer mode only (streams not supported).

```js
var blink = require('blink');
var concat = require('gulp-concat');
var eventStream = require('event-stream');
var gulp = require('gulp');

gulp.task('styles', function() {
	var bundles = ['app', 'account'].map(function(bundleName) {
		return gulp.src('styles/' + bundleName + '/**/*.js')
			.pipe(blink.plugin(/* options */))
			// more plugins
			.pipe(concat(bundleName + '.css'))
			.pipe(gulp.dest('./build/css'));
	});
	return eventStream.merge.apply(this, bundles);
});
```

This `styles` task will build two CSS bundles (app and account), passing them through the same plugins and writing them to the same destination folder.

_Note: [gulp-blink](https://github.com/blinkjs/gulp-blink) has been deprecated in favor of using the blink module's plugin method._


### In the browser

For those wishing to transpile blink files into CSS in the browser, you can use [Browserify](http://browserify.org/) or your module loader of choice. If you would like to create a gulp task that bundles blink with Browserify, it would look something like this:

```js
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('bundle-blink', function() {
	browserify()
		.require('./node_modules/blink/js/lib/browser/blink.js', { expose: 'blink' })
		.bundle()
		.pipe(source('blink.js'))
		.pipe(gulp.dest('dist'));
});
```

This gulp task simply bundles up blink's browser package, names it blink.js and dumps it in a dist folder.

Include the script in your web page:

```html
<script src="/dist/blink.min.js"/>
```

Compile your block:

```js
var blink = require('blink');
var foo = new blink.Block('foo', { bar: 'baz' });
blink(foo, function(err, css) {
  console.log(css);
});
```

You can also compile a string of source code as long as you export the rule with `exports`.

```js
var blink = require('blink');
var foo = 'exports = { foo: { bar: "baz" }}';
blink(foo, function(err, css) {
  console.log(css);
});
```


### OOCSS with BEM

Blink is designed with [BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) in mind. You can create blocks, elements and modifiers and their CSS selectors will be generated for you. You can configure your BEM format however you want, but the default naming convention follows that which is defined in [MindBEMding &ndash; getting your head 'round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).

Here's an example of a block with both an element and a modifier:

```ts
///<reference path="./node_modules/blink/blink.d.ts"/>
import blink = require('blink');

var btn = new blink.Block('btn', {

	min: {
		width: 80
	},

	elements: {
		foreground: {
			color: 'black'
		}
	},

	modifiers: {
		wide: {
			min: {
				width: 120
			}
		}
	}
});

export = btn;
```

This would generate the following CSS:

```css
.btn {
	min-width: 80px;
}

.btn__foreground {
	color: black;
}

.btn--wide {
	min-width: 120px;
}
```


### Rules

The [Rule](https://github.com/blinkjs/blink/blob/master/lib/Rule.ts) class allows you to specify a standard CSS rule and can be useful when styling page defaults.


```ts
///<reference path="./node_modules/blink/blink.d.ts"/>
import blink = require('blink');

var normalize = [

	new blink.Rule('html', {
		font: {
			family: 'sans-serif'
		}
	}),

	new blink.Rule('body', {
		margin: 0
	}),

	new blink.Rule('a:active, a:hover', {
		outline: 0
	})

	// ...

];

export = normalize;
```

You are encouraged to use BEM blocks for all of your components. There's nothing stopping you from using basic rules, but you should avoid them if at all possible.


### Mixins

If you're coming from [Sass](http://sass-lang.com/), you might be familiar with [mixins](http://sass-lang.com/guide#topic-6). Really, Sass mixins are no different than functions in JavaScript; thus, blink supports them. All you have to do is create a function that returns an array of declarations. This is, in fact, how [overrides](#overrides) work.


### Overrides

Overrides are named function [factories](http://en.wikipedia.org/wiki/Factory_(object-oriented_programming)). The function that is returned can be used for the purpose of generating any number of CSS declarations. This enables you to override existing CSS properties or create your own. For example, say you wanted to override the CSS `color` property to always convert colors into `hsl`. You could do that! Maybe you want to create a new `clearfix` property that, when set to true, generates 3 CSS declarations. Good news &ndash; [that one already exists](https://github.com/blinkjs/blink/blob/master/lib/overrides/clearfix.ts) and you can override it with your own [plugin](#plugins) if you wish.


#### fill override

Let's take an in-depth look at the [fill override](https://github.com/blinkjs/blink/blob/master/lib/overrides/fill.ts). Here's how you would go about writing it from scratch, in TypeScript.

```ts
function fill() {}
export = fill;
```

Firstly, overrides are just functions, but they are function factories, which means they need to return a function. Let's do that.

```ts
function fill(value: boolean) {
	return () => {};
}

export = fill;
```

We're accepting a `value: boolean` argument, because we know that fill is a black and white thing. You either want it or you don't. Next, we created a new function and immediately return it. The `fill` override is actually quite simple. All we need to do is generate some CSS declarations.

```ts
function fill(value: boolean) {

	return () => {
		if (!value) {
			return [];
		}
		return [
			['position', 'absolute'],
			['top', '0'],
			['right', '0'],
			['bottom', '0'],
			['left', '0']
		];
	};

}

export = fill;
```

This override will only generate CSS declarations if you call it with `{ fill: true }` in the rule body. If you call it with `false`, it returns an empty array, which gets ignored by the compiler. It just generates 5 declarations and leaves it at that &ndash; pretty simple.

See the [background override](https://github.com/blinkjs/blink/blob/master/lib/overrides/background.ts) for a more complex example that converts an object literal into a shorthand list of background properties. True, this gives you some optimized CSS, but that could be achieved through a build tool. The real value here is that it gives you TypeScript Intellisense for the types of options you can provide to the `background` property, reducing the need to lookup documentation.


#### Override registration

Overrides are registered on the configuration object. If you wish to extend the configuration, you can do so by providing [a plugin module](#plugins).

_Note: override names are dasherized for you (e.g., fooBar overrides the `foo-bar` property)._


### Responders

Responders currently only support [MediaAtRules](https://github.com/blinkjs/blink/blob/master/lib/MediaAtRule.ts), which allow you to create responsive websites. Here's an example of a basic responder:

```ts
///<reference path="./node_modules/blink/blink.d.ts"/>
import blink = require('blink');

var foo = new blink.Block('foo', {
	respond: [
		new blink.MediaAtRule('screen and (max-width: 320)', {
			width: 100
		})
	]
});

export = foo;
```

This generates the following CSS:

```css
@media screen and (max-width: 320) {
	.foo {
		width: 100px;
	}
}
```


### Plugins

Plugins can be defined in the configuration like so:

```json
{
  "plugins": ["yourname.overrides"]
}
```

If you were to publish an npm package under the name `yourname.overrides` and if you wanted to override the boxSizing override that blink already provides, you could do it like so:

```ts
function plugin() {
	this.overrides.boxSizing = require('./overrides/boxSizing');
	return this;
}
```

Now, every time someone declares `box-sizing: whatever` your override will be called with `whatever` as the first and only argument. The returned set of declarations will replace the original one. In this case, however, `box-sizing` does nothing with arguments.


### Node API

With all the new build tools and taks runners springing up, blink was built with that in mind, that various tools would need access to the compiled results without writing any files to the disk.


### TypeScript Source

Since blink source code is written in [TypeScript][], you don't need to constantly look-up documentation to gain insight as to how you can use the blink API. Unfortunately, although there is [TypeScript][] support for [other editors](http://msopentech.com/blog/2012/10/01/sublime-text-vi-emacs-typescript-enabled/), you won't get the powerful feature of Intellisense unless you are using [Visual Studio](http://www.visualstudio.com/).

BTW, you can write your blink files in [TypeScript][] or JavaScript. It really doesn't matter as long as it ends up in JavaScript.


## Getting Started


### CLI Usage

See [blink-cli](https://github.com/blinkjs/blink-cli)


### Library Usage

```bash
$ npm install --save-dev blink
```

```ts
///<reference path="./node_modules/blink/blink.d.ts"/>
import blink = require('blink');
```


Refer to the [blink TypeScript definition](https://github.com/blinkjs/blink/blob/master/blink.d.ts) for a list of available public methods.


## License

Released under the MIT license.



[TypeScript]: http://www.typescriptlang.org/
