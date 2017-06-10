var utils 				= require('../utils/'),
	Blocks 				= require('../collections/blocks'),
	blockSimpleView 	= require('./block-simple'),
	blockComplexView 	= require('./block-complex'),
	colors				= require('../etc/style-settings').colors,
	statsTemplate		= require('../templates/stats.html');

require('../styles/main.sass');


var AppView = Backbone.View.extend({

	el: '#app-view',

	events: {
		'click #new-block' : 'createTextBlock'
	},

	statsTemplate: _.template(statsTemplate),

	initialize: function () {
		this.$main = $('#text-blocks');
		this.$stats = $('#stats');

		this.listenTo(Blocks, 'add', this.addOne);
		this.listenTo(Blocks, 'reset', this.addAll);
		this.listenTo(Blocks, 'all', _.debounce(this.render, 0));

		Blocks.fetch({reset:true});
	},

	render: function() {
		this.$stats.html(this.statsTemplate({
			all: Blocks.length,
			active: {
				all: Blocks.active().length,
				red: Blocks.active(colors.red).length,
				green: Blocks.active(colors.green).length,
			}
		}));
	},

	getModelAttributes: function(text) {
		return {
			text: text,
			complex: Blocks.isNextComplex() //Сложный блок
		}
	},

	createTextBlock: function() {
		var self = this;

		utils.generateText().then(function(response) {
			Blocks.create(self.getModelAttributes(response.text_out));
		});
	},

	addAll: function() {
		var self = this;

		_.each(Blocks.models, function(model) {
			self.addOne(model);
		});
	},

	addOne: function(model) {
		var blockView = model.get('complex') ? blockComplexView : blockSimpleView;

		this.$main.append(new blockView({model: model}).el);
	}
	
});

module.exports = AppView;