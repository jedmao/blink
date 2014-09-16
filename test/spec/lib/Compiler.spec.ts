﻿///<reference path="../../../bower_components/dt-vinyl/vinyl.d.ts"/>
import fs = require('fs');
import path = require('path');
var vfs = require('vinyl-fs');

import blink = require('../../../lib/blink');
import sinonChai = require('../../sinon-chai');

var config = blink.config;
var expect = sinonChai.expect;

// ReSharper disable WrongExpressionStatement
describe('Compiler', () => {

	var compiler: blink.Compiler;
	beforeEach(() => {
		compiler = new blink.Compiler(config);
	});

	function readFile(file: Vinyl.IFile) {
		if (file.isStream()) {
			return file.contents.read().toString();
		}
		if (file.isBuffer()) {
			return file.contents.toString();
		}
		throw new Error('Expected stream or buffer');
	}

	function readExpected(filename) {
		return fs.readFileSync(path.join('test', 'expected', filename), {
			encoding: 'utf8'
		});
	}

	it('compiles files in streaming mode', done => {
		vfs.src('test/fixtures/foo.js', { buffer: false })
			.pipe(blink.compile())
			.on('data', file => {
				var transpiled = readFile(file);
				var expected = readExpected('foo.css');
				expect(transpiled).to.eq(expected);
				done();
			});
	});

	it('compiles files in buffer mode', done => {
		vfs.src('test/fixtures/foo.js')
			.pipe(blink.compile())
			.on('data', file => {
				var transpiled = readFile(file);
				var expected = readExpected('foo.css');
				expect(transpiled).to.eq(expected);
				done();
			});
	});

	it('compiles master files (i.e., files that include other files)', done => {
		vfs.src('test/fixtures/app.js')
			.pipe(blink.compile())
			.on('data', file => {
				var transpiled = readFile(file);
				var expected = readExpected('app.css');
				expect(transpiled).to.eq(expected);
				done();
			});
	});

});
