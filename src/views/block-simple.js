var blockTemplate = require('../templates/block.html');

var BlockSimpleView = Backbone.View.extend({

	template: _.template(blockTemplate),

	events: {
		'click .close' : 'delete',
		'click'	: 'toggleSelect'
	},

	initialize: function () {
		this.render();

		this.listenTo(this.model, 'change', this.render);
	},

	render: function () {
		this.$el.empty().append(this.template(this.model.toJSON()));
	},

	toggleSelect: function() {
		this.model.set('active', !this.model.get('active'));
	},

	delete: function(e) {
		e.stopPropagation();
		this.undelegateEvents();
		this.$el.remove();
		this.model.destroy();
	}

});

module.exports = BlockSimpleView;