﻿import Configuration = require('../Configuration');
import Extender = require('../interfaces/Extender');
import noop = require('../extenders/noop');
import Override = require('../interfaces/Override');
import s = require('../helpers/string');

// ReSharper disable once UnusedLocals
function clearfix(value: boolean) {

	if (!value) {
		return noop();
	}

	var override = <Override>((config: Configuration) => [
		['content', s.repeat(config.quote, 2)],
		['display', 'table'],
		['clear', 'both']
	]);

	override.args = arguments;
	override.selectors = [':after'];

	return override;

}

export = clearfix;
