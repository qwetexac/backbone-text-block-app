var blockModel 	= require('../models/block'),
	Store 		= require('backbone.localstorage');

var Blocks = Backbone.Collection.extend({

	model: blockModel,

	localStorage: new Store('backbone-text-blocks'),

	isNextComplex: function() {
		return this.models.length / 2 - this.where({'complex': true}).length > 0;
	},

	active: function(color) {

		if (color) {
			return this.where({
				active: true,
				color: color
			});
		}

		return this.where({active: true});
	},

});

module.exports = new Blocks();