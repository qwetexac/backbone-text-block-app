var http = require('http');

'use strict';

function generateText() {
	return $.get('http://www.randomtext.me/api/');
}

module.exports = {
	generateText: generateText
};