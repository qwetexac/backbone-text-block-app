define([
	'backbone'
], function (Backbone) {
	'use strict';

	var BlockModel = Backbone.Model.extend({

		defaults: {
			text: '',
			color: '',
			complex: false,
			active: false
		}
		
	});

	return BlockModel;
});