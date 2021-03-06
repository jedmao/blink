﻿import Configuration = require('../../../lib/Configuration');
import Formatter = require('../../../lib/Formatter');
import sinonChai = require('../../sinon-chai');

var expect = sinonChai.expect;

// ReSharper disable WrongExpressionStatement
describe('Formatter', () => {

	var config = new Configuration();
	var newline = config.newline;

	var f: Formatter;
	before(() => {
		f = new Formatter();
	});

	it('properly formats a rule with one declaration', () => {
		var css = f.format(config, [
			[['.foo'], [
				['bar', 'BAR']
			]]
		]);
		expect(css).to.eq([
			'.foo {',
			'  bar: BAR;',
			'}'
		].join(newline) + newline);
	});

	it('properly formats a rule with two declarations', () => {
		var css = f.format(config, [
			[['.foo'], [
				['bar', 'BAR'],
				['baz', 'BAZ']
			]]
		]);
		expect(css).to.eq([
			'.foo {',
			'  bar: BAR;',
			'  baz: BAZ;',
			'}'
		].join(newline) + newline);
	});

	it('properly formats two rules', () => {
		var css = f.format(config, [
			[['.foo'], [
				['bar', 'BAR']
			]],
			[['.baz'], [
				['qux', 'QUX']
			]]
		]);
		expect(css).to.eq([
			'.foo {',
			'  bar: BAR;',
			'}',
			'.baz {',
			'  qux: QUX;',
			'}'
		].join(newline) + newline);
	});

	it('properly formats a nested at-rule with two inner rules', () => {
		var css = f.format(config, [
			[['@foo'], [
				[['.bar'], [
					['baz', 'BAZ']
				]],
				[['.qux'], [
					['quux', 'QUUX']
				]]
			]]
		]);
		expect(css).to.eq([
			'@foo {',
			'  .bar {',
			'    baz: BAZ;',
			'  }',
			'  .qux {',
			'    quux: QUUX;',
			'  }',
			'}'
		].join(newline) + newline);
	});

	it('properly formats a deeply-nested at-rule', () => {
		var css = f.format(config, [
			[['@foo'], [
				[['@bar'], [
					[['.baz'], [
						['qux', 'QUX'],
						['quux', 'QUUX']
					]]
				]]
			]]
		]);
		expect(css).to.eq([
			'@foo {',
			'  @bar {',
			'    .baz {',
			'      qux: QUX;',
			'      quux: QUUX;',
			'    }',
			'  }',
			'}'
		].join(newline) + newline);
	});

	it('formats to an empty string when there are no rules to format', () => {
		var css = f.format(config, []);
		expect(css).to.be.empty;
	});

	it('formats to an empty string when the rule body is empty', () => {
		var css = f.format(config, [
			[['foo'], []]
		]);
		expect(css).to.be.empty;
	});

	it('throws an error when rules are undefined', () => {
		var fn = () => {
			f.format(config, void (0));
		};
		expect(fn).to.throw('No rules provided to the format method');
	});

	it('throws an error on invalid declaration properties', () => {
		['', null, void (0)].forEach(property => {
			var fn = () => {
				f.format(config, [
					[['foo'], [
						[property, 'baz']
					]]
				]);
			};
			expect(fn).to.throw('Invalid declaration property');
		});
	});

	it('throws an error on invalid rule selectors', () => {
		['', null, void (0)].forEach(selector => {
			var fn = () => {
				f.format(config, [
					[[selector], [
						['bar', 'baz']
					]]
				]);
			};
			expect(fn).to.throw('Invalid rule selectors');
		});
	});

});
