﻿import Configuration = require('./browser/Configuration');
import s = require('./helpers/string');

class Formatter {

	private config: Configuration;

	format(config: Configuration, rules: any[][]) {
		if (typeof rules === 'undefined') {
			throw new Error('No rules provided to the format method');
		}
		this.config = config;
		return this.formatRules(rules, 0);
	}

	private formatRules(rules: any[][], level: number) {
		return rules.map(rule => {
			return this.formatRule(rule, level);
		}).join('');
	}

	private formatRule(rule: any[][], level: number) {
		var config = this.config;
		var selectors = this.joinSelectors(rule[0]);
		var body = this.formatBody(rule[1], level + 1);
		var indent = s.repeat(config.oneIndent, level);
		var css = indent + selectors + config.oneSpace + '{' + config.newline;
		css += body;
		css += indent + '}' + config.newline;
		return css;
	}

	private joinSelectors(selectors: string[]) {
		var joined = selectors.join(',' + this.config.oneSpace);
		if (joined === '') {
			throw new Error('Invalid rule selectors');
		}
		return joined;
	}

	private formatBody(body: any[][], level: number) {

		var firstPair = body[0];
		if (!firstPair || !firstPair.length) {
			return '';
		}

		var firstKey = firstPair[0];
		if (!firstKey) {
			throw new Error('Invalid declaration property');
		}

		var firstVal = firstPair[1];

		if (firstKey[0] === '@' || !this.isDeclarationValue(firstVal)) {
			return this.formatRules(body, level);
		}

		return this.formatDeclarations(body, level);
	}

	private isDeclarationValue(value: any) {
		return typeof value === 'string';
	}

	private formatDeclarations(decs: string[][], level: number) {
		var indent = s.repeat(this.config.oneIndent, level);
		return decs.map(dec => {
			var prop = dec[0];
			var val = dec[1];
			var css = indent;
			css += prop + ':' + this.config.oneSpace;
			css += val + ';';
			return css;
		}).join(this.config.declarationSeparator) + this.config.newline;
	}

}

export = Formatter;
