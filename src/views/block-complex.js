var BlockSimpleView = require('./block-simple'),
	colors = require('../etc/style-settings').colors;

var BlockComplexView = BlockSimpleView.extend({

	events: function(){
		return _.extend({}, BlockSimpleView.prototype.events, {
			'click' : 'onComplexClicked'
		});
	},

	clicks: 0,

	colors: Object.values(colors),

	initialize: function () {
		if (!this.model.get('color')) {
			this.model.set('color', this.colors[Math.floor(Math.random() * this.colors.length)]);
		}

		BlockSimpleView.prototype.initialize.apply(this, arguments);
	},

	onComplexClicked: function(e) {
		var self = this;

		if (this.timer)
			clearTimeout(this.timer);

		this.timer = setTimeout(function() {
			if (self.clicks > 1) {
				self.changeBg();
			} else {
				BlockSimpleView.prototype.toggleSelect.call(self);
			}
			self.clicks = 0;
		}, 200);

		this.clicks++;
	},

	changeBg: function() {
		var currentColor = this.model.get('color');

		for (var i = this.colors.length - 1; i >= 0; i--) {
			if (currentColor !== this.colors[i]) {
				this.model.set('color', this.colors[i]);
			}
		}
	},

	delete: function() {
		if (confirm('Удалить сложный блок?')) {
			BlockSimpleView.prototype.delete.apply(this, arguments);
		}
	}

});

module.exports = BlockComplexView;